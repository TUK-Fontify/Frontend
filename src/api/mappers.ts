import type {
  ApiDownloadItem,
  ApiFontFileItem,
  ApiGeneratedFontItem,
  ApiGenerationCreateResponse,
  ApiMeResponse,
  ApiRatingItem,
  ApiGenerationStatus,
} from './backendTypes';
import { resolveApiAssetUrl } from './client';
import type { StoredGenerationJob } from './generationStorage';
import type {
  EnglishFontCard,
  FontFilterKey,
  FontKeywordKey,
  TopFont,
  UserOwnedFont,
} from '../types/font';
import type { PendingReviewFont, ReviewCard } from '../types/review';
import type { UserActivityStat, UserProfile } from '../types/user';
import type { WorkItem, WorkPhase, WorkTimelineLog, WorkTimelineState } from '../types/work';

const fallbackAvatarSrc = '/images/my-page/profile-avatar.png';
const statLikeIconSrc = '/images/my-page/activity-like-icon.svg';
const statReviewIconSrc = '/images/my-page/activity-review-icon.png';
const statOwnedIconSrc = '/images/my-page/activity-owned-font-icon.svg';

function clampPercent(value: number) {
  return Math.min(100, Math.max(0, Math.round(value)));
}

function daysSince(dateValue: string) {
  const createdAt = new Date(dateValue).getTime();
  if (Number.isNaN(createdAt)) return 0;
  return Math.max(0, Math.floor((Date.now() - createdAt) / 86_400_000));
}

function formatDateTime(dateValue: string | null) {
  if (!dateValue) return 'Pending';
  const date = new Date(dateValue);
  if (Number.isNaN(date.getTime())) return dateValue;
  return new Intl.DateTimeFormat('ko-KR', {
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}

function mapBackendStatusToPhase(status: string, progress: number): WorkPhase {
  const normalized = status.toUpperCase();
  if (normalized.includes('FAIL') || normalized.includes('ERROR')) return 'failed';
  if (normalized.includes('PREVIEW_READY')) return 'preview_ready';
  if (normalized.includes('COMPLETE') || normalized.includes('DONE') || progress >= 100) return 'completed';
  if (normalized.includes('PENDING') || normalized.includes('QUEUE')) return 'queued';
  if (progress < 25) return 'analyzing';
  if (progress < 75) return 'retraining';
  return 'finalizing';
}

function getFailedStageIndexFromStatus(status: ApiGenerationStatus) {
  if (status.generated_font_url) return 3;
  if (status.preview_image_urls.length > 0) return 3;
  return 0;
}

function timelineStateForPhase(
  phase: WorkPhase,
  index: number,
  failedStageIndex = 0,
): WorkTimelineState {
  if (phase === 'failed') {
    if (index < failedStageIndex) return 'done';
    if (index === failedStageIndex) return 'failed';
    return 'waiting';
  }
  const activeIndexByPhase: Record<WorkPhase, number> = {
    queued: 0,
    analyzing: 0,
    preview_ready: 1,
    retraining: 2,
    finalizing: 3,
    completed: 4,
    failed: 0,
  };
  const activeIndex = activeIndexByPhase[phase];
  if (phase === 'completed' || index < activeIndex) return 'done';
  if (index === activeIndex) return 'active';
  return 'waiting';
}

function buildWorkLogs(
  jobId: number,
  requestedAtValue: string,
  phase: WorkPhase,
  failedStageIndex: number,
  failReason?: string | null,
): WorkTimelineLog[] {
  const requestedAt = formatDateTime(requestedAtValue);
  const steps = [
    {
      title: '?묒뾽 ?붿껌 ?묒닔',
      detail: `${requestedAt}???앹꽦 ?붿껌???깅줉?섏뿀?듬땲??`,
    },
    {
      title: '?곷Ц ?ㅽ???遺꾩꽍',
      detail: '?좏깮???곷Ц ?고듃 ?ㅽ??쇱쓣 遺꾩꽍?섍퀬 ?쒓? 援ъ“濡?蹂?섑븯怨??덉뒿?덈떎.',
    },
    {
      title: 'AI refinement',
      detail: 'The generated preview set is being refined into the full font output.',
    },
    {
      title: '2,350???꾩꽦',
      detail:
        phase === 'failed'
          ? failReason ?? '?앹꽦 ?묒뾽???ㅽ뙣?덉뒿?덈떎.'
          : phase === 'completed'
            ? '理쒖쥌 ?고듃 ?뚯씪???앹꽦?섏뼱 ?ㅼ슫濡쒕뱶?????덉뒿?덈떎.'
            : '?꾨즺 ??TTF ?ㅼ슫濡쒕뱶 URL???곌껐?⑸땲??',
    },
  ];

  return steps.map((step, index) => ({
    id: `${jobId}-log-${index + 1}`,
    time: index === 0 ? requestedAt : 'Pending',
    title: phase === 'failed' && index === failedStageIndex ? '?앹꽦 ?ㅽ뙣' : step.title,
    detail: step.detail,
    state: timelineStateForPhase(phase, index, failedStageIndex),
  }));
}

function mapPreviewUrlsToLetters(urls: string[]) {
  if (urls.length === 0) return undefined;
  const fallback = ['가', '나', '다', '라', '마', '바', '사', '아', '자', '차', '카', '타', '파', '하'];
  return urls.map((url, index) => {
    const filename = url.split('/').pop() ?? '';
    const letter = decodeURIComponent(filename).replace('.png', '');
    return letter || fallback[index] || `誘몃━蹂닿린 ${index + 1}`;
  });
}

export function mapGenerationStatusToWorkItem(
  storedJob: StoredGenerationJob,
  status: ApiGenerationStatus,
): WorkItem {
  const isFailed =
    status.status.toUpperCase().includes('FAIL') ||
    status.status.toUpperCase().includes('ERROR');
  const progressPercent =
    isFailed && status.preview_image_urls.length === 0 && !status.generated_font_url
      ? 0
      : clampPercent(status.progress);
  const phase = mapBackendStatusToPhase(status.status, progressPercent);
  const hasPreview = status.preview_image_urls.length > 0;
  const failedStageIndex = getFailedStageIndexFromStatus(status);

  return {
    id: String(status.job_id),
    title: storedJob.fontName || `Fontify ?묒뾽 #${status.job_id}`,
    updatedAt: `?붿껌?? ${formatDateTime(storedJob.requestedAt)}`,
    progressPercent,
    phase,
    statusLabel: status.status,
    failReason: status.fail_reason,
    sample: 'Aa',
    previewLetters: hasPreview ? mapPreviewUrlsToLetters(status.preview_image_urls) : undefined,
    previewImageUrls: hasPreview ? status.preview_image_urls.map((url) => resolveApiAssetUrl(url) ?? url) : undefined,
    downloadUrl: resolveApiAssetUrl(status.generated_font_url),
    logs: buildWorkLogs(status.job_id, storedJob.requestedAt, phase, failedStageIndex, status.fail_reason),
  };
}

export function mapGenerationCreateResponseToStoredJob(
  created: ApiGenerationCreateResponse,
  font: Pick<EnglishFontCard, 'id' | 'name'>,
): StoredGenerationJob {
  return {
    jobId: created.job_id,
    fontFileId: Number(font.id),
    fontName: font.name,
    requestedAt: created.requested_at,
  };
}

export function mapMeToUserProfile(me: ApiMeResponse): UserProfile {
  return {
    name: me.nickname || me.email,
    joinedDaysLabel: `Fontify? ?④퍡?쒖? ${daysSince(me.created_at)}?쇱㎏`,
    avatarSrc: fallbackAvatarSrc,
  };
}

export function mapUserStats(params: {
  ratingsCount: number;
  generationsCount: number;
  downloadsCount: number;
}): UserActivityStat[] {
  return [
    {
      id: 'likes',
      iconSrc: statLikeIconSrc,
      label: '좋아요',
      value: String(params.downloadsCount),
    },
    {
      id: 'reviews',
      iconSrc: statReviewIconSrc,
      label: '?묒꽦??由щ럭',
      value: String(params.ratingsCount),
      href: '#/reviews',
    },
    {
      id: 'working-fonts',
      iconSrc: statOwnedIconSrc,
      label: '?묒뾽以묒씤 ?고듃',
      value: String(params.generationsCount),
      iconVariant: 'darkOnWhite',
      href: '#/my-works',
    },
  ];
}

export function mapDownloadToOwnedFont(item: ApiDownloadItem): UserOwnedFont {
  return {
    id: String(item.generated_font_id ?? item.download_id),
    title: item.font_name,
    kind: '臾대즺' as UserOwnedFont['kind'],
    company: 'Fontify',
    sampleFontFamily: 'Pretendard, sans-serif',
  };
}

function inferFontType(name: string): FontFilterKey {
  const lower = name.toLowerCase();
  if (lower.includes('script') || lower.includes('hand')) return 'Handwriting';
  if (lower.includes('display') || lower.includes('black')) return 'Display';
  if (lower.includes('serif') || lower.includes('merriweather') || lower.includes('playfair')) return 'Serif';
  return 'Sans Serif';
}

function inferFontTags(type: FontFilterKey): FontKeywordKey[] {
  if (type === 'Serif') return ['보고서', '고급'] as unknown as FontKeywordKey[];
  if (type === 'Handwriting') return ['?좊젮?곕뒗'] as unknown as FontKeywordKey[];
  if (type === 'Display') return ['寃뚯엫?깊븳'] as unknown as FontKeywordKey[];
  return ['臾몄꽌'] as unknown as FontKeywordKey[];
}

export function mapFontFileToEnglishFont(item: ApiFontFileItem): EnglishFontCard {
  const type = inferFontType(item.name);
  const styleLabel = item.style === 'normal' ? '' : ` ${item.style}`;
  return {
    id: String(item.font_file_id),
    name: `${item.name}${styleLabel}`,
    creator: `weight ${item.weight}`,
    previewFamily: `${item.name}, Pretendard, sans-serif`,
    type,
    preview: 'Font Preview',
    tags: inferFontTags(type),
  };
}

export function mapGeneratedFontToTopFont(item: ApiGeneratedFontItem, index: number): TopFont {
  const backgrounds = ['#1f1f1f', '#33475b', '#44576c', '#748496', '#b85700'];
  return {
    id: String(item.generated_font_id),
    rank: index + 1,
    preview: item.name.slice(0, 2) || 'Aa',
    previewBackground: backgrounds[index % backgrounds.length],
    title: item.name,
    creator: 'Fontify',
    tags: [{ label: '?앹꽦?고듃', tone: 'blue' }],
    likes: 0,
  };
}

export function mapRatingToReview(item: ApiRatingItem): ReviewCard {
  return {
    id: String(item.rating_id),
    title: item.font_name,
    rating: item.score,
    sample: item.font_name,
    body: item.comment ?? '?묒꽦??由щ럭 ?댁슜???놁뒿?덈떎.',
    date: `${formatDateTime(item.rated_at)} ?묒꽦`,
  };
}

export function mapDownloadToPendingReviewFont(item: ApiDownloadItem, index: number): PendingReviewFont {
  return {
    id: String(item.generated_font_id ?? item.download_id),
    label: '理쒓렐 ?ㅼ슫濡쒕뱶',
    name: item.font_name,
    tone: index === 0 ? 'primary' : 'soft',
    mark: index === 0 ? 'quote' : 'lines',
  };
}


