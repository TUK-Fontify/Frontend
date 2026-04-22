## Frontend (React + Vite)

Vite 기반 **순수 React(ReactJS)** 프론트엔드 프로젝트입니다.  
해시 라우팅(`#/...`)으로 간단하게 화면만 전환하는 구조입니다.

---

## 실행 방법

```bash
cd GitHub/Frontend
npm install
npm run dev
```

브라우저에서 접속:

- 개발 서버: `http://localhost:5173/#/`

---

## 라우팅 (해시 기반)

React Router 없이 **URL 해시** 만으로 화면을 전환합니다.

- `#/` → 메인(Home)
- `#/english-detail` → 영어 상세 페이지
- `#/selected` → 선택 상세 페이지
- `#/my-page` → 마이페이지

라우팅 로직: `src/App.tsx` 한 파일에서 해시를 읽어서 각 페이지 컴포넌트를 선택합니다.

---

## 폴더 구조 (간단)

### 루트 (`/`)

```text
Frontend/
├─ package.json
├─ package-lock.json
├─ vite.config.ts
├─ eslint.config.js
├─ tsconfig.json
├─ tsconfig.app.json
├─ tsconfig.node.json
├─ index.html
├─ src/
└─ public/
```

참고:
- `node_modules/` 는 `npm install` 후 생성되는 의존성 폴더
- `dist/` 는 `npm run build` 후 생성되는 빌드 결과 폴더

### 코드 (`src/`)

```text
src/
├─ main.tsx      # 진입점, React DOM 렌더 + 전역 CSS import
├─ App.tsx       # 해시 기반 라우팅 (화면 전환 로직)
├─ pages/        # 각 화면 컴포넌트
│  ├─ HomePage.tsx
│  ├─ EnglishDetailPage.tsx
│  ├─ SelectedPage.tsx
│  └─ MyPage.tsx
├─ components/   # 공통 UI
│  ├─ Header.tsx
│  └─ Footer.tsx
└─ styles/
   ├─ globals.css
   └─ pages/
      ├─ home.css
      ├─ english-detail.css
      ├─ selected.css
      └─ my-page.css
```

### 정적 파일 (`public/`)

```text
public/
├─ favicon.svg
├─ icons.svg
└─ images/
   ├─ common/
   │  ├─ search-icon.svg
   │  ├─ google-badge-icon.svg
   │  └─ moon-icon.svg
   └─ my-page/
      ├─ activity-like-icon.svg
      ├─ activity-owned-font-icon.svg
      └─ font-card-plus-icon.svg
```

### 현재 코드에서 실제 사용하는 주요 이미지 경로

- `/images/my-page/activity-like-icon.svg` (메인 배너 소셜, 마이페이지 통계)
- `/images/my-page/activity-owned-font-icon.svg` (메인 배너 소셜, 마이페이지 통계)
- `/images/my-page/font-card-plus-icon.svg` (마이페이지 폰트 카드)

배너/페이지 이미지는 모두 `public/images/...` 기준으로 참조합니다.

