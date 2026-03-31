import Footer from '../components/Footer';
import Header from '../components/Header';

const avatarSrc = '/images/my-page/profile-avatar.png';

// Icons exported from Figma via the local assets server.
const statLikeIconSrc = '/images/my-page/activity-like-icon.svg';
const statReviewIconSrc = '/images/my-page/activity-review-icon.png';
const statOwnedIconSrc = '/images/my-page/activity-owned-font-icon.svg';
const fontPlusIconSrc = '/images/my-page/font-card-plus-icon.svg';

type StatCardProps = {
  iconSrc: string;
  label: string;
  value: string;
  iconVariant?: 'default' | 'darkOnWhite';
};

function StatCard({ iconSrc, label, value, iconVariant }: StatCardProps) {
  return (
    <div className="mypage__statCard">
      <img
        className={`mypage__statIcon ${
          iconVariant === 'darkOnWhite' ? 'mypage__statIcon--darkOnWhite' : ''
        }`}
        src={iconSrc}
        alt=""
      />
      <div className="mypage__statLabel">{label}</div>
      <div className="mypage__statValue">{value}</div>
    </div>
  );
}

type FontCardProps = {
  title: string;
  kind: '무료' | '유료';
  company: string;
  sampleFontFamily?: string;
};

function FontCard({ title, kind, company, sampleFontFamily }: FontCardProps) {
  const kindClass =
    kind === '무료' ? 'mypage__fontKind--free' : 'mypage__fontKind--paid';

  return (
    <div className="mypage__fontCard">
      <div className="mypage__fontTop">
        <div className="mypage__fontSample" style={{ fontFamily: sampleFontFamily }}>
          {title}
        </div>
        <img className="mypage__fontPlus" src={fontPlusIconSrc} alt="" />
      </div>

      <div className="mypage__fontBottom">
        <div className={`mypage__fontKind ${kindClass}`}>{kind}</div>
        <div className="mypage__fontName">{title}</div>
        <div className="mypage__fontCompany">{company}</div>
      </div>
    </div>
  );
}

export default function MyPage() {
  return (
    <>
      <Header variant="home" activeNav="my" />

      <main className="main">
        <div className="mypage">
          <section className="mypage__profile">
            <div className="mypage__avatarWrap">
              <img className="mypage__avatar" src={avatarSrc} alt="" />
            </div>

            <div className="mypage__name">폰티파이님</div>
            <div className="mypage__sub">Fontify와 함께한지 124일째</div>

            <button className="mypage__editBtn" type="button">
              프로필 수정
            </button>
          </section>

          <section className="mypage__section">
            <h2 className="mypage__sectionTitle">나의 활동</h2>

            <div className="mypage__cards3">
              <StatCard
                iconSrc={statLikeIconSrc}
                label="좋아요"
                value="14"
              />
              <StatCard
                iconSrc={statReviewIconSrc}
                label="작성한 리뷰"
                value="28"
              />
              <StatCard
                iconSrc={statOwnedIconSrc}
                label="보유 폰트"
                value="5"
                iconVariant="darkOnWhite"
              />
            </div>
          </section>

          <section className="mypage__section">
            <div className="mypage__viewRow">
              <h2 className="mypage__sectionTitle mypage__sectionTitle--tight">
                관심 폰트
              </h2>
              <a className="mypage__viewAll" href="#/selected">
                전체보기
              </a>
            </div>

            <div className="mypage__grid4">
              <FontCard
                title="Aa바닐라라떼"
                kind="무료"
                company="우아한형제들"
                sampleFontFamily="'WenQuanYi Zen Hei', sans-serif"
              />
              <FontCard
                title="나눔명조"
                kind="무료"
                company="네이버"
                sampleFontFamily="'Nanum Myeongjo', serif"
              />
              <FontCard
                title="카페24 쑥쑥"
                kind="유료"
                company="카페24"
                sampleFontFamily="'Cafe24Ssurround', sans-serif"
              />
              <FontCard
                title="Lv1"
                kind="무료"
                company="NEXON"
                sampleFontFamily="'Nimbus Sans', sans-serif"
              />
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}

