import type {
  ApiDownloadItem,
  ApiFontFileItem,
  ApiGeneratedFontItem,
  ApiGenerationCreateResponse,
  ApiMeResponse,
  ApiRatingItem,
  ApiGenerationStatus,
} from './backendTypes';
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
  if (!dateValue) return '대기 중';
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

function timelineStateForPhase(phase: WorkPhase, index: number): WorkTimelineState {
  if (phase === 'failed') return index === 0 ? 'failed' : 'waiting';
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
  failReason?: string | null,
): WorkTimelineLog[] {
  const requestedAt = formatDateTime(requestedAtValue);
  const steps = [
    {
      title: '작업 요청 접수',
      detail: `${requestedAt}에 생성 요청이 등록되었습니다.`,
    },
    {
      title: '영문 스타일 분석',
      detail: '선택한 영문 폰트 스타일을 분석하고 한글 구조로 변환하고 있습니다.',
    },
    {
      title: 'AI 재학습',
      detail: '1차 결과를 바탕으로 14자 미리보기와 전체 스타일 일관성을 맞추고 있습니다.',
    },
    {
      title: '2,350자 완성',
      detail:
        phase === 'failed'
          ? failReason ?? '생성 작업이 실패했습니다.'
          : phase === 'completed'
            ? '최종 폰트 파일이 생성되어 다운로드할 수 있습니다.'
            : '완료 후 TTF 다운로드 URL이 연결됩니다.',
    },
  ];

  return steps.map((step, index) => ({
    id: `${jobId}-log-${index + 1}`,
    time: index === 0 ? requestedAt : '대기',
    title: phase === 'failed' && index === 3 ? '생성 실패' : step.title,
    detail: step.detail,
    state: timelineStateForPhase(phase, index),
  }));
}

function mapPreviewUrlsToLetters(urls: string[]) {
  if (urls.length === 0) return undefined;
  const fallback = ['가', '나', '다', '라', '마', '바', '사', '아', '자', '차', '카', '타', '파', '하'];
  return urls.map((url, index) => {
    const filename = url.split('/').pop() ?? '';
    const letter = decodeURIComponent(filename).replace('.png', '');
    return letter || fallback[index] || `미리보기 ${index + 1}`;
  });
}

function absolutizeAssetUrl(url: string | null) {
  if (!url) return undefined;
  if (/^https?:\/\//.test(url)) return url;
  return url;
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

  return {
    id: String(status.job_id),
    title: storedJob.fontName || `Fontify 작업 #${status.job_id}`,
    updatedAt: `요청일: ${formatDateTime(storedJob.requestedAt)}`,
    progressPercent,
    phase,
    statusLabel: status.status,
    failReason: status.fail_reason,
    sample: 'Aa',
    previewLetters: hasPreview ? mapPreviewUrlsToLetters(status.preview_image_urls) : undefined,
    previewImageUrls: hasPreview ? status.preview_image_urls.map((url) => absolutizeAssetUrl(url) ?? url) : undefined,
    downloadUrl: absolutizeAssetUrl(status.generated_font_url),
    logs: buildWorkLogs(status.job_id, storedJob.requestedAt, phase, status.fail_reason),
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
    joinedDaysLabel: `Fontify와 함께한지 ${daysSince(me.created_at)}일째`,
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
      label: '작성한 리뷰',
      value: String(params.ratingsCount),
      href: '#/reviews',
    },
    {
      id: 'working-fonts',
      iconSrc: statOwnedIconSrc,
      label: '작업중인 폰트',
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
    kind: '무료',
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
  if (type === 'Serif') return ['보고서', '사무적인'];
  if (type === 'Handwriting') return ['날려쓰는'];
  if (type === 'Display') return ['게임틱한'];
  return ['문서'];
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
    tags: [{ label: '생성폰트', tone: 'blue' }],
    likes: 0,
  };
}

export function mapRatingToReview(item: ApiRatingItem): ReviewCard {
  return {
    id: String(item.rating_id),
    title: item.font_name,
    rating: item.score,
    sample: item.font_name,
    body: item.comment ?? '작성된 리뷰 내용이 없습니다.',
    date: `${formatDateTime(item.rated_at)} 작성`,
  };
}

export function mapDownloadToPendingReviewFont(item: ApiDownloadItem, index: number): PendingReviewFont {
  return {
    id: String(item.generated_font_id ?? item.download_id),
    label: '최근 다운로드',
    name: item.font_name,
    tone: index === 0 ? 'primary' : 'soft',
    mark: index === 0 ? 'quote' : 'lines',
  };
}
