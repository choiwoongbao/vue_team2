<template>
  <div class="faq-main">
    <section class="download-faq">
      <div class="inner">
        <!-- 왼쪽: 앱 다운로드 -->
        <article class="download-card" ref="cardRef" aria-label="앱 다운로드">
          <svg class="bg-svg" viewBox="0 0 1200 600" preserveAspectRatio="none" aria-hidden="true">
            <defs>
              <linearGradient id="mintGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0" stop-color="#2EB5B2"/>
                <stop offset="1" stop-color="#179A99"/>
              </linearGradient>
            </defs>
            <rect width="1200" height="600" fill="url(#mintGrad)" />
            <path d="M0,140 C240,60 420,60 600,160 C820,280 980,260 1200,190 L1200,0 L0,0 Z"
                  fill="#147e7f" fill-opacity="0.35"/>
            <path d="M0,330 C250,280 430,300 620,350 C820,405 980,390 1200,350 L1200,600 L0,600 Z"
                  fill="#ffffff" fill-opacity="0.12"/>
          </svg>

          <div class="card-inner">
            <div class="phone-mock" aria-hidden="true">
              <div class="notch"></div>
              <div class="screen">
                <span class="screen-brand">짐보따리</span>
              </div>
            </div>

            <div class="copy">
              <h2 class="title"><strong>짐보따리</strong> 앱 <span>다운받기</span></h2>
              <p class="desc">
                지금, 유니크 리무버블.<br />
                심플하게, 가볍게 지금 경험해 보세요
              </p>

              <div class="store-btns">
                <a class="store-btn store-btn--white" href="#">
                  <span class="store-left">
                    <span class="icon">📱</span>
                    <span class="store-text">Google Play</span>
                  </span>
                  <span class="store-badge">안드로이드</span>
                </a>
                <a class="store-btn store-btn--white" href="#">
                  <span class="store-left">
                    <span class="icon">🍎</span>
                    <span class="store-text">App Store</span>
                  </span>
                  <span class="store-badge">IOS</span>
                </a>
              </div>
            </div>
          </div>
        </article>

        <!-- 오른쪽: FAQ -->
        <aside class="faq" ref="faqRef" aria-label="자주 묻는 질문">
          <header class="faq-head">
            <h3 class="faq-title">자주 묻는 질문</h3>
            <button type="button" class="inquiry-btn">문의하기</button>
          </header>

          <ul class="faq-list">
            <li v-for="(item, i) in faqs" :key="i" class="faq-item">
              <button class="faq-q" :aria-expanded="openIndex === i" @click="toggle(i)">
                <span class="q-prefix">Q.</span>
                <span class="q-text">{{ item.q }}</span>
                <span class="chev" :class="{ open: openIndex === i }" aria-hidden="true"></span>
              </button>

              <div class="faq-a-wrap" :class="{ open: openIndex === i }">
                <div class="faq-a">{{ item.a }}</div>
              </div>
            </li>
          </ul>
        </aside>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick, watch } from 'vue'

const openIndex = ref(-1)
const toggle = async (i) => {
  openIndex.value = openIndex.value === i ? -1 : i
  await nextTick()
  syncHeights()
}

const faqs = [
  { q: '보관 가능한 짐의 종류에는 어떤 것이 있나요?', a: '일반 여행가방, 백팩, 유모차, 골프백 등 대부분 보관 가능하며, 위험물·가연성 물질·현금/귀금속은 제한됩니다.' },
  { q: '짐을 맡기고 중간에 꺼낼 수 있나요?', a: '보관 중에도 앱에서 일시 출입을 신청하면 꺼낼 수 있어요. 지점 정책에 따라 추가 확인이 있을 수 있습니다.' },
  { q: '짐을 맡길 때 꼭 신분증이 필요한가요?', a: '첫 보관 시 본인 인증이 필요합니다. 앱에서 간편 인증으로 처리하며, 현장 확인이 필요한 경우 안내드립니다.' },
  { q: '보관 중 분실이나 파손이 생기면 어떻게 보상되나요?', a: '안심 보상 정책을 운영합니다. 문제 발생 시 앱 문의하기로 접수하면 확인 후 약관 범위 내에서 보상합니다.' },
  { q: '짐을 해외로도 보낼 수 있나요?', a: '국내 배송을 기본으로 하고, 일부 지점은 국제 배송 중개를 지원합니다. 가능 지점은 앱에서 확인해 주세요.' },
  { q: '배송 시간을 지정할 수 있나요?', a: '희망 시간대를 선택할 수 있으며, 지역/지점 사정에 따라 조정될 수 있습니다.' }
]

const cardRef = ref(null)
const faqRef  = ref(null)

const syncHeights = () => {
  const w = window.innerWidth
  if (!cardRef.value || !faqRef.value) return

  // 모바일(<=768px): 자동 높이
  if (w <= 768) {
    cardRef.value.style.minHeight = ''
    cardRef.value.style.height = 'auto'
    return
  }

  // 데스크톱: 두 영역 중 큰 값으로만 최소 높이 동기화
  const cardInner = cardRef.value.querySelector('.card-inner')
  const h1 = cardInner ? cardInner.offsetHeight : cardRef.value.offsetHeight
  const h2 = faqRef.value.offsetHeight
  const H  = Math.max(h1, h2)
  cardRef.value.style.height = 'auto'
  cardRef.value.style.minHeight = H + 'px'
}

const onResize = () => syncHeights()

onMounted(async () => {
  await nextTick()
  syncHeights()
  window.addEventListener('resize', onResize)
})

watch(openIndex, async () => {
  await nextTick()
  syncHeights()
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', onResize)
})
</script>

<style scoped>
/* 변수: :root → .faq-main 로 이동하여 네임스페이스 */
.faq-main {
  --mint-1: #2EB5B2;
  --mint-2: #179A99;
  --mint-dark: #147e7f;
  --line: #e6eeee;
}

/* ===== 레이아웃 ===== */
.faq-main .download-faq {
  padding: 32px 16px;
}
.faq-main .inner {
  max-width: 1320px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px;
  align-items: stretch;
}

/* ===== 왼쪽 카드 ===== */
.faq-main .download-card {
  position: relative;
  overflow: visible;
  border-radius: 8px;
  padding: 0;
  background: transparent;
  box-shadow: none;
  height: auto;
}

/* 배경 SVG */
.faq-main .bg-svg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  display: block;
}

/* 내부 */
.faq-main .card-inner {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: 260px 1fr;
  align-items: center;
  gap: 24px;
  padding: 32px 24px;
  height: 100%;
  box-sizing: border-box;
}

/* 폰 */
.faq-main .phone-mock {
  width: 160px;
  height: 320px;
  border-radius: 26px;
  background: #fff;
  position: relative;
  border: 2px solid #0f585a;
}
.faq-main .phone-mock .notch {
  position: absolute;
  top: 12px;
  left: 50%;
  transform: translateX(-50%);
  width: 80px;
  height: 18px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  background: #0f585a;
}
.faq-main .phone-mock .screen {
  position: absolute;
  inset: 18px;
  border-radius: 20px;
  background: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
}
.faq-main .screen-brand {
  color: #25a7a5;
  font-weight: 800;
  font-size: 20px;
  background: #ffffff;
  padding: 6px 12px;
  border-radius: 999px;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.08);
}

/* 텍스트 */
.faq-main .copy .title {
  color: #ffffff;
  font-size: 28px;
  font-weight: 900;
  line-height: 1.2;
  margin: 0 0 10px;
}
.faq-main .copy .desc {
  color: #eaf6f6;
  font-size: 14px;
  line-height: 1.6;
  margin: 0 0 18px;
}

/* 스토어 버튼 */
.faq-main .store-btns {
  display: grid;
  gap: 10px;
  max-width: 320px;
}
.faq-main .store-btn {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 46px;
  padding: 0 12px 0 10px;
  border-radius: 10px;
  text-decoration: none;
}
.faq-main .store-btn--white {
  background: #fff;
  color: #1b1b1b;
  border: 1px solid #dfe9e9;
  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.04), 0 6px 18px rgba(0, 0, 0, 0.05);
}
.faq-main .store-left {
  display: flex;
  align-items: center;
  gap: 8px;
}
.faq-main .store-text {
  font-weight: 700;
  font-size: 14px;
}
.faq-main .store-badge {
  font-size: 12px;
  font-weight: 800;
  background: #eef6f6;
  color: #0f5f61;
  padding: 6px 12px;
  border-radius: 999px;
  border: 1px solid #d2e8e8;
}

/* ===== 오른쪽 FAQ ===== */
.faq-main .faq-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
}
.faq-main .faq-title {
  font-size: 28px;
  font-weight: 900;
  color: #111;
}
.faq-main .inquiry-btn {
  height: 32px;
  padding: 0 14px;
  border-radius: 999px;
  border: 1px solid #d8e2e2;
  background: #fff;
  color: #2b2b2b;
  font-size: 13px;
  font-weight: 600;
}
.faq-main .inquiry-btn:hover {
  background: #f7fafa;
}
.faq-main .faq-list {
  list-style: none;
  margin: 0;
  padding: 0;
  background: #fff;
}
.faq-main .faq-item {
  border-bottom: 1px solid #e9ecec;
}
.faq-main .faq-q {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 16px 14px;
  background: #fff;
  border: 0;
  text-align: left;
  cursor: pointer;
  font-size: 15px;
  font-weight: 700;
  color: #222;
  transition: background 0.2s ease;
}
.faq-main .faq-q:hover {
  background: #fafafa;
}
.faq-main .q-prefix {
  color: #6f7b7b;
  font-weight: 700;
}
.faq-main .q-text {
  flex: 1;
}
.faq-main .faq-a-wrap {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.28s ease;
}
.faq-main .faq-a-wrap.open {
  max-height: 260px;
}
.faq-main .faq-a {
  padding: 14px 14px 18px 36px;
  color: #444;
  font-size: 14px;
  line-height: 1.7;
}
.faq-main .chev {
  position: relative;
  width: 16px;
  height: 16px;
  display: inline-block;
}
.faq-main .chev::before,
.faq-main .chev::after {
  content: "";
  position: absolute;
  top: 6px;
  width: 8px;
  height: 2px;
  background: #666;
  border-radius: 1px;
  transition: transform 0.25s ease;
}
.faq-main .chev::before {
  left: 2px;
  transform: rotate(45deg);
}
.faq-main .chev::after {
  right: 2px;
  transform: rotate(-45deg);
}
.faq-main .chev.open::before {
  transform: rotate(-45deg);
}
.faq-main .chev.open::after {
  transform: rotate(45deg);
}

/* ====== Responsive: 1000px 이하에서 세로 스택 ====== */
@media (max-width: 1000px) {
  .faq-main .inner {
    grid-template-columns: 1fr;
    gap: 24px;
    align-items: stretch;
    max-width: 700px;
  }

  /* 고정 영향 제거 */
  .faq-main .download-card {
    height: auto !important;
    min-height: 0 !important;
  }

  .faq-main .card-inner {
    grid-template-columns: 1fr;
    gap: 16px;
    padding: 24px 18px;
  }

  .faq-main .phone-mock {
    margin: 0 auto;
    width: 140px;
    height: 280px;
  }
  .faq-main .screen-brand {
    font-size: 18px;
  }

  .faq-main .copy {
    text-align: center;
  }
  .faq-main .copy .title {
    font-size: 24px;
    margin-bottom: 8px;
  }
  .faq-main .copy .desc {
    font-size: 13px;
    margin-bottom: 14px;
  }

  .faq-main .store-btns {
    max-width: 100%;
  }
  .faq-main .store-btn {
    height: 44px;
  }

  .faq-main .faq-head {
    margin-bottom: 8px;
  }
  .faq-main .faq-title {
    font-size: 24px;
  }
  .faq-main .faq-q {
    padding: 14px 12px;
    font-size: 14px;
  }
  .faq-main .faq-a {
    padding: 12px 12px 16px 32px;
    font-size: 13px;
  }
}

/* ====== Responsive: 390px 이하에서 더 컴팩트 ====== */
@media (max-width: 390px) {
  .faq-main .download-faq {
    padding: 24px 12px;
  }

  .faq-main .card-inner {
    padding: 20px 14px;
    gap: 12px;
  }

  .faq-main .phone-mock {
    width: 120px;
    height: 240px;
  }
  .faq-main .screen-brand {
    font-size: 16px;
  }

  .faq-main .copy .title {
    font-size: 20px;
  }
  .faq-main .copy .desc {
    font-size: 12px;
  }

  .faq-main .store-btn {
    height: 42px;
    padding: 0 10px;
  }
  .faq-main .store-text {
    font-size: 13px;
  }
  .faq-main .store-badge {
    font-size: 11px;
    padding: 5px 10px;
  }

  .faq-main .faq-title {
    font-size: 20px;
  }
  .faq-main .faq-q {
    padding: 12px 10px;
    font-size: 13px;
  }
  .faq-main .faq-a {
    padding: 10px 10px 14px 28px;
    font-size: 12px;
  }
}
</style>
