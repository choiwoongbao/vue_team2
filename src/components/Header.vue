<!-- NavBar.vue -->
<template>
  <nav class="jb-nav" :class="{ 'is-open': isOpen }">
    <!-- Left: Logo -->
    <router-link to="/" class="logo" aria-label="홈으로 이동">짐보따리</router-link>

    <!-- Desktop Menu -->
    <div class="menu">
      <router-link class="dropdown"
        >이용안내
        <ul class="submenu">
          <li><router-link to="/information">이용방법</router-link></li>
          <li><router-link to="/information2">요금안내</router-link></li>
        </ul>
      </router-link>

      <router-link class="dropdown"
        >예약하기
        <ul class="submenu">
          <li><router-link to="/reservation">이용방법</router-link></li>
          <li><router-link to="/reservation2">요금안내</router-link></li>
        </ul>
      </router-link>

      <router-link to="/promotion">프로모션</router-link>

      <router-link class="dropdown"
        >커뮤니티
        <ul class="submenu">
          <li><router-link to="/community">자유게시판</router-link></li>
          <li><router-link to="/community2">후기</router-link></li>
        </ul>
      </router-link>

      <router-link class="dropdown"
        >고객센터
        <ul class="submenu">
          <li><router-link to="/support">자주하는 질문</router-link></li>
          <li><router-link to="/support2">공지사항</router-link></li>
          <li><router-link to="/support3">문의하기</router-link></li>
        </ul>
      </router-link>

      <div class="login">
        <router-link to="/login">로그인</router-link>
        <router-link to="/signup">예약 확인</router-link>
      </div>
    </div>

    <!-- Mobile Right: 로그인/예약확인 + 햄버거 -->
    <div class="nav-right">
      <div class="login-mini">
        <router-link to="/login">로그인</router-link>
        <router-link to="/signup">예약 확인</router-link>
      </div>

      <button
        class="hamburger"
        :aria-expanded="isOpen ? 'true' : 'false'"
        aria-controls="mobile-panel"
        @click="toggle()"
      >
        <span class="bar" />
        <span class="bar" />
        <span class="bar" />
        <span class="sr-only">메뉴 열기</span>
      </button>
    </div>
  </nav>

  <!-- Mobile Panel -->
  <transition name="slide">
    <aside
      v-show="isOpen"
      id="mobile-panel"
      class="mobile-panel"
      @click.self="close()"
    >
      <div class="panel-inner">
        <button class="panel-close" @click="close()" aria-label="메뉴 닫기">×</button>

        <ul class="mobile-list">
          <!-- 이용안내 (아코디언) -->
          <li>
            <button
              class="m-title-btn"
              :aria-expanded="section.guide"
              @click="toggleSection('guide')"
            >
              이용안내
              <span class="chev" :class="{ open: section.guide }" aria-hidden="true">⌄</span>
            </button>

            <transition name="acc">
              <div class="sublist" v-show="section.guide">
                <router-link to="/information" @click="close()">이용방법</router-link>
                <router-link to="/information2" @click="close()">요금안내</router-link>
              </div>
            </transition>
          </li>

          <!-- 예약하기 (아코디언: 예약/배송) -->
          <li>
            <button
              class="m-title-btn"
              :aria-expanded="section.reserve"
              @click="toggleSection('reserve')"
            >
              예약하기
              <span class="chev" :class="{ open: section.reserve }" aria-hidden="true">⌄</span>
            </button>

            <transition name="acc">
              <div class="sublist" v-show="section.reserve">
                <router-link to="/reservation" @click="close()">예약</router-link>
                <router-link to="/delivery" @click="close()">배송</router-link>
              </div>
            </transition>
          </li>

          <!-- 프로모션 (서브 없음) -->
          <li>
            <router-link to="/promotion" class="m-title link-title" @click="close()">프로모션</router-link>
          </li>

          <!-- 커뮤니티 (서브 없음) -->
          <li>
            <router-link to="/community" class="m-title link-title" @click="close()">커뮤니티</router-link>
          </li>

          <!-- 고객센터 (아코디언) -->
          <li>
            <button
              class="m-title-btn"
              :aria-expanded="section.support"
              @click="toggleSection('support')"
            >
              고객센터
              <span class="chev" :class="{ open: section.support }" aria-hidden="true">⌄</span>
            </button>

            <transition name="acc">
              <div class="sublist" v-show="section.support">
                <router-link to="/support" @click="close()">자주하는 질문</router-link>
                <router-link to="/support2" @click="close()">공지사항</router-link>
                <router-link to="/support3" @click="close()">문의하기</router-link>
              </div>
            </transition>
          </li>
        </ul>
      </div>
    </aside>
  </transition>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch, reactive } from 'vue'

const isOpen = ref(false)
const toggle = () => (isOpen.value = !isOpen.value)
const close = () => (isOpen.value = false)

/* 아코디언 상태 */
const section = reactive({ guide: false, reserve: false, support: false })
const toggleSection = (key) => (section[key] = !section[key])

/* ESC 닫기 + 스크롤 잠금 */
const onEsc = (e) => { if (e.key === 'Escape') close() }
onMounted(() => window.addEventListener('keydown', onEsc))
onBeforeUnmount(() => {
  window.removeEventListener('keydown', onEsc)
  document.documentElement.style.overflow = ''
  document.body.style.overflow = ''
})
watch(isOpen, (open) => {
  document.documentElement.style.overflow = open ? 'hidden' : ''
  document.body.style.overflow = open ? 'hidden' : ''
})
</script>

<style scoped>
/* ====== Base ====== */
.jb-nav {
  position: relative;
  z-index: 9999;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: clamp(8px, 1vw, 20px);
  padding: 10px 5vw;
  border-bottom: 1px solid #e7e2e2;
  line-height: 60px;
  background: #fff;
}

.logo {
  width: auto;
  font-size: clamp(30px, 3vw, 38px);
  font-weight: 600;
  color: #028587;
  white-space: nowrap;
  text-decoration: none;
}

.menu {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: clamp(15px, 2vw, 30px);
  font-size: clamp(15px, 1vw, 20px);
}

/* 타이틀 메뉴: 600 */
.menu > a,
.menu > .dropdown {
  color: #000;
  font-weight: 600;
  text-decoration: none;
  padding: 5px 10px;
  position: relative;
}
.menu > a:hover,
.menu > .dropdown:hover { color: #028587; }

.login { padding-left: 2vw; }
.login a {
  color: #a0a0a0;
  font-size: clamp(12px, 1vw, 15px);
  text-decoration: none;
}
.login > a:hover { color: #028587; font-weight: 500; }

/* ====== Desktop dropdown ====== */
.dropdown {
  position: relative;
  display: inline-flex;
  align-items: center;
}

/* 박스 위치: 한 번 더 위로(-2px) + 너비 축소 */
.dropdown .submenu {
  display: none;
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  margin-top: -2px;              /* ↑ 총 6px 위로 (이전보다 4px 추가로 위) */

  padding: 6px;
  border: 1px solid #ddd;
  border-radius: 10px;
  min-width: 160px;              /* 폭 줄임 */
  width: auto;                   /* 내용에 맞게 */
  background: #fff;
  z-index: 10001;
  box-shadow: 0 6px 18px rgba(0,0,0,.08);
  text-align: center;
}

.dropdown:hover .submenu { display: block; }

/* 항목: 한 줄 유지 + 간격/패딩 */
.submenu li { padding: 0; }
.submenu li a {
  display: block;
  padding: 12px 24px;
  line-height: 1.4;
  color: #000;
  text-decoration: none;
  font-weight: 400;

  white-space: nowrap;
  word-break: keep-all;
}
.submenu li a:hover { color: #028587; }

/* ====== Mobile Top Right ====== */
.nav-right { display: none; align-items: center; gap: 14px; }
.login-mini { display: flex; align-items: center; gap: 12px; }
.login-mini a { color: #6f6f6f; font-size: 14px; text-decoration: none; }
.login-mini a:hover { color: #028587; }

/* Hamburger */
.hamburger {
  width: 34px; height: 28px; display: inline-flex;
  flex-direction: column; justify-content: space-between; align-items: center;
  border: 0; background: transparent; cursor: pointer; padding: 2px;
}
.hamburger .bar {
  display: block; width: 100%; height: 3px;
  background: #444; border-radius: 2px;
  transition: transform .25s ease, opacity .25s ease;
}
.jb-nav.is-open .hamburger .bar:nth-child(1){ transform: translateY(9px) rotate(45deg); }
.jb-nav.is-open .hamburger .bar:nth-child(2){ opacity: 0; }
.jb-nav.is-open .hamburger .bar:nth-child(3){ transform: translateY(-9px) rotate(-45deg); }

/* ====== Mobile Panel ====== */
.mobile-panel {
  position: fixed; inset: 0;
  background: rgba(0,0,0,.35);
  z-index: 12000;
}
.panel-inner {
  position: absolute; top: 0; right: 0;
  width: min(78vw, 360px); height: 100%;
  background: #fff;
  box-shadow: -6px 0 16px rgba(0,0,0,.08);
  padding: 28px 22px;
  overflow-y: auto;
  z-index: 12001;
}
.panel-close {
  position: absolute; top: 8px; right: 10px;
  font-size: 28px; line-height: 1;
  background: transparent; border: none; cursor: pointer; color: #333;
}

/* Mobile (큰 제목/아코디언) */
.mobile-list { margin-top: 24px; display: flex; flex-direction: column; gap: 16px; }
.m-title-btn {
  width: 100%;
  display: flex; align-items: center; justify-content: space-between;
  font-size: 20px; font-weight: 700; color: #028587;
  background: transparent; border: 0; padding: 6px 0; cursor: pointer; text-align: left;
}
.chev { transition: transform .2s ease; display: inline-block; }
.chev.open { transform: rotate(180deg); }
.m-title.link-title {
  font-size: 20px; font-weight: 700; color: #028587; text-decoration: none; padding: 6px 0; display: inline-block;
}
.sublist { overflow: hidden; display: grid; gap: 8px; margin-left: 8px; padding: 4px 0 8px; }
.sublist a { font-size: 15px; color: #111; text-decoration: none; line-height: 1.7; }
.sublist a:hover { color: #028587; }

/* 트랜지션 */
.acc-enter-from, .acc-leave-to { max-height: 0; opacity: 0; }
.acc-enter-to,   .acc-leave-from { max-height: 300px; opacity: 1; }
.acc-enter-active, .acc-leave-active { transition: max-height .22s ease, opacity .22s ease; }
.slide-enter-from, .slide-leave-to { opacity: 0; }
.slide-enter-active, .slide-leave-active { transition: opacity .2s ease; }

/* ====== Responsive ====== */
@media (max-width: 1000px) {
  .menu { gap: 10px; }
  .login { padding-left: 0; }
}
@media (max-width: 767px) {
  .menu { display: none; }
  .nav-right { display: flex; }
  .logo { font-size: 28px; }
}
@media (max-width: 390px) {
  .login-mini { gap: 10px; }
  .login-mini a { font-size: 13px; }
}

/* a11y: 시각적 숨김 */
.sr-only {
  position: absolute !important;
  width: 1px; height: 1px; padding: 0; margin: -1px;
  overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; border: 0;
}

/* ≥768px: 데스크탑 정렬 유지 */
@media (min-width: 768px) {
  .nav-right { display: flex; align-items: center; gap: 14px; }
  .hamburger { display: none; }
  .login { display: none; }

  .menu { margin-left: auto; margin-right: 4vw; justify-content: flex-end; }
  .login-mini a { font-size: 14px; }
}
</style>
