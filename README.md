# Frontend (Next.js)

Next.js(App Router) 기반 프론트엔드 프로젝트입니다.  
메인(`/`), 영어 상세(`/english-detail`), 선택 상세(`/selected`), 마이페이지(`/my-page`)가 구현되어 있습니다.

## 필요 프로그램

- Node.js (npm 포함)

## 로컬 실행

1. 저장소 폴더로 이동
   - `cd Frontend`
2. 의존성 설치
   - `npm install`
3. 개발 서버 실행
   - `npm run dev`
4. 브라우저에서 접속
   - `http://localhost:3000`

## 폴더 구조 (드롭다운)

<details>
<summary><strong>app</strong> - 라우팅/페이지/전역 스타일</summary>

```text
app/
├─ layout.tsx                        # 루트 레이아웃(html/body)
├─ globals.css                       # 전역 스타일 진입점 (페이지 CSS import)
├─ page.tsx                          # "/" 엔트리 (HomePage 재export)
├─ home/
│  └─ HomePage.tsx                   # 메인 홈 화면 컴포넌트
├─ english-detail/
│  └─ page.tsx                       # "/english-detail" 페이지
├─ selected/
│  └─ page.tsx                       # "/selected" 페이지
├─ my-page/
│  └─ page.tsx                       # "/my-page" 페이지
└─ styles/
   └─ pages/
      ├─ home.css                    # 홈 페이지 스타일
      ├─ english-detail.css          # 영어 상세 페이지 스타일
      ├─ selected.css                # 선택 상세 페이지 스타일
      └─ my-page.css                 # 마이페이지 스타일
```

</details>

<details>
<summary><strong>components</strong> - 공통 UI 컴포넌트</summary>

```text
components/
├─ Header.tsx                        # 상단 헤더/네비게이션
└─ Footer.tsx                        # 하단 푸터
```

</details>

<details>
<summary><strong>public/images</strong> - 정적 이미지 에셋</summary>

```text
public/
└─ images/
   ├─ brand/
   │  └─ fontify-logo.png            # 브랜드 로고 (헤더/푸터 공통)
   ├─ common/
   │  ├─ search-icon.svg             # 공통 검색 아이콘
   │  ├─ google-badge-icon.svg       # 공통 뱃지 아이콘
   │  └─ moon-icon.svg               # 공통 아이콘
   └─ my-page/
      ├─ profile-avatar.png          # 마이페이지 프로필 아바타
      ├─ activity-like-icon.svg      # 나의 활동 - 좋아요 아이콘
      ├─ activity-review-icon.png    # 나의 활동 - 리뷰 아이콘
      ├─ activity-owned-font-icon.svg# 나의 활동 - 보유 폰트 아이콘
      └─ font-card-plus-icon.svg     # 관심 폰트 카드 아이콘
```

</details>
