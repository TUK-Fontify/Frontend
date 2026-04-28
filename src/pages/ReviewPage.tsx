import Header from '../components/Header';
import Footer from '../components/Footer';

type ReviewCard = {
  title: string;
  rating: number;
  sample: string;
  sampleClass?: string;
  body: string;
  date: string;
  featured?: boolean;
};

const pendingFonts = [
  {
    label: '최근 다운로드',
    name: 'Gwendolyn Signature',
    tone: 'primary',
    mark: 'quote',
  },
  {
    label: '프로젝트: 가을 컬렉션',
    name: 'Vogue Royale Serif',
    tone: 'soft',
    mark: 'lines',
  },
] as const;

const reviews: ReviewCard[] = [
  {
    title: 'Modern Archive Mono',
    rating: 5,
    sample: 'ABCDEFGHIJKLMN\n0123456789',
    sampleClass: 'reviewSample--mono',
    body:
      '기술 문서에 완벽합니다. 작은 크기에서도 가독성이 타의 추종을 불허합니다. 개발자 포털 UI에 사용했는데 반응이 매우 좋았습니다.',
    date: '2024년 10월 12일 작성',
  },
  {
    title: 'Whisper script Pro',
    rating: 4,
    sample: 'Ethereal Moments',
    sampleClass: 'reviewSample--script',
    body:
      '합자가 아름답지만 깔끔한 산세리프와 조합하기는 조금 까다로울 수 있습니다. 웨딩 초대장이나 럭셔리 브랜딩에 탁월합니다.',
    date: '2024년 9월 28일',
  },
  {
    title: 'Whisper script Pro',
    rating: 4,
    sample: 'Ethereal Moments',
    sampleClass: 'reviewSample--script',
    body:
      '합자가 아름답지만 깔끔한 산세리프와 조합하기는 조금 까다로울 수 있습니다. 웨딩 초대장이나 럭셔리 브랜딩에 탁월합니다.',
    date: '2024년 9월 28일',
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="reviewStars" aria-label={`${rating}점`}>
      {Array.from({ length: 5 }, (_, index) => (
        <span
          key={index}
          className={index < rating ? 'reviewStars__star is-filled' : 'reviewStars__star'}
          aria-hidden="true"
        >
          ★
        </span>
      ))}
    </div>
  );
}

function PendingFontCard({ font }: { font: (typeof pendingFonts)[number] }) {
  return (
    <article className="pendingCard">
      <div className={`pendingCard__mark pendingCard__mark--${font.mark}`} aria-hidden="true" />
      <p className="pendingCard__label">{font.label}</p>
      <h3 className="pendingCard__name">{font.name}</h3>
      <button
        className={
          font.tone === 'primary'
            ? 'pendingCard__button pendingCard__button--primary'
            : 'pendingCard__button'
        }
        type="button"
      >
        리뷰 작성하기
        <span aria-hidden="true">→</span>
      </button>
    </article>
  );
}

function ReviewItem({ review }: { review: ReviewCard }) {
  return (
    <article className="reviewCard">
      <header className="reviewCard__header">
        <div>
          <h3 className="reviewCard__title">{review.title}</h3>
          <StarRating rating={review.rating} />
        </div>
        <button className="reviewCard__more" type="button" aria-label="리뷰 메뉴">
          ⋮
        </button>
      </header>

      <div className="reviewCard__content">
        <div className={`reviewSample ${review.sampleClass ?? ''}`}>
          {review.sample.split('\n').map((line) => (
            <span key={line}>{line}</span>
          ))}
        </div>
        <p className="reviewCard__body">{review.body}</p>
      </div>

      <footer className="reviewCard__footer">
        <span>{review.date}</span>
        <div className="reviewCard__actions">
          <button type="button">수정</button>
          <button className="is-danger" type="button">
            삭제
          </button>
        </div>
      </footer>
    </article>
  );
}

export default function ReviewPage() {
  return (
    <>
      <Header />
      <main className="reviewPage">
        <section className="reviewHero container">
          <div className="reviewHero__heading">
            <p className="reviewEyebrow">대기 중인 피드백</p>
            <h1>리뷰 대기중인 작업</h1>
          </div>
          <p className="reviewHero__desc">
            최근 사용하신 서체에 대한 소중한 의견을 공유하여 주세요.
          </p>
        </section>

        <section className="reviewPending container" aria-label="리뷰 대기중인 서체">
          <div className="reviewPending__cards">
            {pendingFonts.map((font) => (
              <PendingFontCard key={font.name} font={font} />
            ))}
            <article className="reviewStatsCard">
              <strong>04</strong>
              <span>피드백 대기 중인 서체</span>
              <div className="reviewStatsCard__bar" aria-hidden="true">
                <i />
              </div>
            </article>
          </div>
        </section>

        <section className="reviewManage container">
          <header className="reviewManage__header">
            <h2>나의 리뷰 관리</h2>
            <div className="reviewManage__tools">
              <button className="reviewToolBtn" type="button">
                최신순
                <span aria-hidden="true">⌄</span>
              </button>
              <button className="reviewIconBtn" type="button" aria-label="필터">
                <span />
              </button>
            </div>
          </header>

          <div className="reviewMasonry">
            <ReviewItem review={reviews[0]} />
            <article className="reviewImpactCard">
              <div className="reviewImpactCard__spark" aria-hidden="true">
                ✦
              </div>
              <h3>리뷰의 영향력</h3>
              <p>
                회원님의 리뷰가 <strong>3422명 이상의 디자이너</strong>의 프로젝트에 맞는
                서체를 선택하는 데 도움을 주었습니다.
              </p>
              <div className="reviewImpactCard__avatars" aria-hidden="true">
                <span>AA</span>
                <span>BB</span>
                <span>CC</span>
                <strong>+3.4k</strong>
              </div>
            </article>
            <ReviewItem review={reviews[1]} />
            <ReviewItem review={reviews[2]} />
            <article className="reviewFeatureCard">
              <div>
                <strong>Vogue Royale</strong>
                <span>EDITORIAL SAMPLE</span>
              </div>
              <footer>
                <p>추천 리뷰</p>
                <h3>현대 에디토리얼 공간에서의 타이포그래피: Vogue Royale 리뷰.</h3>
              </footer>
            </article>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
