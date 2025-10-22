<!-- 수정 필요한--
 490이하일때 스와이퍼의 중앙이 맞지 않음 
 
 -->
<template>
  <div class="review_wrap">
    <div class="inner-review">
      <div class="title">
        <h1>사용자들의 이유 있는 선택</h1>
        <h2><span class="strong">4.83</span>/5</h2>
        <p class="star">★★★★★</p>
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
    name: "이**",
    rating: 5,
    date: "2025. 08. 19",
    comment: "출장 중에도 24시간 언제든 짐을 맡길 수 있어 편리했어요. 배송도 빨랐어요!",
    image: "/images/mains/revieww/image 128.png",
  },
  {
    name: "김**",
    rating: 5,
    date: "2025. 07. 11",
    comment: "보관만 하려다 배송까지 가능해서 놀랐어요. 무거운 짐 걱정 없이 여행할 수 있었어요.",
    image: "/images/mains/revieww/image 131.png",
  },
  {
    name: "이**",
    rating: 4.5,
    date: "2025. 06. 30",
    comment: "보관과 배송을 한 번에 해결해서 너무 편했어요. 짐도 깨끗하게 도착해서 만족했습니다.",
    image: "/images/mains/revieww/image 132.png",
  },
  {
    name: "박**",
    rating: 5,
    date: "2025. 08. 02",
    comment: "응대가 친절하고 배송도 제시간에 도착했어요. 덕분에 짐 없이 여행을 즐길 수 있었습니다.",
    image: "/images/mains/revieww/image 133.png",
  },
  {
    name: "홍**",
    rating: 4,
    date: "2025. 07. 15",
    comment: "기차역 근처에서 바로 맡기고 숙소로 배송받았어요. 다음에도 이용할게요!",
    image: "/images/mains/revieww/image 457.png",
  },
  {
    name: "이**",
    rating: 4.8,
    date: "2025. 09. 01",
    comment: "사물함 크기가 다양해 캐리어 보관도 문제없어요. 배송도 빠르고 서비스가 깔끔합니다.",
    image: "/images/mains/revieww/image 458.png",
  },
  {
    name: "최**",
    rating: 5,
    date: "2025. 09. 10",
    comment: "가격이 합리적이고 배송 품질도 좋아요. 친절한 고객센터 덕분에 신뢰가 갔습니다.",
    image: "/images/mains/revieww/image 470.png",
  },
  {
    name: "한**",
    rating: 4.2,
    date: "2025. 08. 05",
    comment: "예약이 간단했어요. 짐을 숙소로 바로 배송받을 수 있어 좋았습니다.",
    image: "/images/mains/revieww/image 469.png",
  },
  {
    name: "박**",
    rating: 5,
    date: "2025. 07. 28",
    comment: "보관함이 청결하고 냄새도 없었어요. 배송도 빠르고 기사님도 친절했습니다.",
    image: "/images/mains/revieww/image 471.png",
  },
  {
    name: "정**",
    rating: 4.7,
    date: "2025. 09. 12",
    comment: "예약부터 배송까지 간단하고 빠릅니다. 알림으로 진행 상황을 바로 볼 수 있어 좋아요.",
    image: "/images/mains/revieww/image 467.png",
  },
]);

onMounted(() => {
  new Swiper(".reviewSwiper", {
    slidesPerView: 3, //
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
      490: { slidesPerView: 1.3, spaceBetween: 15 },
      0: { slidesPerView: 1, spaceBetween: 8 },
    },
  });
});
</script>

<style lang="scss" scoped>
@use "/src/assets/style/variables" as *;
.strong {
  color: $color_dangr;
}
.star {
  color: yellow;
}
.review_wrap {
  padding: $title-big-gap-large;
  overflow: hidden;
}

.inner-review {
  width: 100%;
  max-width: 1320px;
  margin: 0 auto;
  text-align: center;
}

.inner-review > h1 {
  font-size: $title-md;
  color: #222;
}

.reviewSwiper {
  overflow: visible;
  margin-top: $text-big-gap-large;
}

/* 슬라이드 */
.swiper-slide {
  aspect-ratio: 1.4 / 1;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.6s ease;
  opacity: 0.1;
  transform: scale(0.9);
}

.swiper-slide-active {
  transform: scale(1);
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
  padding: $text-small-gap-small;
  padding-left: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* 텍스트 */
.text_wrap {
  flex: 1;
  text-align: left;
}

.comment {
  font-size: $text-md;
  color: #333;
  line-height: 1.5;
  margin-bottom: $label-small-gap-small;
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
  font-size: $text-sm;
  font-weight: 600;
  color: #333;
}

.user_info {
  font-size: $label-sm;
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

// ========반응형======490px 이하===============
@media (max-width: 768px) {
  .comment {
    font-size: $label-lg;
  }
}
@media (max-width: 490px) {
  .comment {
    font-size: $label-sm;
  }
  .review_card {
    max-width: 90%;
    min-height: 300px;
  }
  .reviewSwiper {
    margin-top: 80px;
  }
}
</style>
