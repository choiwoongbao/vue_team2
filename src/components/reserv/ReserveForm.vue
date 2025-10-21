<template>
  <section class="reserve inner">
    <Stepper :current-step="1" />
    <!-- 진행 단계 -->
    <div class="step">
      <ul>
        <li class="active">예약하기</li>
        <li>확인 및 결제</li>
        <li>변경 완료</li>
      </ul>
    </div>

    <!-- 탭 선택 -->
    <div class="tab-wrap">
      <button
        v-for="(tab, index) in tabs"
        :key="index"
        @click="toggleTab(tab)"
        :class="{ active: selectedTabs.includes(tab) }"
      >
        {{ tab }}
        <span v-if="selectedTabs.includes(tab)">✔</span>
      </button>
    </div>

    <!-- 선택한 탭에 따른 입력 폼 -->
    <div class="form-section">
      <!-- 1. 사물함 예약 -->
      <div v-if="selectedTabs.includes('사물함 예약')" class="form-box">
        <h3>사물함 예약</h3>
        <input v-model="form.name" placeholder="성함을 입력해주세요" />
        <input v-model="form.phone" placeholder="휴대폰 번호 입력 (-제외)" />
        <select v-model="form.size">
          <option value="">사물함 사이즈 선택</option>
          <option>S</option>
          <option>M</option>
          <option>L</option>
        </select>
        <div class="addr-row">
          <input v-model="form.address" placeholder="대여 장소 입력" readonly />
          <div class="addr-actions">
            <button type="button" class="mini" @click="openAddr = true">
              주소 검색
            </button>
            <button type="button" class="mini ghost" @click="manualInput">
              직접 입력
            </button>
          </div>
        </div>
        <input v-model="form.date" type="date" />
      </div>

      <!-- 2. 짐 가져오기 -->
      <div v-if="selectedTabs.includes('짐 가져오기')" class="form-box">
        <h3>짐 가져오기</h3>
        <input v-model="form.pickupAddress" placeholder="픽업 주소 입력" />
        <input v-model="form.pickupDate" type="date" placeholder="날짜 선택" />
      </div>

      <!-- 3. 집으로 배송하기 -->
      <div v-if="selectedTabs.includes('집으로 배송하기')" class="form-box">
        <h3>집으로 배송하기</h3>
        <input v-model="form.homeAddress" placeholder="집 주소 입력" />
        <input v-model="form.detailAddress" placeholder="상세 주소 입력" />
        <input
          v-model="form.deliveryDate"
          type="date"
          placeholder="날짜 선택"
        />
      </div>
    </div>

    <!-- 결제 영역 -->
    <div class="checkout">
      <!-- 좌: 요약 -->
      <div class="summary" aria-labelledby="summary-title">
        <h3 id="summary-title">선택 상품 요약</h3>
        <ul>
          <li v-for="tab in selectedTabs" :key="tab">
            {{ tab }} — {{ formatKrw(prices[tab]) }}
          </li>
        </ul>

        <div class="divider" role="separator" aria-hidden="true"></div>

        <div class="benefits">
          <h4>마일리지 / 쿠폰 사용</h4>
          <div class="benefit-row">
            <label class="inline">
              <input type="checkbox" v-model="useCoupon" />
              Welcome 쿠폰 - 3000원
            </label>
            <span class="muted" v-if="useCoupon">- {{ formatKrw(3000) }}</span>
          </div>
          <div class="benefit-row">
            <label class="inline">
              <input type="checkbox" v-model="usePoints" />
              Point - 2500p
            </label>
            <span class="muted" v-if="usePoints">- {{ formatKrw(2500) }}</span>
          </div>
        </div>

        <div class="total-row" aria-live="polite">
          <span>총 결제금액</span>
          <strong>{{ formatKrw(finalTotal) }}</strong>
        </div>
      </div>

      <!-- 우: 결제수단 -->
      <div class="payment" aria-labelledby="payment-title">
        <h3 id="payment-title">결제방법 선택</h3>
        <div class="pay-grid" role="radiogroup" aria-label="결제 수단 선택">
          <button
            v-for="method in paymentMethods"
            :key="method.id"
            type="button"
            class="pay-card"
            :class="{ selected: selectedPayment === method.id }"
            role="radio"
            :aria-checked="selectedPayment === method.id"
            @click="selectedPayment = method.id"
            @keydown.enter.prevent="selectedPayment = method.id"
          >
            <span class="icon" aria-hidden="true">{{ method.icon }}</span>
            <span class="label">{{ method.label }}</span>
          </button>
        </div>
        <button class="btn primary" @click="saveAndPay">결제하기</button>
      </div>
    </div>

    <!-- 모바일 하단 요약바 -->
    <div class="mobile-checkout-bar">
      <div class="price">{{ formatKrw(finalTotal) }}</div>
      <button class="btn primary" @click="saveAndPay">결제하기</button>
    </div>
    <AddressPicker
      v-model="form.address"
      :open="openAddr"
      @close="openAddr = false"
      @selected="onAddressSelected"
    />
  </section>
</template>

<script setup>
import { ref, computed } from "vue";
import AddressPicker from "@/components/reserv/AddressPicker.vue";
import Stepper from "@/components/reserv/Stepper.vue";

const tabs = ["사물함 예약", "짐 가져오기", "집으로 배송하기"];
const selectedTabs = ref([]);

const form = ref({
  name: "",
  phone: "",
  size: "",
  address: "",
  date: "",
  pickupAddress: "",
  pickupDate: "",
  homeAddress: "",
  detailAddress: "",
  deliveryDate: "",
});

// 주소 검색 모달
const openAddr = ref(false);
const manualInput = () => {
  const value = prompt("주소를 직접 입력하세요", form.value.address || "");
  if (value !== null) form.value.address = value.trim();
};
const onAddressSelected = (addr) => {
  form.value.address = addr;
};

// 각 서비스별 요금
const prices = {
  "사물함 예약": 29000,
  "짐 가져오기": 15000,
  "집으로 배송하기": 20000,
};

// 총 결제금액 계산
const totalPrice = computed(() => {
  return selectedTabs.value.reduce((sum, tab) => sum + prices[tab], 0);
});

// 혜택 적용
const useCoupon = ref(true);
const usePoints = ref(true);
const discountAmount = computed(() => {
  let discount = 0;
  if (useCoupon.value) discount += 3000;
  if (usePoints.value) discount += 2500;
  return Math.min(discount, totalPrice.value);
});
const finalTotal = computed(() =>
  Math.max(totalPrice.value - discountAmount.value, 0)
);

// 결제수단
const paymentMethods = [
  { id: "card", label: "신용카드", icon: "💳" },
  { id: "kakao", label: "카카오페이", icon: "💬 pay" },
  { id: "naver", label: "네이버페이", icon: "N pay" },
  { id: "bank", label: "무통장입금", icon: "🏦" },
];
const selectedPayment = ref("card");

// 표시용 KRW 포맷팅
const formatter = new Intl.NumberFormat("ko-KR", {
  style: "currency",
  currency: "KRW",
});
const formatKrw = (value) => formatter.format(value);

// 탭 클릭 시 선택/해제
const toggleTab = (tab) => {
  if (selectedTabs.value.includes(tab)) {
    selectedTabs.value = selectedTabs.value.filter((t) => t !== tab);
  } else {
    selectedTabs.value.push(tab);
  }
};

// 결제 버튼 클릭
const saveAndPay = () => {
  if (selectedTabs.value.length === 0) {
    alert("최소 한 가지 서비스를 선택해주세요!");
    return;
  }
  if (!selectedPayment.value) {
    alert("결제 수단을 선택해주세요!");
    return;
  }

  const payload = {
    bookingData: form.value,
    selectedServices: selectedTabs.value,
    useCoupon: useCoupon.value,
    usePoints: usePoints.value,
    discountAmount: discountAmount.value,
    totalPrice: totalPrice.value,
    finalTotal: finalTotal.value,
    paymentMethod: selectedPayment.value,
  };

  localStorage.setItem("checkoutPayload", JSON.stringify(payload));
  // 라우터 이동
  // 라우터 사용 이동 (SPA 내 전환)
  if (window?.history?.pushState) {
    history.pushState({}, "", "/reser_check");
    window.dispatchEvent(new Event("popstate"));
  } else {
    window.location.href = "/reser_check";
  }
};
</script>

<style scoped>
.inner {
  max-width: 900px;
  margin: 0 auto;
  padding: 30px;
}

.step ul {
  display: flex;
  justify-content: center;
  gap: 40px;
  margin-bottom: 20px;
  color: #bbb;
}
.step li.active {
  color: #2ca39f;
  font-weight: 700;
}

.tab-wrap {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.tab-wrap button {
  display: flex;
  justify-content: space-between;
  padding: 14px;
  border: 1px solid #ccc;
  border-radius: 6px;
  background: #fff;
  font-weight: 600;
  cursor: pointer;
}
.tab-wrap button.active {
  border-color: #2ca39f;
  background: #e9f8f8;
  color: #2ca39f;
}

.form-box {
  background: #fff;
  padding: 20px;
  margin-top: 20px;
  border-radius: 8px;
  border: 1px solid #ddd;
}
.form-box h3 {
  margin-bottom: 10px;
  color: #333;
}
input,
select {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: none;
  border-bottom: 1px solid #ccc;
  outline: none;
}
/* 주소 입력 줄 */
.addr-row {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 8px;
  align-items: center;
}
.addr-actions {
  display: flex;
  gap: 6px;
}
.mini {
  padding: 8px 10px;
  border-radius: 6px;
  background: #2ca39f;
  color: #fff;
  border: none;
  cursor: pointer;
}
.mini.ghost {
  background: #ffffff;
  color: #2ca39f;
  border: 1px solid #2ca39f;
}
input:focus,
select:focus {
  border-color: #2ca39f;
}

.btn {
  width: 100%;
  padding: 14px;
  background: #2ca39f;
  color: white;
  border: none;
  border-radius: 8px;
  margin-top: 15px;
  font-size: 16px;
}
.btn:hover {
  background: #238c89;
}

/* 결제 레이아웃 */
.checkout {
  margin-top: 30px;
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
}
.summary {
  background: #f8f8f8;
  padding: 20px;
  border-radius: 8px;
}
.summary ul {
  list-style: none;
  padding: 0;
}
.summary .divider {
  height: 1px;
  background: #e6e6e6;
  margin: 12px 0 8px;
}
.benefits h4 {
  margin: 0 0 8px;
  font-size: 14px;
  color: #333;
}
.benefit-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
}
.benefit-row .inline {
  display: flex;
  gap: 8px;
  align-items: center;
  font-size: 14px;
}
.muted {
  color: #888;
}
.total-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 12px;
  padding-top: 8px;
  border-top: 1px dashed #ddd;
}
.total-row strong {
  color: #2ca39f;
  font-size: 18px;
}

.payment {
  background: #fff;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
}
.pay-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-top: 12px;
  margin-bottom: 8px;
}
.pay-card {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 14px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: #fff;
  cursor: pointer;
}
.pay-card:hover,
.pay-card:focus-visible {
  border-color: #2ca39f;
  outline: none;
}
.pay-card.selected {
  border-color: #2ca39f;
  background: #e9f8f8;
  color: #2ca39f;
}
.pay-card .icon {
  width: 28px;
  text-align: center;
}
.btn.primary {
  width: 100%;
}

/* 모바일 하단 고정 바 */
.mobile-checkout-bar {
  position: sticky;
  bottom: 0;
  display: none;
  background: #ffffffcc;
  backdrop-filter: saturate(180%) blur(10px);
  padding: 10px 12px;
  border-top: 1px solid #eee;
  gap: 12px;
  align-items: center;
}
.mobile-checkout-bar .price {
  font-weight: 800;
  color: #2ca39f;
}

@media (min-width: 860px) {
  .checkout {
    grid-template-columns: 1fr 1fr;
  }
}
@media (max-width: 600px) {
  .mobile-checkout-bar {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
}
</style>
