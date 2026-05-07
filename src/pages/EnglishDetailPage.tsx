import { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { fontifyApi } from '../api/fontifyApi';
import type { ApiFontFileItem } from '../api/backendTypes';
import { useApiResource } from '../hooks/useApiResource';

const fallbackFont: ApiFontFileItem = {
  font_file_id: 0,
  name: 'Font Preview',
  weight: 400,
  style: 'normal',
  file_url: '',
};

type DetailRouteParams = {
  fontId: string;
  fontName: string;
};

function readDetailParamsFromHash(): DetailRouteParams {
  const hash = window.location.hash || '';
  const queryIndex = hash.indexOf('?');
  if (queryIndex < 0) return { fontId: '', fontName: '' };
  const query = hash.slice(queryIndex + 1);
  const params = new URLSearchParams(query);
  return {
    fontId: params.get('fontId') ?? '',
    fontName: params.get('fontName') ?? '',
  };
}

function buildVariantRows(font: ApiFontFileItem) {
  const normalizedStyle = font.style?.trim() || 'normal';
  const titleBase = `${font.name} ${font.weight}`.trim();

  return [
    {
      id: `${font.font_file_id}-base`,
      label: normalizedStyle === 'normal' ? titleBase : `${titleBase} ${normalizedStyle}`,
    },
    {
      id: `${font.font_file_id}-italic`,
      label: normalizedStyle === 'italic' ? titleBase : `${titleBase} Italic`,
    },
  ];
}

export default function EnglishDetailPage() {
  const [inputText, setInputText] = useState('');
  const [routeParams, setRouteParams] = useState<DetailRouteParams>(() => readDetailParamsFromHash());

  useEffect(() => {
    const handleHashChange = () => {
      setRouteParams(readDetailParamsFromHash());
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const { fontId, fontName } = routeParams;

  const { data: font, isLoading, error } = useApiResource<ApiFontFileItem | null>(
    fontId || fontName ? fallbackFont : null,
    async () => {
      if (fontId) return fontifyApi.getFont(fontId);
      if (!fontName) return null;

      const items = await fontifyApi.listFonts({ limit: 100 });
      const normalizedTarget = fontName.trim().toLowerCase();

      return (
        items.find((item) => item.name.trim().toLowerCase() === normalizedTarget) ?? null
      );
    },
    [fontId, fontName],
  );

  const sampleText = inputText.trim() || 'Type here to preview text hello~!';
  const fontFamily =
    font && font.name ? `${font.name}, Pretendard, sans-serif` : 'Pretendard, sans-serif';
  const variantRows = font ? buildVariantRows(font) : [];

  return (
    <>
      <Header variant="english-detail" activeNav="english" />

      <main className="main">
        <section className="container eng-detail">
          <header className="eng-detail__head">
            <div>
              <p className="eng-detail__eyebrow">English Font</p>
              <h1 className="eng-detail__title">{font?.name ?? 'Select a font'}</h1>
            </div>

            <div className="eng-detail__mainActions">
              <button className="btn eng-detail__badge" type="button">
                {font ? `${font.weight} / ${font.style}` : 'No font selected'}
              </button>
              <a
                className="btn btn--ghost btn--sm"
                href={font?.file_url || undefined}
                target="_blank"
                rel="noreferrer"
                aria-disabled={!font?.file_url}
              >
                Source file
              </a>
              <button className="btn btn--ghost btn--sm eng-detail__primary" type="button">
                Generate font
              </button>
            </div>
          </header>

          {!fontId && !fontName ? (
            <section className="eng-detail__notice">
              <header className="eng-detail__noticeHead">
                <span className="eng-detail__noticeIcon" aria-hidden="true" />
                <h2>No font selected</h2>
              </header>
              <p>Open this page from the font list so it can receive a font id.</p>
            </section>
          ) : null}

          {!isLoading && !error && !font && (fontId || fontName) ? (
            <section className="eng-detail__notice">
              <header className="eng-detail__noticeHead">
                <span className="eng-detail__noticeIcon" aria-hidden="true" />
                <h2>Font not found</h2>
              </header>
              <p>The selected font could not be matched with the backend font list.</p>
            </section>
          ) : null}

          {error ? (
            <section className="eng-detail__notice">
              <header className="eng-detail__noticeHead">
                <span className="eng-detail__noticeIcon" aria-hidden="true" />
                <h2>Failed to load font</h2>
              </header>
              <p>{error}</p>
            </section>
          ) : null}

          <section className="eng-detail__input">
            <div className="eng-detail__inputTop">
              <input
                className="eng-detail__inputField"
                placeholder="Type here to preview the selected font"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
              />

              <div className="eng-detail__inputControls" aria-hidden="true">
                <span className="eng-detail__aa">
                  A<span className="eng-detail__aa--big">A</span>
                </span>

                <div className="eng-detail__sliderTrack">
                  <div className="eng-detail__sliderFill" />
                  <button className="eng-detail__sliderThumb" type="button" />
                </div>

                <button className="eng-detail__alignBtn" type="button" aria-label="Change align" />
              </div>
            </div>
          </section>

          <section className="eng-detail__list">
            {isLoading ? (
              <article className="eng-row">
                <div className="eng-row__meta">
                  <span className="eng-row__name">Loading...</span>
                </div>
                <p className="eng-row__sample">{sampleText}</p>
              </article>
            ) : null}

            {!isLoading && font
              ? variantRows.map((variant) => (
                  <article className="eng-row" key={variant.id}>
                    <div className="eng-row__meta">
                      <span className="eng-row__name">{variant.label}</span>
                    </div>
                    <p className="eng-row__sample" style={{ fontFamily }}>
                      {sampleText}
                    </p>
                    <button className="eng-row__action" type="button">
                      Generate
                    </button>
                  </article>
                ))
              : null}
          </section>

          <section className="eng-detail__notice">
            <header className="eng-detail__noticeHead">
              <span className="eng-detail__noticeIcon" aria-hidden="true" />
              <h2>API connection status</h2>
            </header>
            <p>
              This page now loads font detail data from <code>GET /fonts/{"{font_id}"}</code>.
              If the page still looks empty, check whether the backend returns a valid response for
              the selected <code>fontId</code>.
            </p>
          </section>
        </section>
      </main>

      <Footer />
    </>
  );
}
