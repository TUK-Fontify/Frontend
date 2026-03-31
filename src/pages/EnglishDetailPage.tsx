import { useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default function EnglishDetailPage() {
  const [inputText, setInputText] = useState('');
  const sampleText = inputText.trim() || 'Type here to preview text hello~!';

  return (
    <>
      <Header variant="english-detail" activeNav="english" />

      <main className="main">
        <section className="container eng-detail">
          <header className="eng-detail__head">
            <div>
              <p className="eng-detail__eyebrow">사무적인</p>
              <h1 className="eng-detail__title">Ubuntu 60</h1>
            </div>

            <div className="eng-detail__mainActions">
              <button className="btn eng-detail__badge" type="button">
                사무적인
              </button>
              <button className="btn btn--ghost btn--sm" type="button">
                원본 폰트 다운로드
              </button>
              <button className="btn btn--ghost btn--sm eng-detail__primary" type="button">
                생성된 폰트 다운로드
              </button>
            </div>
          </header>

          <section className="eng-detail__input">
            <div className="eng-detail__inputTop">
              <input
                className="eng-detail__inputField"
                placeholder="T 원하는 영어 문구를 적어보세요"
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

                <button
                  className="eng-detail__alignBtn"
                  type="button"
                  aria-label="정렬 변경"
                />
              </div>
            </div>
          </section>

          <section className="eng-detail__list">
            <article className="eng-row">
              <div className="eng-row__meta">
                <span className="eng-row__name">Thin 100</span>
              </div>
              <p className="eng-row__sample">{sampleText}</p>
              <button className="eng-row__action" type="button">
                생성하기
              </button>
            </article>

            <article className="eng-row">
              <div className="eng-row__meta">
                <span className="eng-row__name">Thin 100 Italic</span>
              </div>
              <p className="eng-row__sample">{sampleText}</p>
              <button className="eng-row__action" type="button">
                생성하기
              </button>
            </article>

            <article className="eng-row">
              <div className="eng-row__meta">
                <span className="eng-row__name">ExtraLight 200</span>
              </div>
              <p className="eng-row__sample">{sampleText}</p>
              <button className="eng-row__action" type="button">
                생성하기
              </button>
            </article>

            <article className="eng-row">
              <div className="eng-row__meta">
                <span className="eng-row__name">ExtraLight 200</span>
              </div>
              <p className="eng-row__sample">{sampleText}</p>
              <button className="eng-row__action" type="button">
                생성하기
              </button>
            </article>
          </section>

          <section className="eng-detail__notice">
            <header className="eng-detail__noticeHead">
              <span className="eng-detail__noticeIcon" aria-hidden="true" />
              <h2>AI 폰트 생성에 관한 저작권 설명</h2>
            </header>
            <p>
              한글 폰트 생성을 시도 생성된 폰트로써 상용 폰트의 저작권을 침해하지 않기 위해
              유사성을 검증 합니다.
              상용 폰트와의 유사성이 높은 경우 폰트를 생성 단계에서 차단함으로써 저작권
              라이선스를 지킵니다.
            </p>
          </section>

          <section className="eng-detail__how">
            <h2 className="eng-detail__howTitle">폰트를 어떻게 생성하나요?</h2>
            <div className="eng-detail__steps">
              <article className="eng-step">
                <div className="eng-step__icon">
                  <img
                    src="http://localhost:3845/assets/e357ff32f4b74ec21d10989b86b1096e638eb1f3.png"
                    alt=""
                    loading="lazy"
                  />
                </div>
                <h3>변환할 폰트 선택</h3>
              </article>

              <article className="eng-step">
                <div className="eng-step__icon">
                  <img
                    src="http://localhost:3845/assets/1192aa30fd3df6cd0d20d47a71f8e0f3930708d7.png"
                    alt=""
                    loading="lazy"
                  />
                </div>
                <h3>AI 폰트 생성 시작</h3>
              </article>

              <article className="eng-step">
                <div className="eng-step__icon">
                  <img
                    src="http://localhost:3845/assets/bd244709fc9668eb6c4bede2cf51d8eacb707a66.png"
                    alt=""
                    loading="lazy"
                  />
                </div>
                <h3>유료 글꼴과의 유사도 검사</h3>
              </article>

              <article className="eng-step">
                <div className="eng-step__icon">
                  <img
                    src="http://localhost:3845/assets/73fea5979142147434bbc1aece4af2370e550409.png"
                    alt=""
                    loading="lazy"
                  />
                </div>
                <h3>폰트 생성 완료</h3>
              </article>
            </div>
          </section>
        </section>
      </main>

      <Footer />
    </>
  );
}

