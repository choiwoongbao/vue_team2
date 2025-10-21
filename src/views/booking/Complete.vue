<template>
  <div class="complete inner">
    <Stepper :current-step="3" />

    <section class="receipt">
      <h3>결제 내역</h3>
      <table>
        <tbody>
          <tr>
            <th>상호명:</th>
            <td>㈜퓨어스</td>
          </tr>
          <tr>
            <th>결제 일시:</th>
            <td>{{ now }}</td>
          </tr>
          <tr>
            <th>결제 금액:</th>
            <td>{{ formatKrw(payload.finalTotal || 0) }}</td>
          </tr>
          <tr>
            <th>결제 수단:</th>
            <td>{{ paymentLabel }}</td>
          </tr>
        </tbody>
      </table>

      <h4>물품보관 예약서</h4>
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
        </tbody>
      </table>

      <div class="qr-actions">
        <div class="qr" aria-hidden="true">QR</div>
      </div>

      <div class="buttons">
        <button class="btn ghost" @click="goHome">홈으로 가기</button>
        <button class="btn primary" @click="goReserve">예약 확인</button>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed, onMounted, reactive } from "vue";
import Stepper from "@/components/reserv/Stepper.vue";
import { useRouter } from "vue-router";

const router = useRouter();
const payload = reactive({});
const now = new Date().toLocaleString();

onMounted(() => {
  try {
    const raw = localStorage.getItem("checkoutPayload");
    if (raw) Object.assign(payload, JSON.parse(raw));
  } catch {}
});

const formatKrw = (v) =>
  new Intl.NumberFormat("ko-KR", { style: "currency", currency: "KRW" }).format(
    v || 0
  );
const paymentLabel = computed(() => {
  const map = {
    card: "신용카드",
    kakao: "카카오페이",
    naver: "네이버페이",
    bank: "무통장입금",
  };
  return map[payload.paymentMethod] || "-";
});
const selectedLabel = computed(() =>
  payload.selectedServices?.length ? payload.selectedServices.join(", ") : "-"
);

function goHome() {
  router.push("/");
}
function goReserve() {
  router.push("/reserve");
}
</script>

<style scoped>
.inner {
  max-width: 720px;
  margin: 0 auto;
  padding: 24px;
}
.step ul {
  display: flex;
  justify-content: center;
  gap: 40px;
  margin-bottom: 16px;
  color: #bbb;
}
.step li.active {
  color: #2ca39f;
  font-weight: 700;
}
.receipt {
  background: #fff;
  border: 1px solid #eee;
  border-radius: 12px;
  padding: 18px;
}
.receipt h3 {
  margin: 0 0 10px;
}
table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 10px;
}
th {
  text-align: left;
  color: #666;
  width: 140px;
  padding: 6px 0;
}
td {
  padding: 6px 0;
}
h4 {
  margin: 14px 0 8px;
}
.qr-actions {
  display: flex;
  justify-content: center;
  margin: 12px 0;
}
.qr {
  width: 72px;
  height: 72px;
  border: 1px dashed #ccc;
  display: grid;
  place-items: center;
  border-radius: 8px;
  color: #999;
}
.buttons {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin-top: 12px;
}
.btn {
  padding: 12px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
}
.btn.primary {
  background: #2ca39f;
  color: #fff;
}
.btn.ghost {
  background: #fff;
  color: #2ca39f;
  border: 1px solid #2ca39f;
}
</style>
