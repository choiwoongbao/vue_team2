import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import Information from "@/views/Information.vue";
import Information2 from "@/views/Information2.vue";
import Reservation from "@/views/Reservation.vue";

import ReserveForm from "@/components/reserv/ReserveForm.vue";
import Reser_check from "@/views/booking/Reser_check.vue";
import Complete from "@/views/booking/Complete.vue";

import Reservation2 from "@/views/Reservation_ui.vue";
import Promotion from "@/views/Promotion.vue";
import Community from "@/views/Community.vue";
import Community2 from "@/views/Community2.vue";
import Support from "@/views/Support.vue";
import Support2 from "@/views/Support2.vue";
import Support3 from "@/views/Support3.vue";
import Signup from "@/views/Signup.vue";
import Login from "@/views/Login.vue";
const routes = [
  { path: "/", component: HomeView },
  { path: "/information", component: Information },
  { path: "/information2", component: Information2 },
  { path: "/promotion", component: Promotion },

  { path: "/reservation", component: Reservation },

  { path: "/reserve", component: ReserveForm},
  {path: "/check", component:Reser_check},
  {path: "/complete", component: Complete},

  { path: "/reservation2", component: Reservation2 },
  { path: "/community", component: Community },
  { path: "/community2", component: Community2 },
  { path: "/login", component: Login },
  { path: "/signup", component: Signup },
  { path: "/support", component: Support },
  { path: "/support2", component: Support2 },
  { path: "/support3", component: Support3 },
];
// 라우터 만들기 (길 안내 지도 같은 것)
// createRouter() → "길을 만드는 도구"
const router = createRouter({
  // createWebHistory() → 브라우저 주소창에 /home , /about 같은 주소를 보여줌
  history: createWebHistory(), // 브라우저 주소 표시줄에 경로가 보이게 함 (깜짝 주소 안 쓰고 진짜 주소처럼 보이게!)

  // routes → 우리가 정해둔 길(페이지들)을 가져다 씀
  routes, // 경로 정의 ("/home" 가면 Home.vue , "/about" 가면 About.vue)
});

// 다른 파일에서도 이 router를 쓸 수 있게 내보내기
export default router;
