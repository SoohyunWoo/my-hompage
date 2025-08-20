# 우수현 포트폴리오 (Vite + React + Tailwind)

Canvas에서 보던 것과 동일한 인터랙션:
- Get Started / Quick Links → 본문 Reveal + 부드러운 스크롤
- 섹션 페이드(프로필 제외)
- 테마 토글 (system → light → dark), 아이콘 동기화
- Projects의 PDF 모달(내장 viewer)
- Tailwind 스타일, 카드/버튼 컴포넌트 포함

## 로컬 실행
```bash
npm i
npm run dev
```

## PDF/이력서 파일 배치
- PDF: `public/docs/프로젝트 결과보고서_2조 하트비트 (1).pdf` 로 넣으세요.
- 이력서: `public/resume.pdf` 로 넣으세요.

## GitHub Pages 배포
1) **레포 이름이 `Portpolio`가 아니라면** `vite.config.js`의 `base` 값을 `"/레포이름/"` 으로 바꾸세요.
2) 레포에 전체 파일 업로드 → Settings → Pages → Build and deployment에서 **GitHub Actions** 선택
3) 기본 브랜치에 push 하면 자동 배포됩니다.

직접 빌드해서 올리려면:
```bash
npm run build
```
생성된 `dist/`를 `gh-pages` 브랜치 루트로 올리고, Pages 소스로 `gh-pages`를 선택하세요.
