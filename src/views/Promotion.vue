<template>
  <div class="promo-banner">
    <img src="/public/images/promotion/promobanner.png" alt="promotion banner" />
  </div>
  <div class="promo-inner">
    <div class="promo-benefit">
      <div class="promo-title">
        <h1>짐보따리</h1>
        <h2>신규 회원 전용 혜택</h2>
        <p>신규회원 가입 시 누릴 수 있는 다양한 혜택을 확인해보세요!</p>
      </div>

      <div class="benefit-img">
        <img src="/public/images/promotion/benefit1.png" alt="benefit 1" />
        <img src="/public/images/promotion/benefit2.png" alt="benefit 2" />
        <img src="/public/images/promotion/benefit3.png" alt="benefit 3" />
        <img src="/public/images/promotion/benefit4.png" alt="benefit 4" />
      </div>
    </div>
  </div>
  <div class="benefit-list">
    <div class="benefit1">
      <h1>Benefit</h1>
      <h2>신규 회원 혜택</h2>
      <p>
        신규 가입 최대 10,000원 혜택 <br />
        회원가입 시 적립금 & 웰컴 쿠폰 자동 발급!
      </p>
      <img src="/public/images/promotion/coupon.png" alt="new coupon" />
      <p>쿠폰 사용 기간 : 발급일로부터 일주일 이내</p>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
.promo-benefit {
  text-align: center;
  /* background-color: #333; */
}
.promo-title h1 {
  margin-top: 100px;
  color: #000000;
  font-size: 40px;
  font-weight: 500;
}

.promo-title h2 {
  color: #028587;
  font-size: 40px;
  font-weight: 600;
}

.promo-title p {
  color: #000000;
  font-size: 25px;
  font-weight: normal;
  margin-bottom: 30px;
}
.benefit-img {
  display: flex;
}
</style>
