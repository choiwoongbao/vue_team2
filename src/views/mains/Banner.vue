<template>
  <section class="banner-outer">
    <div class="banner-center">
      <swiper
        class="mbannerSwiper"
        :modules="[Autoplay, Navigation]"
        :autoplay="{ delay: 2500, disableOnInteraction: false }"
        :navigation="true"
        :loop="true"
      >
        <!-- slide 1 -->
        <swiper-slide>
          <div class="banner-grid">
            <div class="main-banner-txt">
              <h1 class="mb-txt1">QR 코드 출입</h1>
              <h2 class="mb-txt2">한 번의 스캔, 바로 입장</h2>
              <h3 class="mb-txt3">이용은 간단하게, 보안은 확실하게 보장합니다.</h3>
            </div>
            <div class="main-banner-img">
              <img src="/public/images/mains/banner/bannerimg2.png" alt="mainbannerimg" />
            </div>
          </div>
        </swiper-slide>

        <!-- slide 2 -->
        <swiper-slide>
          <div class="banner-grid">
            <div class="main-banner-txt">
              <h1 class="mb-txt1">안전한 보관</h1>
              <h2 class="mb-txt2">전문가의 안심 관리</h2>
              <h3 class="mb-txt3">전문가의 손길로 짐을 꼼꼼하게 관리합니다.</h3>
            </div>
            <div class="main-banner-img">
              <img src="/public/images/mains/banner/bannerimg3.png" alt="mainbannerimg" />
            </div>
          </div>
        </swiper-slide>
      </swiper>
    </div>
  </section>
</template>

<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";
</script>

<style lang="scss" scoped>
/* =========================================================
   1920px 기준 높이 530px 유지 / 비율 고정 반응형
   1000px 이하부터는 세로형 레이아웃 전환
   ========================================================= */

/* 배경 */
.banner-outer {
  width: 100%;
  background: #f6f6f6;
  overflow: hidden;
}

/* 컨테이너 */
.banner-center {
  max-width: 1920px;
  margin: 0 auto;
  position: relative;
}

/* Swiper 공통 */
.mbannerSwiper {
  width: 100%;
  height: 100%;
}
:deep(.swiper-button-prev),
:deep(.swiper-button-next) {
  color: #b3b3b3;
}

/* ======================= ≥1000px ======================= */
@media (min-width: 1000px) {
  .banner-grid {
    display: grid;
    grid-template-columns:
      clamp(520px, 33.5vw, 640px)
      clamp(360px, 22vw, 416px);
    column-gap: clamp(40px, 3.3vw, 64px);
    align-items: center;
    justify-content: center;
    width: 100%;
    max-width: clamp(960px, 58vw, 1120px);
    margin: 0 auto;

    /* 높이: 1920px → 530px 비율 유지 (1000px에서 약 276px) */
    min-height: clamp(276px, 27.6vw, 530px);
  }

  /* 텍스트 */
  .main-banner-txt {
    display: flex;
    flex-direction: column;
    gap: clamp(8px, 0.9vw, 12px);
    line-height: 1.2;
  }
  .mb-txt1 {
    font-size: clamp(16px, 1.05vw, 20px);
    color: #028587;
    font-weight: 600;
    margin: 0;
  }
  .mb-txt2 {
    font-size: clamp(40px, 3.3vw, 64px);
    font-weight: 800;
    color: #000;
    line-height: 1.15;
    margin: 0;
    letter-spacing: -0.02em;
  }
  .mb-txt3 {
    font-size: clamp(14px, 0.94vw, 18px);
    color: #000;
    font-weight: 400;
    line-height: 1.25;
    margin: 0;
  }

  /* 이미지 */
  .main-banner-img {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
  .main-banner-img img {
    width: 100%;
    height: auto;
    object-fit: contain;
    display: block;
  }
}

/* ======================= <1000px ======================= */
@media (max-width: 999.98px) {
  .banner-center {
    padding: 24px 16px 32px;
  }

  .banner-grid {
    width: 100%;
    max-width: 720px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    row-gap: 20px;
  }

  .main-banner-txt {
    text-align: center;
    max-width: 560px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    line-height: 1.2;
  }
  .mb-txt1 {
    font-size: 16px;
    color: #028587;
    font-weight: 600;
    margin: 0;
  }
  .mb-txt2 {
    font-size: 32px;
    font-weight: 800;
    color: #000;
    line-height: 1.2;
    margin: 0;
  }
  .mb-txt3 {
    font-size: 14px;
    color: #000;
    line-height: 1.25;
    margin: 0;
  }
  .main-banner-img img {
    width: min(85vw, 360px);
    height: auto;
    object-fit: contain;
    display: block;
  }

  :deep(.swiper-button-prev),
  :deep(.swiper-button-next) {
    width: 28px;
    height: 28px;
  }
  :deep(.swiper-button-prev) {
    left: 16px;
  }
  :deep(.swiper-button-next) {
    right: 16px;
  }
}
</style>
