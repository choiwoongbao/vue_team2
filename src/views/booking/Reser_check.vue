<template>
  <div class="reser_check">
    <Stepper :current-step="2" />

    <div class="cards">
      <section class="card">
        <h3>예약 정보</h3>
        <table>
          <tbody>
            <tr>
              <th>성함:</th>
              <td>{{ payload.bookingData?.name || "-" }}</td>
            </tr>
            <tr>
              <th>연락처:</th>
              <td>{{ payload.bookingData?.phone || "-" }}</td>
            </tr>
            <tr>
              <th>주문 서비스:</th>
              <td>{{ selectedLabel }}</td>
            </tr>
            <tr>
              <th>보관할 위치:</th>
              <td>{{ payload.bookingData?.address || "-" }}</td>
            </tr>
            <tr>
              <th>보관할 크기:</th>
              <td>{{ payload.bookingData?.size || "-" }}</td>
            </tr>
            <tr>
              <th>대여 기간:</th>
              <td>{{ payload.bookingData?.date || "-" }}</td>
            </tr>
            <tr>
              <th>결제금액</th>
              <td>{{ formatKrw(payload.totalPrice || 0) }}</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section class="card">
        <h3>마일리지 / 쿠폰 사용</h3>
        <ul class="benefit">
          <li v-if="payload.useCoupon">Welcome 쿠폰 - 3000원</li>
          <li v-if="payload.usePoints">Point - 2500p</li>
        </ul>
        <div class="total">
          <span>총 결제금액</span>
          <strong>{{ formatKrw(payload.finalTotal || 0) }}</strong>
        </div>
      </section>
    </div>

    <div class="pay-method">
      <h3>결제방법 선택</h3>
      <div class="chips">
        <span :class="{ active: payload.paymentMethod === 'card' }"
          >신용카드</span
        >
        <span :class="{ active: payload.paymentMethod === 'kakao' }"
          >카카오페이</span
        >
        <span :class="{ active: payload.paymentMethod === 'naver' }"
          >네이버페이</span
        >
        <span :class="{ active: payload.paymentMethod === 'bank' }"
          >무통장입금</span
        >
      </div>
      <button class="btn primary" @click="finish">결제 완료 처리</button>
    </div>
  </div>
</template>

<script setup>
import { onMounted, reactive, computed } from "vue";
import Stepper from "@/views/booking/Reser_check.vue";

const payload = reactive({});

onMounted(() => {
  try {
    const raw = localStorage.getItem("checkoutPayload");
    if (raw) {
      const data = JSON.parse(raw);
      Object.assign(payload, data);
    }
  } catch (e) {
    // 파싱 실패 시 무시
  }
});

const formatKrw = (v) =>
  new Intl.NumberFormat("ko-KR", { style: "currency", currency: "KRW" }).format(
    v || 0
  );
const selectedLabel = computed(() =>
  payload.selectedServices?.length ? payload.selectedServices.join(", ") : "-"
);

function finish() {
  alert(
    `예약이 완료되었습니다.\n결제 금액: ${formatKrw(payload.finalTotal || 0)}`
  );
  window.location.href = "/complete";
}
</script>

<style lang="scss" scoped>
.step ul {
  display: flex;
  justify-content: center;
  gap: 40px;
  margin: 10px 0 20px;
  color: #bbb;
}
.step li.active {
  color: #2ca39f;
  font-weight: 700;
}
.cards {
  display: grid;
  grid-template-columns: 1fr;
  gap: 14px;
}
.card {
  background: #fff;
  border: 1px solid #e6e6e6;
  border-radius: 8px;
  padding: 16px;
}
.card h3 {
  margin: 0 0 8px;
}
table {
  width: 100%;
  border-collapse: collapse;
}
th {
  text-align: left;
  color: #666;
  width: 120px;
  padding: 6px 0;
}
td {
  padding: 6px 0;
}
.benefit {
  list-style: none;
  padding: 0;
  margin: 0 0 8px;
  color: #e03b3b;
}
.total {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 8px;
}
.total strong {
  color: #2ca39f;
  font-size: 18px;
}
.pay-method {
  margin-top: 16px;
  background: #f8f8f8;
  border-radius: 8px;
  padding: 16px;
}
.chips {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 8px;
}
.chips span {
  padding: 6px 10px;
  border: 1px solid #ddd;
  border-radius: 999px;
}
.chips span.active {
  border-color: #2ca39f;
  color: #2ca39f;
  background: #e9f8f8;
}
.btn.primary {
  width: 100%;
  padding: 12px;
  background: #2ca39f;
  color: #fff;
  border: none;
  border-radius: 8px;
}
@media (min-width: 860px) {
  .cards {
    grid-template-columns: 1fr 1fr;
  }
}
</style>
