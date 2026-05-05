import { useMemo, useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';

type FilterKey = 'Serif' | 'Sans Serif' | 'Handwriting' | 'Display';
type SortKey = 'popular' | 'latest';
type ViewMode = 'grid' | 'list';
type KeywordKey =
  | '동글동글'
  | '사무적인'
  | '보고서'
  | '날려쓰는'
  | '게임틱한'
  | '문서';

type FontCard = {
  id: string;
  name: string;
  creator: string;
  previewFamily: string;
  type: FilterKey;
  preview: string;
  tags: KeywordKey[];
};

const planeIcon =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'%3E%3Cpath fill='%2323c3e6' d='M0 185c0-21 14-40 35-46L471 1c27-8 52 17 44 44L377 477c-6 21-25 35-46 35-24 0-45-16-51-39l-59-189L32 236C13 231 0 214 0 193v-8z'/%3E%3Cpath fill='%2336a2e6' d='M221 284l294-239-138 432c-6 21-25 35-46 35-24 0-45-16-51-39l-59-189z'/%3E%3C/svg%3E";

const filters: FilterKey[] = ['Serif', 'Sans Serif', 'Handwriting', 'Display'];
const keywordOptions: KeywordKey[] = [
  '동글동글',
  '사무적인',
  '보고서',
  '날려쓰는',
  '게임틱한',
  '문서',
];

const fonts: FontCard[] = [
  {
    id: 'montserrat',
    name: 'Montserrat Bold',
    creator: 'Julieta Ulanovsky',
    previewFamily: 'Montserrat, Pretendard, sans-serif',
    type: 'Sans Serif',
    preview: 'Font Preview',
    tags: ['동글동글', '문서'],
  },
  {
    id: 'pacifico',
    name: 'Pacifico Regular',
    creator: 'Vernon Adams',
    previewFamily: 'Pacifico, cursive',
    type: 'Handwriting',
    preview: 'Font Preview',
    tags: ['게임틱한', '날려쓰는'],
  },
  {
    id: 'playfair',
    name: 'Playfair Display',
    creator: 'Claus Eggers',
    previewFamily: "'Playfair Display', Georgia, serif",
    type: 'Serif',
    preview: 'Font Preview',
    tags: ['사무적인', '보고서'],
  },
  {
    id: 'roboto-light',
    name: 'Roboto Light',
    creator: 'Christian Robertson',
    previewFamily: 'Roboto, Pretendard, sans-serif',
    type: 'Sans Serif',
    preview: 'Font Preview',
    tags: ['문서'],
  },
  {
    id: 'open-sans',
    name: 'Open Sans',
    creator: 'Steve Matteson',
    previewFamily: "'Open Sans', Pretendard, sans-serif",
    type: 'Sans Serif',
    preview: 'Font Preview',
    tags: ['동글동글'],
  },
  {
    id: 'lora',
    name: 'Lora Regular',
    creator: 'Cyreal',
    previewFamily: 'Lora, Georgia, serif',
    type: 'Serif',
    preview: 'Font Preview',
    tags: ['보고서'],
  },
  {
    id: 'dancing-script',
    name: 'Dancing Script',
    creator: 'Pablo Impallari',
    previewFamily: "'Dancing Script', cursive",
    type: 'Handwriting',
    preview: 'Font Preview',
    tags: ['날려쓰는'],
  },
  {
    id: 'arimo-bold',
    name: 'Arimo Bold',
    creator: 'Steve Matteson',
    previewFamily: 'Arimo, Pretendard, sans-serif',
    type: 'Sans Serif',
    preview: 'Font Preview',
    tags: ['사무적인'],
  },
  {
    id: 'press-start',
    name: 'Press Start 2P',
    creator: 'CodeMan38',
    previewFamily: "'Press Start 2P', monospace",
    type: 'Display',
    preview: 'Font Preview',
    tags: ['게임틱한'],
  },
  {
    id: 'quicksand',
    name: 'Quicksand',
    creator: 'Andrew Paglinawan',
    previewFamily: 'Quicksand, Pretendard, sans-serif',
    type: 'Sans Serif',
    preview: 'Font Preview',
    tags: ['동글동글'],
  },
  {
    id: 'libre-baskerville',
    name: 'Libre Baskerville',
    creator: 'Impallari Type',
    previewFamily: "'Libre Baskerville', Georgia, serif",
    type: 'Serif',
    preview: 'Font Preview',
    tags: ['보고서'],
  },
  {
    id: 'noto-sans',
    name: 'Noto Sans',
    creator: 'Google',
    previewFamily: "'Noto Sans', Pretendard, sans-serif",
    type: 'Sans Serif',
    preview: 'Font Preview',
    tags: ['문서'],
  },
  {
    id: 'merriweather',
    name: 'Merriweather',
    creator: 'Sorkin Type',
    previewFamily: 'Merriweather, Georgia, serif',
    type: 'Serif',
    preview: 'Font Preview',
    tags: ['사무적인', '문서'],
  },
  {
    id: 'abril-fatface',
    name: 'Abril Fatface',
    creator: 'TypeTogether',
    previewFamily: "'Abril Fatface', serif",
    type: 'Display',
    preview: 'Font Preview',
    tags: ['게임틱한'],
  },
  {
    id: 'caveat',
    name: 'Caveat Brush',
    creator: 'Impallari Type',
    previewFamily: "'Caveat', cursive",
    type: 'Handwriting',
    preview: 'Font Preview',
    tags: ['날려쓰는', '동글동글'],
  },
];

const tagToneMap: Record<KeywordKey, string> = {
  동글동글: 'blue',
  사무적인: 'purple',
  보고서: 'green',
  날려쓰는: 'orange',
  게임틱한: 'pink',
  문서: 'indigo',
};

export default function EnglishFontsPage() {
  const [selectedFilters, setSelectedFilters] = useState<FilterKey[]>([]);
  const [selectedKeywords, setSelectedKeywords] = useState<KeywordKey[]>([]);
  const [sortBy, setSortBy] = useState<SortKey>('popular');
  const [page, setPage] = useState(1);
  const [previewInput, setPreviewInput] = useState('');
  const [previewScale, setPreviewScale] = useState(43);
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const pageSize = 15;

  const filteredFonts = useMemo(() => {
    let next = fonts.filter((font) => {
      const filterMatch =
        selectedFilters.length === 0 || selectedFilters.includes(font.type);
      const keywordMatch =
        selectedKeywords.length === 0 ||
        selectedKeywords.every((keyword) => font.tags.includes(keyword));

      return filterMatch && keywordMatch;
    });

    next = [...next].sort((left, right) =>
      sortBy === 'popular'
        ? left.name.localeCompare(right.name)
        : right.name.localeCompare(left.name),
    );

    return next;
  }, [selectedFilters, selectedKeywords, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filteredFonts.length / pageSize));
  const visibleFonts = filteredFonts.slice((page - 1) * pageSize, page * pageSize);
  const pageNumbers = Array.from(
    { length: Math.min(5, totalPages) },
    (_, index) => index + 1,
  );
  const previewText = previewInput.trim() || 'Font Preview';

  const toggleFilter = (filter: FilterKey) => {
    setPage(1);
    setSelectedFilters((current) =>
      current.includes(filter)
        ? current.filter((item) => item !== filter)
        : [...current, filter],
    );
  };

  const toggleKeyword = (keyword: KeywordKey) => {
    setPage(1);
    setSelectedKeywords((current) =>
      current.includes(keyword)
        ? current.filter((item) => item !== keyword)
        : [...current, keyword],
    );
  };

  const toggleViewMode = (nextMode: ViewMode) => {
    setViewMode(nextMode);
    setSortBy(nextMode === 'grid' ? 'popular' : 'latest');
    setPage(1);
  };

  return (
    <>
      <Header variant="english-fonts" activeNav="english" />

      <main className="main">
        <section className="englishFonts">
          <div className="englishFonts__inner">
            <aside className="englishFonts__sidebar">
              <div className="englishFonts__sidebarBlock">
                <h2 className="englishFonts__sidebarTitle">FILTER</h2>
                <div className="englishFonts__filterList">
                  {filters.map((filter) => (
                    <label key={filter} className="englishFonts__checkRow">
                      <input
                        type="checkbox"
                        checked={selectedFilters.includes(filter)}
                        onChange={() => toggleFilter(filter)}
                      />
                      <span>{filter}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="englishFonts__sidebarBlock">
                <h2 className="englishFonts__sidebarTitle">KEYWORDS</h2>
                <div className="englishFonts__keywordWrap">
                  {keywordOptions.map((keyword) => (
                    <button
                      key={keyword}
                      type="button"
                      className={`englishFonts__keyword englishFonts__keyword--${tagToneMap[keyword]} ${
                        selectedKeywords.includes(keyword)
                          ? 'englishFonts__keyword--active'
                          : ''
                      }`}
                      onClick={() => toggleKeyword(keyword)}
                    >
                      #{keyword}
                    </button>
                  ))}
                </div>
              </div>
            </aside>

            <div className="englishFonts__content">
              <div className="englishFonts__head">
                <div className="englishFonts__titleRow">
                  <h1 className="englishFonts__title">영어 폰트 목록</h1>
                  <span className="englishFonts__count">{filteredFonts.length}개</span>
                </div>
              </div>

              <div className="englishFonts__inputBar" aria-label="Font preview input">
                <input
                  className="englishFonts__inputField"
                  type="text"
                  value={previewInput}
                  onChange={(event) => setPreviewInput(event.target.value)}
                  placeholder="원하는 영어 문구를 적어보세요"
                />

                <div className="englishFonts__inputTools">
                  <div className="englishFonts__inputDivider" aria-hidden="true" />
                  <span className="englishFonts__inputScale" aria-hidden="true">
                    <span className="englishFonts__inputScaleSmall">A</span>
                    <span className="englishFonts__inputScaleLarge">A</span>
                  </span>
                  <div className="englishFonts__sliderWrap">
                    <input
                      className="englishFonts__slider"
                      type="range"
                      min="0"
                      max="100"
                      value={previewScale}
                      onChange={(event) => setPreviewScale(Number(event.target.value))}
                      aria-label="Preview size"
                    />
                  </div>
                  <button
                    type="button"
                    className={
                      viewMode === 'grid'
                        ? 'englishFonts__viewToggle englishFonts__viewToggle--active'
                        : 'englishFonts__viewToggle'
                    }
                    onClick={() => toggleViewMode('grid')}
                    aria-label="세로형 보기"
                  >
                    <span className="englishFonts__iconGrid" aria-hidden="true">
                      <span />
                      <span />
                      <span />
                      <span />
                    </span>
                  </button>
                  <button
                    type="button"
                    className={
                      viewMode === 'list'
                        ? 'englishFonts__viewToggle englishFonts__viewToggle--active'
                        : 'englishFonts__viewToggle'
                    }
                    onClick={() => toggleViewMode('list')}
                    aria-label="가로형 보기"
                  >
                    <span className="englishFonts__iconList" aria-hidden="true">
                      <span />
                      <span />
                      <span />
                    </span>
                  </button>
                </div>
              </div>

              {viewMode === 'grid' ? (
                <div className="englishFonts__grid">
                  {visibleFonts.map((font) => (
                    <a key={font.id} className="englishFonts__card" href="#/english-detail">
                      <div className="englishFonts__cardTags">
                        {font.tags.map((tag) => (
                          <span
                            key={tag}
                            className={`englishFonts__tag englishFonts__tag--${tagToneMap[tag]}`}
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>

                      <div
                        className="englishFonts__preview"
                        style={{
                          fontFamily: font.previewFamily,
                          fontSize: `${18 + previewScale * 0.18}px`,
                        }}
                      >
                        {previewText}
                      </div>

                      <div className="englishFonts__cardFooter">
                        <div>
                          <strong className="englishFonts__fontName">{font.name}</strong>
                          <p className="englishFonts__fontMeta">{font.creator}</p>
                        </div>
                        <img
                          className="englishFonts__planeIcon"
                          src={planeIcon}
                          alt=""
                          aria-hidden="true"
                        />
                      </div>
                    </a>
                  ))}
                </div>
              ) : (
                <div className="englishFonts__list">
                  {visibleFonts.map((font) => (
                    <div key={font.id} className="englishFonts__listCard">
                      <div className="englishFonts__listMeta">
                        <strong className="englishFonts__listName">{font.name}</strong>
                        <p className="englishFonts__listCreator">{font.creator}</p>
                        <div className="englishFonts__listTags">
                          {font.tags.map((tag) => (
                            <span
                              key={tag}
                              className={`englishFonts__tag englishFonts__tag--${tagToneMap[tag]}`}
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="englishFonts__listPreviewWrap">
                        <div
                          className="englishFonts__listPreview"
                          style={{
                            fontFamily: font.previewFamily,
                            fontSize: `${18 + previewScale * 0.18}px`,
                          }}
                        >
                          {previewText}
                        </div>
                      </div>

                      <div className="englishFonts__listActions">
                        <a className="englishFonts__actionBtn englishFonts__actionBtn--ghost" href="#/english-detail">
                          상세 페이지
                        </a>
                        <button
                          type="button"
                          className="englishFonts__actionBtn englishFonts__actionBtn--primary"
                        >
                          변환하기
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="englishFonts__pagination">
                <button
                  type="button"
                  className="englishFonts__pageBtn"
                  onClick={() => setPage((current) => Math.max(1, current - 1))}
                  disabled={page === 1}
                >
                  ‹
                </button>
                {pageNumbers.map((value) => (
                  <button
                    key={value}
                    type="button"
                    className={
                      value === page
                        ? 'englishFonts__pageBtn englishFonts__pageBtn--active'
                        : 'englishFonts__pageBtn'
                    }
                    onClick={() => setPage(value)}
                  >
                    {value}
                  </button>
                ))}
                <button
                  type="button"
                  className="englishFonts__pageBtn"
                  onClick={() => setPage((current) => Math.min(totalPages, current + 1))}
                  disabled={page === totalPages}
                >
                  ›
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
