import { useMemo, useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';

const downloadIconSrc = '/images/common/download-icon.svg';

type TagTone = 'pink' | 'blue' | 'green' | 'purple' | 'yellow' | 'gray';

type TopFont = {
  id: string;
  rank: number;
  preview: string;
  previewBackground: string;
  title: string;
  creator: string;
  tags: { label: string; tone: TagTone }[];
  likes: number;
  downloaded?: boolean;
};

const topFonts: TopFont[] = [
  {
    id: 'ubuntu-6',
    rank: 1,
    preview: '식넴',
    previewBackground: '#1f1f1f',
    title: 'Ubuntu 6',
    creator: '구글 (Google Fonts)',
    tags: [
      { label: '둥글둥글', tone: 'pink' },
      { label: '귀여운', tone: 'pink' },
    ],
    likes: 1240,
  },
  {
    id: 'playfair-display',
    rank: 2,
    preview: '명조',
    previewBackground: '#33475b',
    title: 'Playfair Display',
    creator: 'Claus Eggers Sørensen',
    tags: [
      { label: '세리프', tone: 'blue' },
      { label: '모던', tone: 'gray' },
    ],
    likes: 1098,
  },
  {
    id: 'lato-kr',
    rank: 3,
    preview: '라토',
    previewBackground: '#44576c',
    title: 'Lato KR',
    creator: 'Łukasz Dziedzic',
    tags: [
      { label: '고딕', tone: 'green' },
      { label: '깔끔한', tone: 'gray' },
    ],
    likes: 912,
  },
  {
    id: 'roboto-mono',
    rank: 4,
    preview: '코딩',
    previewBackground: '#748496',
    title: 'Roboto Mono',
    creator: 'Christian Robertson',
    tags: [
      { label: '개발자', tone: 'purple' },
      { label: '고정폭', tone: 'gray' },
    ],
    likes: 844,
  },
  {
    id: 'merriweather',
    rank: 5,
    preview: '메리',
    previewBackground: '#b85700',
    title: 'Merriweather',
    creator: 'Sorkin Type',
    tags: [
      { label: '우아한', tone: 'yellow' },
      { label: '세리프', tone: 'blue' },
    ],
    likes: 745,
  },
  {
    id: 'pretendard',
    rank: 6,
    preview: '기본',
    previewBackground: '#5c6b7a',
    title: 'Pretendard',
    creator: '길형진 · orioncactus',
    tags: [
      { label: '실용적', tone: 'green' },
      { label: '가독성', tone: 'gray' },
    ],
    likes: 702,
  },
  {
    id: 'nanum-square',
    rank: 7,
    preview: '네모',
    previewBackground: '#34506a',
    title: '나눔스퀘어',
    creator: '네이버',
    tags: [
      { label: '고딕', tone: 'green' },
      { label: '브랜드', tone: 'purple' },
    ],
    likes: 681,
  },
  {
    id: 'spoqa',
    rank: 8,
    preview: '스포',
    previewBackground: '#263442',
    title: 'Spoqa Han Sans Neo',
    creator: 'Spoqa',
    tags: [
      { label: '모던', tone: 'gray' },
      { label: '스타트업', tone: 'blue' },
    ],
    likes: 654,
  },
];

type FontRowProps = {
  font: TopFont;
  liked: boolean;
  onToggleLike: (id: string) => void;
  onDownload: (id: string) => void;
};

function FontRow({ font, liked, onToggleLike, onDownload }: FontRowProps) {
  return (
    <article className="top10__row">
      <div className={`top10__rank ${font.rank === 1 ? 'top10__rank--active' : ''}`}>
        {font.rank}
      </div>

      <a className="top10__previewCol top10__previewCol--link" href="#/selected">
        <div className="top10__preview" style={{ background: font.previewBackground }}>
          {font.preview}
        </div>
      </a>

      <div className="top10__info">
        <h3 className="top10__fontName">
          <a className="top10__fontLink" href="#/selected">
            {font.title}
          </a>
        </h3>
        <p className="top10__fontMeta">{font.creator}</p>
      </div>

      <div className="top10__tags">
        {font.tags.map((tag) => (
          <span key={tag.label} className={`top10__tag top10__tag--${tag.tone}`}>
            {tag.label}
          </span>
        ))}
      </div>

      <button
        className={`top10__likesButton ${liked ? 'top10__likesButton--active' : ''}`}
        type="button"
        aria-label={liked ? `${font.title} 좋아요 취소` : `${font.title} 좋아요`}
        onClick={() => onToggleLike(font.id)}
      >
        <span className="top10__likeIcon" aria-hidden="true">
          {liked ? '♥' : '♡'}
        </span>
        <span>{font.likes.toLocaleString('ko-KR')}</span>
      </button>

      <button
        className={`top10__download ${font.downloaded ? 'top10__download--done' : ''}`}
        type="button"
        aria-label={`${font.title} 다운로드`}
        onClick={() => onDownload(font.id)}
      >
        {font.downloaded ? (
          '완료'
        ) : (
          <img className="top10__downloadIcon" src={downloadIconSrc} alt="" aria-hidden="true" />
        )}
      </button>
    </article>
  );
}

export default function Top10Page() {
  const [fonts, setFonts] = useState<TopFont[]>(topFonts);
  const [visibleCount, setVisibleCount] = useState(5);
  const [likedIds, setLikedIds] = useState<string[]>([]);
  const visibleFonts = useMemo(() => fonts.slice(0, visibleCount), [fonts, visibleCount]);
  const hasMore = visibleCount < fonts.length;

  const toggleLike = (id: string) => {
    setFonts((current) =>
      current.map((font) => {
        if (font.id !== id) return font;
        const isLiked = likedIds.includes(id);
        return { ...font, likes: font.likes + (isLiked ? -1 : 1) };
      }),
    );
    setLikedIds((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    );
  };

  const handleDownload = (id: string) => {
    setFonts((current) =>
      current.map((font) => (font.id === id ? { ...font, downloaded: true } : font)),
    );
  };

  const handleMore = () => {
    setVisibleCount((current) => Math.min(current + 3, fonts.length));
  };

  return (
    <>
      <Header variant="top10" activeNav="popular" />

      <main className="main">
        <section className="top10">
          <div className="top10__container">
            <header className="top10__hero">
              <h1 className="top10__title">TOP 10</h1>
              <p className="top10__desc">
                성공적인 한글 폰트 생성으로
                <br />
                가장 많은 사랑을 받고 있는 한글 폰트를
                <br />
                TOP 10에서 만나보세요
              </p>
            </header>

            <div className="top10__tableHead" aria-hidden="true">
              <span>순위</span>
              <span>미리보기</span>
              <span>폰트 정보</span>
              <span>태그</span>
              <span>좋아요</span>
              <span>다운로드</span>
            </div>

            <div className="top10__list">
              {visibleFonts.map((font) => (
                <FontRow
                  key={font.id}
                  font={font}
                  liked={likedIds.includes(font.id)}
                  onToggleLike={toggleLike}
                  onDownload={handleDownload}
                />
              ))}
            </div>

            <div className="top10__moreWrap">
              <button
                className="top10__more"
                type="button"
                onClick={handleMore}
                disabled={!hasMore}
              >
                {hasMore ? '더 보기' : '모두 확인했어요'}
                <span className="top10__moreArrow" aria-hidden="true">
                  {hasMore ? '▾' : '✓'}
                </span>
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
