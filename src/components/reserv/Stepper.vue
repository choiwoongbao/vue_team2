<template>
  <nav class="stepper" aria-label="진행 단계">
    <ol>
      <li :class="{ active: currentStep >= 1 }">
        <span class="dot" aria-hidden="true"></span>
        <span class="label">사물함 예약</span>
      </li>
      <li :class="{ active: currentStep >= 2 }">
        <span class="connector" aria-hidden="true"></span>
        <span class="dot" aria-hidden="true"></span>
        <span class="label">확인 및 결제</span>
      </li>
      <li :class="{ active: currentStep >= 3 }">
        <span class="connector" aria-hidden="true"></span>
        <span class="dot" aria-hidden="true"></span>
        <span class="label">완료 확인</span>
      </li>
    </ol>
  </nav>
</template>

<script setup>
defineProps({ currentStep: { type: Number, default: 1 } });
</script>

<style scoped>
.stepper {
  display: flex;
  justify-content: center;
  margin: 8px 0 20px;
}
ol {
  display: flex;
  align-items: center;
  gap: 32px;
  list-style: none;
  padding: 0;
  margin: 0;
}
li {
  position: relative;
  display: flex;
  align-items: center;
  gap: 8px;
  color: #bbb;
}
.dot {
  width: 14px;
  height: 14px;
  background: #2ca39f;
  border-radius: 50%;
  display: inline-block;
  opacity: 0.5;
}
.connector {
  position: absolute;
  left: -24px;
  right: 24px;
  height: 2px;
  background: repeating-linear-gradient(
    90deg,
    #2ca39f 0 8px,
    transparent 8px 16px
  );
  top: 6px;
  opacity: 0.3;
}
.label {
  font-size: 12px;
}
li.active .dot {
  opacity: 1;
  box-shadow: 0 0 0 2px #9bd6d4 inset;
}
li.active .label {
  color: #333;
  font-weight: 600;
}
</style>
