<template>
  <div class="review_wrap">
    <div class="inner-review">
      <div class="title">

        <h1>사용자들의 이유 있는 선택</h1>
        
        <h2><span>4.83</span>/5</h2>
        <p>★★★★★</p>
        <p>*2025년 9월 기준</p>
      </div>
      <!-- Swiper -->
      <div class="swiper reviewSwiper">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(review, i) in reviews" :key="i">
            <div class="review_card">
              <div class="text_wrap">
                <p class="comment">{{ review.comment }}</p>

                <div class="rating">
                  <span class="star">⭐</span>
                  <span class="score">{{ review.rating.toFixed(1) }}</span>
                </div>

                <div class="user_info">
                  <p class="name">{{ review.name }} 님의 후기</p>
                  <p class="date">{{ review.date }}</p>
                </div>
              </div>

              <div class="img_wrap">
                <img :src="review.image" alt="리뷰 이미지" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Swiper from "swiper/bundle";
import "swiper/css/bundle";
const reviews = ref([
  {
    name: "정**",
    rating: 5,
    date: "2025. 08. 19",
    comment:
      "출장 중에도 24시간 언제든 짐을 맡길 수 있어 편리했어요. 배송도 빠르고 신뢰감 있는 서비스였습니다.",
    image: "https://randomuser.me/api/portraits/men/75.jpg",
  },
  {
    name: "김**",
    rating: 5,
    date: "2025. 07. 11",
    comment:
      "보관만 하려다 배송까지 가능해서 놀랐어요. 무거운 짐 걱정 없이 여행할 수 있었어요.",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
  },
  {
    name: "이**",
    rating: 4.5,
    date: "2025. 06. 30",
    comment:
      "비 오는 날이라 짐 옮기기 힘들었는데, 보관과 배송을 한 번에 해결해서 너무 편했어요. 짐도 깨끗하게 도착해서 만족했습니다.",
    image: "https://randomuser.me/api/portraits/women/40.jpg",
  },
  {
    name: "박**",
    rating: 5,
    date: "2025. 08. 02",
    comment:
      "응대가 친절하고 배송도 제시간에 도착했어요. 덕분에 짐 없이 여행을 즐길 수 있었습니다.",
    image: "https://randomuser.me/api/portraits/women/38.jpg",
  },
  {
    name: "홍**",
    rating: 4,
    date: "2025. 07. 15",
    comment:
      "기차역 근처에서 바로 맡기고 숙소로 배송받았어요. 무거운 캐리어 들고 다닐 필요가 없어서 너무 편했습니다. 다음에도 이용할게요!",
  image: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    name: "이**",
    rating: 4.8,
    date: "2025. 09. 01",
    comment:
      "사물함 크기가 다양해 캐리어 보관도 문제없어요. 배송도 빠르고 서비스가 깔끔합니다.",
    image: "https://randomuser.me/api/portraits/women/48.jpg",
  },
  {
    name: "최**",
    rating: 5,
    date: "2025. 09. 10",
    comment:
      "가격이 합리적이고 배송 품질도 좋아요. 친절한 고객센터 덕분에 신뢰가 갔습니다.",
    image: "https://randomuser.me/api/portraits/women/24.jpg",
  },
  {
    name: "한**",
    rating: 4.2,
    date: "2025. 08. 05",
    comment:
      "예약이 간단했어요. 짐을 숙소로 바로 배송받을 수 있어 좋았습니다.",
    image: "https://randomuser.me/api/portraits/women/36.jpg",
  },
  {
    name: "박**",
    rating: 5,
    date: "2025. 07. 28",
    comment:
      "보관함이 청결하고 냄새도 없었어요. 배송도 빠르고 기사님도 친절했습니다.",
    image: "https://randomuser.me/api/portraits/men/45.jpg",
  },
  {
    name: "정**",
    rating: 4.7,
    date: "2025. 09. 12",
    comment:
      "예약부터 배송까지 간단하고 빠릅니다. 알림으로 진행 상황을 바로 볼 수 있어 좋아요.",
    image: "https://randomuser.me/api/portraits/women/24.jpg",
  },
]);

onMounted(() => {
  new Swiper(".reviewSwiper", {
    slidesPerView: 3.1, // 
    centeredSlides: true,
    loop: true,
    loopedSlides: reviews.value.length,
    spaceBetween: 40,
    speed: 1000,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    breakpoints: {
      1400: { slidesPerView: 3.1, spaceBetween: 40 },
      1024: { slidesPerView: 2.3, spaceBetween: 30 },
      768: { slidesPerView: 1.4, spaceBetween: 25 },
      480: { slidesPerView: 1.1, spaceBetween: 15 },
    },
  });
});
</script>

<style lang="scss" scoped>
@use "/src/assets/style/variables" as *;
.review_wrap {
  padding: 100px 0;
  overflow: hidden;

}

.inner-review {
  width: 100%;
  max-width: 1200px; 
  margin: 0 auto;
  text-align: center;
}

.inner-review > h1 {
  font-size: $title-md;
  color: #222;
}

.reviewSwiper {
  overflow: visible;
  margin-top: 80px; 
}

/* 슬라이드 */
.swiper-slide {
  aspect-ratio: 1.4 / 1;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.6s ease;
  opacity: 0.5;
  transform: scale(0.9);
}

.swiper-slide-active {
  transform: scale(1.05);
  opacity: 1;
  z-index: 10;
}

.swiper-slide-prev,
.swiper-slide-next {
  opacity: 0.8;
  transform: scale(0.95);
}

/* 카드 */
.review_card {
  width: 100%;
  height: 100%;
  background: #fff;
  border-radius: 20px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  padding: 25px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: "Pretendard", sans-serif;
}

/* 텍스트 */
.text_wrap {
  flex: 1;
  text-align: left;
}

.comment {
  font-size: 15px;
  color: #333;
  line-height: 1.5;
  margin-bottom: 14px;
}

.rating {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
}

.star {
  font-size: 18px;
  color: #facc15;
  margin-right: 5px;
}

.score {
  font-size: 17px;
  font-weight: 600;
  color: #333;
}

.user_info {
  font-size: 13px;
  color: #888;
}

.user_info .name {
  margin-bottom: 4px;
  font-weight: 500;
}

/* 이미지 */
.img_wrap {
  flex-shrink: 0;
  margin-left: 20px;
  text-align: center;
}

.img_wrap img {
  width: 90px;
  height: 90px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 6px;
}
</style>
