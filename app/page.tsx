import Footer from '../components/Footer';
import Header from '../components/Header';

export default function HomePage() {
  return (
    <>
      <Header variant="home" />

      <main className="main">
        <section className="hero container">
          <div className="hero__bg" aria-hidden="true">
            <span className="hero__blob hero__blob--a" />
            <span className="hero__blob hero__blob--b" />
            <span className="hero__blob hero__blob--c" />
          </div>

          <div className="hero__grid">
            <div className="hero__copy">
              <h1>
                구글에서 제공하는 영어 폰트를
                <br />
                <span className="hero__accent">한글 폰트로 생성해 보세요</span>
              </h1>

              <p className="hero__desc">
                한글 생성 가능한 영어 폰트를 탐색하고,
                <br />
                <span className="nowrap">당신의 프로젝트에 딱 맞는 스타일을 찾아보세요.</span>
                <br />
                지금 바로 시작할 수 있습니다.
              </p>

              <div className="hero__actions">
                <button className="btn btn--primary" type="button">
                  구글 폰트
                </button>
                <button className="btn btn--ghost" type="button">
                  손글씨
                </button>
              </div>
            </div>

            <div className="hero__cards" aria-label="미리보기">
              <a className="pv" href="/english-detail">
                <header className="pv__top">
                  <span className="pv__name">Ubuntu</span>
                  <span className="pv__tag">구글</span>
                </header>
                <div className="pv__sample" style={{ fontFamily: 'Ubuntu, sans-serif' }}>
                  Hello, World!
                </div>
              </a>

              <a className="pv" href="/english-detail">
                <header className="pv__top">
                  <span className="pv__name">Merryweather</span>
                  <span className="pv__tag">구글</span>
                </header>
                <div
                  className="pv__sample"
                  style={{ fontFamily: 'Merriweather, serif' }}
                >
                  merry christmas
                </div>
              </a>

              <a className="pv" href="/english-detail">
                <header className="pv__top">
                  <span className="pv__name">Playfair</span>
                  <span className="pv__tag">구글</span>
                </header>
                <div className="pv__sample" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Hello, World!
                </div>
              </a>

              <a className="pv" href="/english-detail">
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
            <a className="font-card font-card--link" href="/selected">
              <div className="font-card__top">
                <span className="font-card__name">Ubuntu</span>
                <span className="pill">구글</span>
              </div>
              <div className="font-card__sample" style={{ fontFamily: 'Ubuntu, sans-serif' }}>
                merry ch…
              </div>
            </a>

            <a className="font-card font-card--link" href="/selected">
              <div className="font-card__top">
                <span className="font-card__name">Merryweather</span>
                <span className="pill">구글</span>
              </div>
              <div
                className="font-card__sample"
                style={{ fontFamily: 'Merriweather, serif' }}
              >
                merry chri…
              </div>
            </a>

            <a className="font-card font-card--link" href="/selected">
              <div className="font-card__top">
                <span className="font-card__name">Playfair</span>
                <span className="pill">구글</span>
              </div>
              <div
                className="font-card__sample"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                merry chr…
              </div>
            </a>

            <a className="font-card font-card--link" href="/selected">
              <div className="font-card__top">
                <span className="font-card__name">Lato</span>
                <span className="pill">구글</span>
              </div>
              <div className="font-card__sample" style={{ fontFamily: 'Lato, sans-serif' }}>
                merry chri…
              </div>
            </a>
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
            <a className="font-card font-card--link" href="/selected">
              <div className="font-card__top">
                <span className="font-card__name">Ubuntu</span>
                <span className="pill">구글</span>
              </div>
              <div className="font-card__sample" style={{ fontFamily: 'Ubuntu, sans-serif' }}>
                merry ch…
              </div>
            </a>

            <a className="font-card font-card--link" href="/selected">
              <div className="font-card__top">
                <span className="font-card__name">Merryweather</span>
                <span className="pill">구글</span>
              </div>
              <div
                className="font-card__sample"
                style={{ fontFamily: 'Merriweather, serif' }}
              >
                merry chri…
              </div>
            </a>

            <a className="font-card font-card--link" href="/selected">
              <div className="font-card__top">
                <span className="font-card__name">Playfair</span>
                <span className="pill">구글</span>
              </div>
              <div
                className="font-card__sample"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                merry chr…
              </div>
            </a>

            <a className="font-card font-card--link" href="/selected">
              <div className="font-card__top">
                <span className="font-card__name">Lato</span>
                <span className="pill">구글</span>
              </div>
              <div className="font-card__sample" style={{ fontFamily: 'Lato, sans-serif' }}>
                merry chri…
              </div>
            </a>
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

        <section className="container section community">
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

          <div className="gallery">
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

