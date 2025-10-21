<template>
  <div class="info-main">
    <section class="pricing-section" aria-label="요금 안내 섹션">
      <div class="inner">
        <h2 class="title">이용 요금이 궁금하신가요?</h2>

        <!-- 탭 -->
        <div class="tabs" role="tablist">
          <button
            class="tab"
            :class="{ active: activeTab === 'storage' }"
            role="tab"
            :aria-selected="activeTab === 'storage'"
            @click="activeTab = 'storage'"
          >보관</button>
          <button
            class="tab"
            :class="{ active: activeTab === 'delivery' }"
            role="tab"
            :aria-selected="activeTab === 'delivery'"
            @click="activeTab = 'delivery'"
          >배송</button>
        </div>

        <!-- 패널: 보관 -->
        <div v-show="activeTab === 'storage'" class="panel" role="tabpanel" aria-label="보관 요금 패널">
          <div class="carousel">
            <button class="nav prev" aria-label="이전" @click="prev('storage')" :disabled="isAtStart('storage')">‹</button>

            <div class="viewport">
              <div class="track" :style="trackStyle('storage')">
                <article
                  v-for="(item, i) in baseStorage"
                  :key="'s-'+item.id"
                  class="slide"
                  :style="slideStyle('storage')"
                >
                  <div class="thumb">
                    <img v-if="item.img" :src="item.img" :alt="item.label" loading="lazy" />
                    <div v-else class="thumb-fallback" aria-hidden="true">IMAGE</div>
                  </div>
                  <h3 class="label">{{ item.label }}</h3>
                  <p class="meta">{{ item.meta }}</p>
                </article>
              </div>
            </div>

            <button class="nav next" aria-label="다음" @click="next('storage')" :disabled="isAtEnd('storage')">›</button>
          </div>

          <div class="more-row">
            <a class="more" href="#" @click.prevent>자세히 보러 가기 →</a>
          </div>
        </div>

        <!-- 패널: 배송 -->
        <div v-show="activeTab === 'delivery'" class="panel" role="tabpanel" aria-label="배송 요금 패널">
          <div class="carousel">
            <button class="nav prev" aria-label="이전" @click="prev('delivery')" :disabled="isAtStart('delivery')">‹</button>

            <div class="viewport">
              <div class="track" :style="trackStyle('delivery')">
                <article
                  v-for="(item, i) in baseDelivery"
                  :key="'d-'+item.id"
                  class="slide"
                  :style="slideStyle('delivery')"
                >
                  <div class="thumb">
                    <img v-if="item.img" :src="item.img" :alt="item.label" loading="lazy" />
                    <div v-else class="thumb-fallback" aria-hidden="true">IMAGE</div>
                  </div>
                  <h3 class="label">{{ item.label }}</h3>
                  <p class="meta">{{ item.meta }}</p>
                </article>
              </div>
            </div>

            <button class="nav next" aria-label="다음" @click="next('delivery')" :disabled="isAtEnd('delivery')">›</button>
          </div>

          <div class="more-row">
            <a class="more" href="#" @click.prevent>자세히 보러 가기 →</a>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed, onMounted, onBeforeUnmount, reactive, ref } from "vue";

/* ===== 데이터: 이미지 5개 슬롯 ===== */
const baseStorage = [
  { id: "mini",   label: "미니",    meta: "에코백 · 백팩 · 서류가방",   img: "/images/storage/mini.png" },
  { id: "small",  label: "스몰",    meta: "크로스백 · 백팩 · 서류가방", img: "/images/storage/small.png" },
  { id: "medium", label: "미디움",  meta: "20~22\" 기내용 캐리어",     img: "/images/storage/medium.png" },
  { id: "large",  label: "라지",    meta: "24\" 중형 캐리어",          img: "/images/storage/large.png" },
  { id: "xlarge", label: "엑스라지", meta: "28\" 대형 캐리어",          img: "/images/storage/xlarge.png" },
];

const baseDelivery = [
  { id: "d1", label: "미니",   meta: "도심 당일 픽업", img: "/images/delivery/mini.png" },
  { id: "d2", label: "스몰",   meta: "서울 · 수도권",  img: "/images/delivery/small.png" },
  { id: "d3", label: "미디움", meta: "전국 익일",     img: "/images/delivery/medium.png" },
  { id: "d4", label: "라지",   meta: "공항 직행",     img: "/images/delivery/large.png" },
  { id: "d5", label: "엑스라지", meta: "제주 · 도서",   img: "/images/delivery/xlarge.png" },
];

const activeTab = ref("storage");

/* 뷰포트별 카드 개수 */
const vw = ref(typeof window !== "undefined" ? window.innerWidth : 1920);
const onResize = () => (vw.value = window.innerWidth);
onMounted(() => window.addEventListener("resize", onResize));
onBeforeUnmount(() => window.removeEventListener("resize", onResize));

const perView = computed(() =>
  vw.value >= 1280 ? 3 : vw.value >= 1024 ? 2 : 1
);

/* 각 트랙의 현재 인덱스(0부터 시작) */
const state = reactive({
  storage: { index: 0 },
  delivery: { index: 0 },
});

/* 한 번에 1장씩 이동 */
function next(key) {
  const total = key === "storage" ? baseStorage.length : baseDelivery.length;
  const maxIndex = Math.max(0, total - perView.value);
  state[key].index = Math.min(state[key].index + 1, maxIndex);
}
function prev(key) {
  state[key].index = Math.max(state[key].index - 1, 0);
}

/* 경계 체크(버튼 disabled용) */
function isAtStart(key) {
  return state[key].index <= 0;
}
function isAtEnd(key) {
  const total = key === "storage" ? baseStorage.length : baseDelivery.length;
  const maxIndex = Math.max(0, total - perView.value);
  return state[key].index >= maxIndex;
}

/* 트랙/슬라이드 스타일 — ‘한 장’ 단위 이동 고정 */
function trackStyle(key) {
  const total = key === "storage" ? baseStorage.length : baseDelivery.length;
  const pct = -((100 / total) * state[key].index);
  return {
    width: `${(total * 100) / perView.value}%`,
    transform: `translateX(${pct}%)`,
    transition: "transform .45s ease",
    display: "flex",
  };
}
function slideStyle(key) {
  const total = key === "storage" ? baseStorage.length : baseDelivery.length;
  return { width: `${100 / total}%` };
}
</script>

<style scoped>
/* ===== .info-main 스코프 ===== */
.info-main .pricing-section{ padding:clamp(24px,4vw,56px) 0; color:#111; }
.info-main .inner{ max-width:1320px; margin:0 auto; padding:0 clamp(16px,4vw,24px); text-align:center; }
.info-main .title{ font-weight:700; font-size:clamp(20px,2.2vw,32px); letter-spacing:-0.02em; margin-bottom:clamp(16px,2.5vw,24px); }

/* ===== 탭 ===== */
.info-main .tabs{
  display:inline-flex; background:#f2f6f6; border-radius:6px; overflow:hidden;
  border:1px solid #d8e6e6; margin:0 auto clamp(28px,4vw,40px);
}
.info-main .tab{
  min-width:140px; padding:10px 18px; font-size:14px; color:#6e7f7f;
  background:transparent; border:none; cursor:pointer; transition:background .2s ease, color .2s ease;
}
.info-main .tab.active{ background:#2eb5b2; color:#fff; }

/* ===== 캐러셀 ===== */
.info-main .panel{ --thumb-ratio:4/3; }
.info-main .carousel{
  position:relative; display:grid; grid-template-columns:48px 1fr 48px;
  align-items:center; gap:12px;
}
.info-main .nav{
  width:48px; height:48px; border-radius:50%;
  border:1px solid #dfe9e9; background:#fff; font-size:28px; line-height:1; cursor:pointer;
  transition:transform .15s ease, box-shadow .15s ease;
}
.info-main .nav:disabled{ opacity:.35; cursor:default; transform:none; box-shadow:none; }
.info-main .nav:hover:not(:disabled){ transform:translateY(-2px); box-shadow:0 6px 16px rgba(0,0,0,.08); }

.info-main .viewport{ overflow:hidden; position:relative; min-height:260px; }
.info-main .track{ will-change:transform; }

.info-main .slide{ padding:clamp(8px,1.2vw,16px); text-align:center; }

/* 썸네일 */
.info-main .thumb{
  width:100%; aspect-ratio:var(--thumb-ratio); border-radius:10px;
  background:#f7fbfb; border:1px solid #edf4f4; display:grid; place-items:center;
  margin:0 auto clamp(10px,1.6vw,14px); overflow:hidden;
}
.info-main .thumb img{ width:100%; height:100%; object-fit:contain; display:block; }
.info-main .thumb-fallback{ font-size:12px; color:#94a3a3; }

/* 라벨/메타 */
.info-main .label{
  display:block; margin:0 0 6px; font-weight:800; line-height:1.2;
  font-size:clamp(16px,1.6vw,20px); color:#1a8f8d; white-space:nowrap;
}
.info-main .meta{
  display:block; margin:0; line-height:1.35; font-size:clamp(11px,1.05vw,13px); color:#333;
}

/* 자세히 보기 */
.info-main .more-row{ display:flex; justify-content:flex-end; }
.info-main .more{
  display:inline-block; margin-top:clamp(18px,2.4vw,22px);
  font-size:14px; color:#7b8a8a; text-decoration:none;
}
.info-main .more:hover{ text-decoration:underline; }

/* ===== 반응형 ===== */
@media (max-width:1279px){
  .info-main .carousel{ grid-template-columns:44px 1fr 44px; }
  .info-main .nav{ width:44px; height:44px; font-size:26px; }
}
@media (max-width:768px){
  .info-main .carousel{ grid-template-columns:40px 1fr 40px; }
  .info-main .nav{ width:40px; height:40px; font-size:24px; }
}
@media (max-width:640px){
  .info-main .tabs{ width:100%; }
  .info-main .tab{ flex:1 1 0; min-width:0; }
  .info-main .carousel{ grid-template-columns:36px 1fr 36px; }
  .info-main .nav{ width:36px; height:36px; font-size:22.1px; }
}
</style>
