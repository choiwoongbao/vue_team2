<template>
  <nav>
    <router-link to="/" class="logo">짐보따리</router-link>
    <div class="menu">
      <router-link to="/information" class="dropdown"
        >이용안내
        <ul class="submenu">
          <li><router-link to="/booknow">이용방법</router-link></li>
          <li><router-link to="/changebooking">요금안내</router-link></li>
        </ul>
      </router-link>
      <router-link to="/promotion">예약하기</router-link>
      <router-link to="/reservation">프로모션</router-link>
      <router-link to="/community" class="dropdown"
        >커뮤니티
        <ul class="submenu">
          <li><router-link to="/booknow">자유게시판</router-link></li>
          <li><router-link to="/changebooking">후기</router-link></li>
        </ul>
      </router-link>
      <router-link to="/support" class="dropdown"
        >고객센터
        <ul class="submenu">
          <li><router-link to="/booknow">자주하는 질문</router-link></li>
          <li><router-link to="/changebooking">공지사항</router-link></li>
          <li><router-link to="/booknow">문의하기</router-link></li>
        </ul>
      </router-link>
      <div class="login">
        <router-link to="/login">로그인</router-link>
        <router-link to="/signup">예약 확인</router-link>
      </div>
    </div>
  </nav>

  <!-- 390 hamburger button -->
</template>

<script setup></script>

<style scoped>
.logo {
  width: 10%;
  font-size: clamp(25px, 1vw, 30px);
  font-weight: 600;
  color: #028587;
  white-space: nowrap;
}

.menu {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: clamp(15px, 2vw, 30px);
  font-size: clamp(15px, 1vw, 20px);
}

.menu > a {
  color: #000000;
  font-weight: 500;
}

.menu > a:hover {
  color: #028587;
}

.login {
  padding-left: 2vw;
}

.login a {
  color: #a0a0a0;
  font-size: clamp(12px, 1vw, 15px);
}
.login > a:hover {
  color: #028587;
  font-weight: 500;
}

nav {
  position: relative;
  z-index: 9999;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: clamp(8px, 1vw, 20px);
  padding: 10px 5vw;
  border-bottom: 1px solid #e7e2e2;
}
nav a {
  text-decoration: none;
  padding: 5px 10px;
  color: inherit;
}
nav a:hover {
  border-radius: 5px;
}
.dropdown {
  position: relative;
}

.menu > .dropdown {
  position: relative;
  z-index: 1;
}
.dropdown:hover .submenu {
  display: block;
}
.submenu {
  padding: 3px;
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
  border: 1px solid #ddd;
  border-radius: 5px;
  min-width: 100px;
  background-color: #fff;
  z-index: 10000;
}
.submenu li {
  padding: 10px;
  white-space: nowrap;
}
.submenu li a {
  color: black;
}
.submenu li a:hover {
  color: #028587;
}

@media (max-width: 1000px) {
  .menu {
    gap: 10px;
  }
  .login {
    padding-left: 0;
  }
}
@media (max-width: 390px) {
}
</style>
