import { useEffect, useRef, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const heroSlides = ['existing', 'figma'] as const;
const COMMUNITY_BATCH_SIZE = 3;
const COMMUNITY_TILE_COUNT = 10;

const bannerAvatar1 = '/images/my-page/activity-like-icon.svg';
const bannerAvatar2 = '/images/my-page/activity-owned-font-icon.svg';

type HomeFontCardData = {
  name: string;
  source: string;
  sample: string;
  fontFamily: string;
  description: string;
};

const popularFonts: HomeFontCardData[] = [
  {
    name: 'Ubuntu',
    source: '구글',
    sample: 'merry ch…',
    fontFamily: 'Ubuntu, sans-serif',
    description: '둥근 인상과 단단한 획이 어울려 서비스 타이틀과 배너에 쓰기 좋은 산세리프입니다.',
  },
  {
    name: 'Merryweather',
    source: '구글',
    sample: 'merry chri…',
    fontFamily: 'Merriweather, serif',
    description: '긴 문장에서도 안정적인 리듬을 주는 세리프 폰트로, 소개글과 에디토리얼 문맥에 잘 맞습니다.',
  },
  {
    name: 'Playfair',
    source: '구글',
    sample: 'merry chr…',
    fontFamily: "'Playfair Display', serif",
    description: '대비가 큰 획과 우아한 곡선이 특징이라 브랜드 헤드라인이나 고급스러운 카드에 잘 어울립니다.',
  },
  {
    name: 'Lato',
    source: '구글',
    sample: 'merry chri…',
    fontFamily: 'Lato, sans-serif',
    description: '부드럽고 중립적인 인상이 강해 본문, 버튼, 대시보드 UI에 부담 없이 사용할 수 있습니다.',
  },
];

const recommendedFonts: HomeFontCardData[] = [
  {
    name: 'Ubuntu',
    source: '구글',
    sample: 'merry ch…',
    fontFamily: 'Ubuntu, sans-serif',
    description: '프로덕트 화면에서 개성을 조금 더하고 싶을 때 쓰기 좋은 균형 잡힌 폰트입니다.',
  },
  {
    name: 'Merryweather',
    source: '구글',
    sample: 'merry chri…',
    fontFamily: 'Merriweather, serif',
    description: '차분한 무게감이 있어 블로그, 리뷰, 긴 설명이 많은 화면에서 읽기 흐름을 안정시킵니다.',
  },
  {
    name: 'Playfair',
    source: '구글',
    sample: 'merry chr…',
    fontFamily: "'Playfair Display', serif",
    description: '짧은 문구를 강하게 보여주는 데 강점이 있어 포스터형 배너와 프리미엄 무드에 적합합니다.',
  },
  {
    name: 'Lato',
    source: '구글',
    sample: 'merry chri…',
    fontFamily: 'Lato, sans-serif',
    description: '가독성과 친근함이 좋아 다양한 화면에서 기본 UI 폰트처럼 자연스럽게 녹아듭니다.',
  },
];

function HomeFontCard({ font }: { font: HomeFontCardData }) {
  return (
    <a className="font-card font-card--link" href="#/selected">
      <div className="font-card__top">
        <span className="font-card__name">{font.name}</span>
        <span className="pill">{font.source}</span>
      </div>
      <div className="font-card__sample" style={{ fontFamily: font.fontFamily }}>
        {font.sample}
      </div>
      <div className="font-card__popover" role="tooltip">
        <strong>{font.name}</strong>
        <div className="font-card__popoverSample" style={{ fontFamily: font.fontFamily }}>
          {font.sample}
        </div>
        <p>{font.description}</p>
      </div>
    </a>
  );
}

export default function HomePage() {
  const [slideIndex, setSlideIndex] = useState(0);
  const [visibleCommunityCount, setVisibleCommunityCount] = useState(0);
  const communityRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % heroSlides.length);
    }, 8000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const updateCommunityReveal = () => {
      const sectionEl = communityRef.current;
      if (!sectionEl) return;

      const rect = sectionEl.getBoundingClientRect();
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
      const triggerLine = viewportHeight * 0.85;

      if (rect.top > triggerLine) {
        setVisibleCommunityCount(0);
        return;
      }

      const progress = Math.max(0, triggerLine - rect.top);
      // Increase step distance so each batch reveal is more noticeable.
      const stepSize = Math.max(320, viewportHeight * 0.6);
      const totalBatches = Math.ceil(COMMUNITY_TILE_COUNT / COMMUNITY_BATCH_SIZE);
      const revealedBatches = Math.min(totalBatches, 1 + Math.floor(progress / stepSize));
      setVisibleCommunityCount(revealedBatches * COMMUNITY_BATCH_SIZE);
    };

    updateCommunityReveal();
    window.addEventListener('scroll', updateCommunityReveal, { passive: true });
    window.addEventListener('resize', updateCommunityReveal);

    return () => {
      window.removeEventListener('scroll', updateCommunityReveal);
      window.removeEventListener('resize', updateCommunityReveal);
    };
  }, []);

  const currentSlide = heroSlides[slideIndex];

  return (
    <>
      <Header variant="home" />

      <main className="main">
        <section className="hero hero--banner container">
          <div className="hero__bg" aria-hidden="true">
            <span className="hero__blob hero__blob--a" />
            <span className="hero__blob hero__blob--b" />
            <span className="hero__blob hero__blob--c" />
          </div>

          {/* 메인 상단 슬라이더 컨테이너 */}
          <div className="heroSlideFrame">
            {currentSlide === 'existing' ? (
              // Slide 1: 메인 배너(텍스트/우측 카드)
              <div className="hero__grid hero__grid--existing">
              <div className="hero__copy">
                <span className="hero__tag">GOOGLE FONTS CONVERT</span>
                <h1 className="hero__titleTwoLine">
                  <span>A에서 ㅎ까지,</span>
                  <span className="hero__accentLine">디자인은 끊기지 않아야 하니까.</span>
                </h1>

                <p className="hero__desc">
                  한글 생성 가능한 영어 폰트를 탐색하고,
                  <br />
                  <span className="nowrap">당신의 프로젝트에 딱 맞는 스타일을 찾아보세요.</span>
                  <br />
                </p>

                <div className="hero__actions">
                  <button
                    className="heroPromo__btn heroPromo__btn--primary heroPromo__btn--primaryBlue"
                    type="button"
                  >
                    구글 폰트에서 시작하기
                  </button>
                </div>

                <div className="heroPromo__social">
                  <div className="heroPromo__avatars">
                    <img src={bannerAvatar1} alt="" />
                    <img src={bannerAvatar2} alt="" />
                    <div className="heroPromo__avatarsMore">+2k</div>
                  </div>
                  <p>12,400+ 명의 작가가 이미 폰트를 만들었습니다.</p>
                </div>
              </div>

              {/* Slide 1 우측 카드: 카드 문구/샘플 폰트 수정 지점 */}
              <div className="hero__cards" aria-label="미리보기">
                <a className="pv" href="#/english-detail">
                  <header className="pv__top">
                    <span className="pv__name">Ubuntu</span>
                    <span className="pv__tag">구글</span>
                  </header>
                  <div className="pv__sample" style={{ fontFamily: 'Ubuntu, sans-serif' }}>
                    Hello, World!
                  </div>
                </a>

                <a className="pv" href="#/english-detail">
                  <header className="pv__top">
                    <span className="pv__name">Merryweather</span>
                    <span className="pv__tag">구글</span>
                  </header>
                  <div className="pv__sample" style={{ fontFamily: 'Merriweather, serif' }}>
                    merry christmas
                  </div>
                </a>

                <a className="pv" href="#/english-detail">
                  <header className="pv__top">
                    <span className="pv__name">Playfair</span>
                    <span className="pv__tag">구글</span>
                  </header>
                  <div className="pv__sample" style={{ fontFamily: "'Playfair Display', serif" }}>
                    Hello, World!
                  </div>
                </a>

                <a className="pv" href="#/english-detail">
                  <header className="pv__top">
                    <span className="pv__name">Lato</span>
                    <span className="pv__tag">구글</span>
                  </header>
                  <div className="pv__sample" style={{ fontFamily: 'Lato, sans-serif' }}>
                    Hello, World!
                  </div>
                </a>

                <article className="pv pv--dim" aria-hidden="true">
                  <header className="pv__top">
                    <span className="pv__name">Ubuntu</span>
                    <span className="pv__tag">구글</span>
                  </header>
                  <div className="pv__skeleton" />
                </article>

                <article className="pv pv--dim" aria-hidden="true">
                  <header className="pv__top">
                    <span className="pv__name">Ubuntu</span>
                    <span className="pv__tag">구글</span>
                  </header>
                  <div className="pv__skeleton" />
                </article>
              </div>
              </div>
            ) : (
              <div className="heroPromo">
              <div className="heroPromo__left">
                <span className="heroPromo__tag">INK &amp; PIXEL EDITORIAL</span>

                <h1 className="heroPromo__title">
                  당신의 손글씨가
                  <br />
                  <span className="heroPromo__line">
                    <span className="heroPromo__accent">영원한 폰트</span>가 되는 순간
                  </span>
                </h1>

                <p className="heroPromo__desc">
                  세상에 단 하나뿐인 당신의 기록을 디지털로 숨 쉬게 하세요.
                  <br />
                  가장 따뜻한 기술로 완성하는 나만의 서체 라이브러리.
                </p>

                {/* Slide 2 CTA 버튼: 라우팅/문구 수정 지점 */}
                <div className="heroPromo__actions">
                  <button
                    className="heroPromo__btn heroPromo__btn--primary"
                    type="button"
                    onClick={() => {
                      window.location.hash = '#/handwriting';
                    }}
                  >
                    나만의 폰트 만들기
                  </button>
                  <button className="heroPromo__btn heroPromo__btn--ghost" type="button">
                    샘플 둘러보기
                  </button>
                </div>

                <div className="heroPromo__social">
                  <div className="heroPromo__avatars">
                    <img src={bannerAvatar1} alt="" />
                    <img src={bannerAvatar2} alt="" />
                    <div className="heroPromo__avatarsMore">+2k</div>
                  </div>
                  <p>12,400+ 명의 작가가 이미 폰트를 만들었습니다.</p>
                </div>
              </div>

              {/* Slide 2 우측 카드: 타이틀/배지/칩 수정 지점 */}
              <div className="heroPromo__right">
                <div className="heroPromo__card">
                  <p className="heroPromo__cardEyebrow">PREVIEW MODE</p>
                  <h3 className="heroPromo__cardTitle">Digital Ink Engine</h3>
                  <div className="heroPromo__handword">사랑</div>
                  <div className="heroPromo__cardFooter">
                    <span className="heroPromo__cardDot" />
                    <span>Editorial Choice</span>
                    <span className="heroPromo__version">VER. 2.0</span>
                  </div>
                </div>

                <div className="heroPromo__floating heroPromo__floating--badge">
                  AI ACCURACY 99.8%
                </div>
                <div className="heroPromo__floating heroPromo__floating--chip">
                  Real-time Rendering
                </div>
              </div>
            </div>
            )}
          </div>

          <div className="heroBanner__dots" aria-label="메인 광고 슬라이드 인디케이터">
            {heroSlides.map((slide, idx) => (
              <button
                key={slide}
                type="button"
                className={`heroBanner__dot ${idx === slideIndex ? 'heroBanner__dot--active' : ''}`}
                onClick={() => setSlideIndex(idx)}
                aria-label={`${idx + 1}번 슬라이드`}
              />
            ))}
          </div>
        </section>

        <section id="popular" className="container section">
          <div className="section__head">
            <div className="section__title">
              <h2>인기 폰트</h2>
              <span>(다운로드 순)</span>
            </div>
            <a className="chip" href="#">
              인기 폰트
            </a>
          </div>

          <div className="cards cards--4">
            {popularFonts.map((font) => (
              <HomeFontCard key={`popular-${font.name}`} font={font} />
            ))}
          </div>
        </section>

        <section id="recommend" className="container section">
          <div className="section__head">
            <div className="section__title">
              <h2>추천 폰트</h2>
              <span>(만족도 순)</span>
            </div>
            <a className="chip" href="#">
              추천 폰트
            </a>
          </div>

          <div className="cards cards--4">
            {recommendedFonts.map((font) => (
              <HomeFontCard key={`recommend-${font.name}`} font={font} />
            ))}
          </div>
        </section>

        <section className="howto">
          <div className="howto__blur" aria-hidden="true" />

          <div className="container howto__inner">
            <p className="howto__eyebrow">How It Works</p>
            <h2 className="howto__title">작동 방식</h2>

            <div className="steps" role="list">
              <div className="step" role="listitem">
                <div className="step__icon step__icon--a" />
                <h3>구글 폰트 선택</h3>
                <p>마음에 드는 영문 폰트를 선택하세요.</p>
              </div>

              <div className="step step--active" role="listitem">
                <div className="step__icon step__icon--b" />
                <h3>AI 스타일 분석 및 변환</h3>
                <p>
                  AI가 선택한 폰트의 특징을 분석하여
                  <br />
                  어울리는 한글 글꼴을 생성합니다.
                </p>
              </div>

              <div className="step" role="listitem">
                <div className="step__icon step__icon--c" />
                <h3>폰트 다운로드</h3>
                <p>생성된 한글 폰트를 즉시 다운로드하세요.</p>
              </div>

              <div className="steps__line" aria-hidden="true" />
            </div>
          </div>
        </section>

        {/* 커뮤니티/리뷰: 카드 내용 + 스크롤 단계 노출 인터랙션 대상 */}
        <section ref={communityRef} className="container section community">
          <div className="section__head">
            <div>
              <h2 className="community__title">커뮤니티 / 리뷰</h2>
              <p className="community__desc">
                다른 사용자들이 생성한 놀라운 폰트들을 확인해보세요.
              </p>
            </div>
            <a className="link-more" href="#">
              더 보기 <span aria-hidden="true">→</span>
            </a>
          </div>

          <div className={`gallery gallery--reveal gallery--count-${visibleCommunityCount}`}>
            <article className="tile tile--blue tile--h256">
              <div className="tile__center">
                <div className="tile__big">
                  안녕하세요
                  <br />
                  폰티파이
                </div>
              </div>
              <footer className="tile__footer tile__footer--light">
                <span>안녕가득</span>
                <span className="stat stat--light">♥ 79</span>
              </footer>
            </article>

            <article className="tile tile--dark tile--h320">
              <div className="tile__center">
                <div className="tile__big" style={{ fontSize: '30px', lineHeight: '36px' }}>
                  안녕하세요
                </div>
                <div className="tile__sub">우아한 명조체</div>
              </div>
              <footer className="tile__footer">
                <span>designer_k</span>
                <span className="stat stat--red">♥ 124</span>
              </footer>
            </article>

            <article className="tile tile--white tile--h160">
              <div className="tile__center">
                <div className="tile__mid">안녕하세요</div>
              </div>
              <footer className="tile__footer tile__footer--muted">
                <span>user_12</span>
                <span className="dot" />
              </footer>
            </article>

            <article className="tile tile--soft tile--h192">
              <div className="tile__center">
                <div className="tile__code">Code_Font</div>
              </div>
              <footer className="tile__footer tile__footer--muted">
                <span>dev_lee</span>
                <span className="dot" />
              </footer>
            </article>

            <article className="tile tile--black tile--h224">
              <div className="tile__center">
                <div className="tile__big">기울임체</div>
              </div>
              <footer className="tile__footer">
                <span>italic_lover</span>
                <span className="stat stat--red">♥ 32</span>
              </footer>
            </article>

            <article className="tile tile--white tile--h256">
              <div className="tile__center">
                <div className="tile__display">Fontify</div>
              </div>
              <footer className="tile__footer tile__footer--muted">
                <span>Cursive_Style</span>
                <span className="stat stat--pink">♥ 89</span>
                <span className="stat">★ 5</span>
              </footer>
            </article>

            <article className="tile tile--accent tile--h192">
              <div className="tile__center">
                <div className="tile__popular">POPULAR</div>
              </div>
              <footer className="tile__footer tile__footer--accent">
                <span>trend_setter</span>
                <span className="dot dot--accent" />
              </footer>
            </article>

            <article className="tile tile--white tile--h256 tile--kanji">
              <div className="tile__center">
                <div className="tile__ghost">A</div>
                <div className="tile__kanji">가</div>
              </div>
              <footer className="tile__footer tile__footer--muted">
                <span>Graphic_Kr</span>
                <span className="stat stat--red">♥ 67</span>
              </footer>
            </article>

            <article className="tile tile--night tile--h208">
              <div className="tile__center">
                <div
                  className="tile__mid"
                  style={{ color: '#e5e7eb', fontWeight: 300 }}
                >
                  여 백
                </div>
              </div>
              <footer className="tile__footer">
                <span>minimalist</span>
                <span className="stat">★ 2</span>
              </footer>
            </article>

            <article className="tile tile--white tile--h176">
              <div className="tile__center">
                <div className="tile__mid">폰티파이</div>
              </div>
              <footer className="tile__footer tile__footer--muted">
                <span>Bold_Sans</span>
                <span className="stat stat--salmon">♥ 45</span>
              </footer>
            </article>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

