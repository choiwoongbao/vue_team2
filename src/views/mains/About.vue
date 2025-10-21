<template>
  <!-- ============임시. 지우고 작성하세요========================= -->
  <div class="section-wrap">
    <div class="section-left">
      <h2>짐보따리 제공 서비스</h2>
      <p>짐보따리에서 다양한 서비스를 이용해 보세요</p>
    </div>

    <div class="section-right">
      <div class="card">
        <h3>보관하기</h3>
        <p>짐이 많을 땐 잠시 맡기세요</p>
      </div>
      <div class="card">
        <h3>배송(집 → 지점)</h3>
        <p>무거운 짐은 문 앞에서 해결하세요</p>
      </div>
      <div class="card">
        <h3>배송(지점 → 집)</h3>
        <p>마지막까지 편하게 여행하세요</p>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
.section-wrap {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 60px;
  padding: 80px 0;
  margin-top: 100px;
}

/* 왼쪽 글 영역 */
.section-left {
  flex: 0 0 300px;
  color: #333;
  font-family: "Inter", "Pretendard", sans-serif;

  h2 {
    font-size: 28px;
    font-weight: 700;
    margin-bottom: 16px;
  }

  p {
    font-size: 16px;
    line-height: 1.6;
    color: #555;
  }
}

/* 오른쪽 카드 영역 */
.section-right {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

/* ✅ 부드럽고 옅은 그림자 */
.card {
  width: 260px;
  height: 340px;
  background: #fff;
  border-radius: 12px;
  border: 1px solid #ebebeb;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-family: "Inter", "Pretendard", sans-serif;
  transition: box-shadow 0.3s ease, transform 0.3s ease;

  /* 🌤 기본 그림자 — 매우 부드럽고 옅은 톤 */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05), 0 4px 10px rgba(0, 0, 0, 0.06);

  &:hover {
    /* hover 시 살짝 진해지며 살짝 상승 */
    transform: translateY(-4px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.08), 0 8px 16px rgba(0, 0, 0, 0.1);
  }

  h3 {
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 10px;
    color: #333;
  }

  p {
    font-size: 15px;
    color: #666;
    line-height: 1.5;
  }
}

/* 반응형 */
@media (max-width: 1080px) {
  .section-wrap {
    flex-direction: column;
    align-items: center;
  }

  .section-right {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 680px) {
  .section-right {
    grid-template-columns: 1fr;
  }

  .card {
    width: 100%;
  }
}
</style>
