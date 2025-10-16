<!-- Footer.vue -->
<template>
  <div class="footer">
    <footer class="jb-footer">
    <div class="footer-inner">
      <!-- 좌측 -->
      <div class="footer-left">
        <h2 class="brand">짐보따리</h2>
        <p class="tagline">한 줄 슬로건</p>

        <address class="corp-info">
          <p>대표자: TEAM A | 주소: 서울 중랑구 3로 3길 재밌빌딩 5F</p>
          <p>사업자등록번호: 123-45-12345 | 통신판매업신고번호: 2호</p>
          <p>Copyright © JIMGBAG Corp. All Rights Reserved.</p>
        </address>

        <div class="social">
          <a href="#" aria-label="Instagram" class="icon">
            <!-- SVG 인스타그램 여기 -->
          </a>
          <a href="#" aria-label="Blog" class="icon">
            <!-- SVG 블로그/유튜브 여기 -->
          </a>
        </div>

        <nav class="legal">
          <a href="#">이용약관</a>
          <span class="divider">·</span>
          <a href="#">개인정보처리방침</a>
          <span class="divider">·</span>
          <a href="#">사이트맵</a>
        </nav>
      </div>

      <!-- 우측 -->
      <div class="footer-right">
        <h3 class="cs-title">고객센터 운영시간</h3>
        <p class="cs-hours">
          10시 - 18시 (주말 및 공휴일 휴무)<br />
          12시 - 13시 (점심시간)
        </p>

        <ul class="cs-contact">
          <li>
            <span class="cs-icon">
              <!-- SVG 전화 아이콘 여기 -->
            </span>
            <a href="tel:02-691-9999">02-691-9999</a>
          </li>
          <li>
            <span class="cs-icon">
              <!-- SVG 인스타 아이콘 여기 -->
            </span>
            <a href="#" rel="nofollow">@jimbottari</a>
          </li>
          <li>
            <span class="cs-icon">
              <!-- SVG 메일 아이콘 여기 -->
            </span>
            <a href="mailto:team@abc.kr">team@abc.kr</a>
          </li>
        </ul>
      </div>
    </div>
  </footer>
  </div>
  
</template>

<style scoped>
/* Footer.vue - Responsive & clamp() 적용 */

.footer .jb-footer {
  border-top: 1px solid #eaeaea;
  background: #ffffff;
  color: #111111;

  /* 타이포/스페이싱 토큰 */
  --fs-brand:          clamp(22px, 2.2vw, 30px);
  --fs-tagline:        clamp(12px, 1.1vw, 14px);
  --fs-body:           clamp(12px, 1vw, 13px);
  --fs-legal:          clamp(12px, 1vw, 13px);
  --fs-contact:        clamp(13px, 1.3vw, 14px);
  --fs-small-title:    clamp(12px, 1vw, 13px);

  --space-pad-y:       clamp(20px, 3.5vw, 40px);
  --space-pad-x:       clamp(12px, 3vw, 16px);
  --space-gap-col:     clamp(20px, 5vw, 48px);

  --icon-box:          clamp(26px, 3vw, 28px);
  --icon-size:         clamp(14px, 1.6vw, 16px);
}

.footer .footer-inner {
  max-width: min(1200px, 92vw);
  margin: 0 auto;
  padding: var(--space-pad-y) var(--space-pad-x);
  display: flex;
  gap: var(--space-gap-col);
  justify-content: space-between;
  align-items: flex-start;
}

/* 좌측 */
.footer .footer-left {
  flex: 1 1 60%;
  min-width: clamp(180px, 40vw, 560px);
}

.footer .brand {
  margin: 0;
  font-size: var(--fs-brand);
  font-weight: 800;
  letter-spacing: -0.2px;
  color: #008871;
}

.footer .tagline {
  margin: 6px 0 14px;
  font-size: var(--fs-tagline);
  color: #9aa0a6;
}

.footer .corp-info {
  margin: 0 0 14px;
  font-style: normal;
  line-height: 1.7;
  font-size: var(--fs-body);
  color: #555b61;
}

.footer .social {
  display: flex;
  gap: 10px;
  margin: 10px 0 14px;
}

.footer .social .icon {
  width: var(--icon-box);
  height: var(--icon-box);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  background: #ffffff;
}

/* 링크 묶음 */
.footer .legal {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
  font-size: var(--fs-legal);
  color: #6b7280;
}

.footer .legal a {
  color: inherit;
  text-decoration: none;
}

.footer .legal a:hover {
  text-decoration: underline;
}

.footer .legal .divider {
  color: #c0c6cc;
}

/* 우측 */
.footer .footer-right {
  flex: 1 1 40%;
  min-width: clamp(180px, 34vw, 420px);
  text-align: right;
  margin-top: clamp(8px, 1vw, 12px);
}

.footer .cs-title {
  margin: 0 0 6px;
  font-size: var(--fs-small-title);
  font-weight: 700;
  color: #6b7280;
}

.footer .cs-hours {
  margin: 0 0 10px;
  font-size: var(--fs-body);
  color: #4b5563;
  line-height: 1.6;
}

.footer .cs-contact {
  list-style: none;
  margin: 0;
  padding: 0;
}

.footer .cs-contact li {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 8px;
  font-size: var(--fs-contact);
  line-height: 1.9;
}

.footer .cs-contact a {
  color: #111111;
  text-decoration: none;
}

.footer .cs-contact a:hover {
  text-decoration: underline;
}

.footer .cs-icon {
  width: var(--icon-size);
  height: var(--icon-size);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #6b7280;
}

/* --- 반응형 --- */
/* 1) 중간 폭: 여백/갭 살짝 축소 (레이아웃 2열 유지) */
@media (max-width: 860px) {
  .footer .footer-inner {
    gap: clamp(16px, 4vw, 28px);
  }

  .footer .footer-right {
    min-width: clamp(180px, 42vw, 360px);
  }
}

/* 2) 작은 폭: 390px 이하부터 1열 + 중앙정렬 */
@media (max-width: 450px) {
  .footer .footer-inner {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .footer .footer-left,
  .footer-right {
    text-align: center;
    min-width: 100%;
  }

  .footer .corp-info p {
    word-break: keep-all;
  }

  .footer .social {
    justify-content: center;
    gap: 8px;
  }

  .footer .legal {
    justify-content: center;
  }

  .footer .cs-contact li {
    justify-content: center;
  }
}

/* 3) 아주 작은 폭: 320px 이하 기기 대응 (280px대까지 안전) */
@media (max-width: 320px) {
  .footer .footer-inner {
    padding: 24px 10px;
  }

  .footer .corp-info p {
    font-size: clamp(11px, 2.6vw, 12px);
  }

  .footer .cs-contact li {
    flex-direction: column;
    gap: 4px;
  }

  .footer .legal {
    gap: 6px;
  }

  .footer .social .icon {
    border-radius: 8px;
  }
}
</style>
