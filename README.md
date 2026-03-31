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
   ├─ common/        # 검색 아이콘 등 공통 에셋
   ├─ my-page/       # 마이페이지용 이미지들
   └─ brand/
      └─ fontify-logo.png   # 헤더/푸터 로고 (src="/images/brand/fontify-logo.png")
```

