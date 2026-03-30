 'use client';

type HeaderProps = {
  /**
   * - 'home': hash links stay in-page (e.g. #popular)
   * - 'english-detail' | 'selected': hash links become /#popular style
   */
  activeNav?: 'english' | 'my' | 'none';
  variant?: 'home' | 'english-detail' | 'selected';
};

export default function Header({
  activeNav = 'none',
  variant = 'home',
}: HeaderProps) {
  const base = variant === 'home' ? '' : '/';

  const englishLinkClass =
    activeNav === 'english' ? 'nav__link nav__link--active' : 'nav__link';

  const myLinkClass =
    activeNav === 'my' ? 'nav__link nav__link--active' : 'nav__link nav__link--muted';

  return (
    <header className="header">
      <div className="container header__top">
        <a className="brand" href="/">
          <img
            className="brand__logoImg"
            src="/figma-logo.png"
            alt="Fontify logo"
          />
        </a>

        <div className="search">
          <input className="search__input" placeholder="폰트명, 키워드로 폰트 검색" />
          <button className="search__icon" aria-label="검색" />
        </div>

        <button className="btn btn--outline" type="button">
          <span className="btn__icon" aria-hidden="true" />
          로그인
        </button>
      </div>

      <nav className="container header__nav">
        <div className="nav">
          <a className="nav__link" href={`${base}#popular`}>
            인기 폰트(다운로드 순)
          </a>
          <a className="nav__link" href={`${base}#recommend`}>
            추천 폰트(만족도 높은 순)
          </a>
          <a className={englishLinkClass} href="/english-detail">
            영어 폰트
          </a>
          <a className="nav__link" href="#">
            손글씨
          </a>
        </div>
        <a className={myLinkClass} href="/my-page">
          마이 폰트
        </a>
      </nav>
    </header>
  );
}

