<template>
  <section class="banner-inner">
    <swiper
      class="mbannerSwiper"
      :modules="[Autoplay, Navigation]"
      :autoplay="{ delay: 2500, disableOnInteraction: false }"
      :navigation="true"
      :loop="true">
      <!-- banner 1 -->
      <swiper-slide>
        <div class="main-banner-frame">
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

      <!-- banner 2 -->
      <swiper-slide>
        <div class="main-banner-frame">
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
  </section>
</template>

<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";
</script>

<style lang="scss" scoped>
@import "/src/assets/style/variables";

.banner-inner {
  width: 100%;
  max-width: 1920px;
  margin: 0 auto;
  position: relative;
}

/* Swiper */
.mbannerSwiper {
  width: 100%;
}
.mbannerSwiper .swiper-wrapper,
.mbannerSwiper .swiper-slide {
  width: 100%;
}

/* 네비게이션 색 */
.banner-inner :deep(.swiper-button-prev),
.banner-inner :deep(.swiper-button-next) {
  color: #b3b3b3;
}

.banner-inner :deep(.swiper-button-prev) {
  left: clamp(16px, 8vw, 120px);
}
.banner-inner :deep(.swiper-button-next) {
  right: clamp(16px, 8vw, 120px);
}

/* 배너 레이아웃 */
.main-banner-frame {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  align-items: center;
  column-gap: clamp(24px, 1vw, 10px);
  padding-top: clamp(40px, 6vw, 80px);
  background-color: #f6f6f6;
   isolation: isolate;  
}

.main-banner-txt {
  display: flex;
  flex-direction: column;
   justify-content: flex-start !important;
  align-items: flex-start !important;  
  gap: clamp(8px, 1.2vw, 16px);
  padding-bottom: 90px;
  padding-left: clamp(24px, 20vw, 400px);
    line-height: 0.7;
}
.main-banner-txt .mb-txt1,
.main-banner-txt .mb-txt2,
.main-banner-txt .mb-txt3 {
  padding-left: 0;
}
.main-banner-txt .mb-txt1 {
  font-size: clamp(18px, 1.6vw, 28px);
  color: #028587;
  font-weight: 600;
}
.main-banner-txt .mb-txt2 {
  font-size: clamp(28px, 3.6vw, 60px);
  color: #000;
  font-weight: 700;
  white-space: nowrap;
}
.main-banner-txt .mb-txt3 {
  font-size: clamp(14px, 1.4vw, 18px);
  color: #000;
  font-weight: 400;
  margin-top: clamp(5px, 0.8vw, 12px);
}

.main-banner-img {
  width: clamp(260px, 22vw, 350px);
  height: clamp(200px, 20vw, 350px);
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.main-banner-img img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
}

@media (max-width: 768px) {
  .main-banner-frame {
    display: grid;
    grid-template-columns: 1.1fr 0.9fr;
    align-items: center;
    column-gap: clamp(24px, 1vw, 10px);
    padding-top: clamp(40px, 6vw, 80px);
    background-color: #f6f6f6;
  }
  .main-banner-txt {
    display: flex;
    flex-direction: column;
    gap: clamp(8px, 0.5vw, 12px);
    padding-bottom: 50px;
    padding-left: 120px;
  }
  .main-banner-txt .mb-txt2 {
    white-space: nowrap;
  }

  /* swiper */
  .banner-inner :deep(.swiper-button-prev),
  .banner-inner :deep(.swiper-button-next) {
    width: 35px;
    height: 35px;
  }
  .banner-inner :deep(.swiper-button-prev) {
    left: clamp(12px, 6vw, 24px);
  }
  .banner-inner :deep(.swiper-button-next) {
    right: clamp(12px, 6vw, 24px);
  }
}

@media (max-width: 760px) {
  .main-banner-frame {
    grid-template-columns: 1fr;  
    row-gap: 30px;
    padding: 40px 20px;     
    justify-items: stretch;       /* 텍스트 영역을 좌우로 쭉 */
    text-align: left;             /* 텍스트는 왼쪽 정렬 */
  }
  .main-banner-txt {
    padding: 0px 60px;          
    align-self: start;          
    justify-self: start;         
    white-space: nowrap;
    line-height: 0.7;
padding-left: 150px;
  }
    .main-banner-txt .mb-txt1{font-size: 18px;}
  .main-banner-txt .mb-txt2 { font-size: 30px; line-height: 1.1; }
    .main-banner-txt .mb-txt3{font-size: 13px;}

  .main-banner-img {
    width: 270px;                 
    max-width: 85vw;              
    height: auto;                
    justify-self: center;       
  }
  .main-banner-img img {
    width: 100%;
    height: auto;
    object-fit: contain;
    display: block;
  }

  /* 스와이퍼 버튼도 조금 안쪽/작게 */
  .banner-inner :deep(.swiper-button-prev),
  .banner-inner :deep(.swiper-button-next) {
    width: 28px;
    height: 28px;
  }
  .banner-inner :deep(.swiper-button-prev) { left: 30px; }
  .banner-inner :deep(.swiper-button-next) { right: 30px; }
}

@media (max-width: 530px) {
  .main-banner-frame {
    grid-template-columns: 1fr;  
    row-gap: 30px;
    padding: 40px 20px;     
    justify-items: stretch;       /* 텍스트 영역을 좌우로 쭉 */
    text-align: left;             /* 텍스트는 왼쪽 정렬 */
  }
  .main-banner-txt {
    padding: 0px 80px;          
    align-self: start;          
    justify-self: start;         
    white-space: nowrap;
    line-height: 0.4;
padding-left: 100px;
  }
    .main-banner-txt .mb-txt1{font-size: 18px;}
  .main-banner-txt .mb-txt2 { font-size: 35px; line-height: 1.1; }
    .main-banner-txt .mb-txt3{font-size: 13px;}

  .main-banner-img {
    width: 300px;                 
    max-width: 85vw;              
    height: auto;                
    justify-self: center;       
  }
  .main-banner-img img {
    width: 100%;
    height: auto;
    object-fit: contain;
    display: block;
  }

  /* 스와이퍼 버튼도 조금 안쪽/작게 */
  .banner-inner :deep(.swiper-button-prev),
  .banner-inner :deep(.swiper-button-next) {
    width: 28px;
    height: 28px;
  }
  .banner-inner :deep(.swiper-button-prev) { left: 30px; }
  .banner-inner :deep(.swiper-button-next) { right: 30px; }
}

@media (max-width: 490px) {
  .main-banner-frame {
    grid-template-columns: 1fr;  
    row-gap: 30px;
    padding: 40px 20px;     
    justify-items: stretch;       /* 텍스트 영역을 좌우로 쭉 */
    text-align: left;             /* 텍스트는 왼쪽 정렬 */
  }
  .main-banner-txt {
    padding: 0px 80px;          
    align-self: start;          
    justify-self: start;         
    white-space: nowrap;
    line-height: 0.4;
padding-left: 60px;
  }
    .main-banner-txt .mb-txt1{font-size: 18px;}
  .main-banner-txt .mb-txt2 { font-size: 33px; line-height: 1.1; }
    .main-banner-txt .mb-txt3{font-size: 13px;}

  .main-banner-img {
    width: 280px;                 
    max-width: 85vw;              
    height: auto;                
    justify-self: center;       
  }
  .main-banner-img img {
    width: 100%;
    height: auto;
    object-fit: contain;
    display: block;
  }

  /* 스와이퍼 버튼도 조금 안쪽/작게 */
  .banner-inner :deep(.swiper-button-prev),
  .banner-inner :deep(.swiper-button-next) {
    width: 28px;
    height: 28px;
  }
  .banner-inner :deep(.swiper-button-prev) { left: 30px; }
  .banner-inner :deep(.swiper-button-next) { right: 30px; }
}

@media (max-width: 430px) {
  .main-banner-frame {
    grid-template-columns: 1fr;  
    row-gap: 30px;
    padding: 40px 20px;     
    justify-items: stretch;       /* 텍스트 영역을 좌우로 쭉 */
    text-align: left;             /* 텍스트는 왼쪽 정렬 */
  }
  .main-banner-txt {
    padding: 0px 80px;          
    align-self: start;          
    justify-self: start;         
    white-space: nowrap;
    line-height: 0.4;
padding-left: 45px;
  }
    .main-banner-txt .mb-txt1{font-size: 15px;}
  .main-banner-txt .mb-txt2 { font-size: 30px; line-height: 1.1; }
    .main-banner-txt .mb-txt3{font-size: 13px;}

  .main-banner-img {
    width: 280px;                 
    max-width: 85vw;              
    height: auto;                
    justify-self: center;       
  }
  .main-banner-img img {
    width: 100%;
    height: auto;
    object-fit: contain;
    display: block;
  }

  /* 스와이퍼 버튼도 조금 안쪽/작게 */
  .banner-inner :deep(.swiper-button-prev),
  .banner-inner :deep(.swiper-button-next) {
    width: 28px;
    height: 28px;
  }
  .banner-inner :deep(.swiper-button-prev) { left: 18px; }
  .banner-inner :deep(.swiper-button-next) { right: 18px; }
}

@media (max-width: 390px) {
  .main-banner-frame {
    grid-template-columns: 1fr;  
    row-gap: 30px;
    padding: 40px 20px;     
    justify-items: stretch;       /* 텍스트 영역을 좌우로 쭉 */
    text-align: left;             /* 텍스트는 왼쪽 정렬 */
  }
  .main-banner-txt {
    padding: 0px 80px;          
    align-self: start;          
    justify-self: start;         
    white-space: nowrap;
    line-height: 0.4;
padding-left: 45px;
  }
    .main-banner-txt .mb-txt1{font-size: 15px;}
  .main-banner-txt .mb-txt2 { font-size: 30px; line-height: 1.1; }
    .main-banner-txt .mb-txt3{font-size: 13px;}

  .main-banner-img {
    width: 270px;                 
    max-width: 85vw;              
    height: auto;                
    justify-self: center;       
  }
  .main-banner-img img {
    width: 100%;
    height: auto;
    object-fit: contain;
    display: block;
  }

  /* 스와이퍼 버튼도 조금 안쪽/작게 */
  .banner-inner :deep(.swiper-button-prev),
  .banner-inner :deep(.swiper-button-next) {
    width: 28px;
    height: 28px;
  }
  .banner-inner :deep(.swiper-button-prev) { left: 15px; }
  .banner-inner :deep(.swiper-button-next) { right: 10px; }
}
</style>
