<template>
  <div class="banner-main">
    <!-- 필요하면 여기에 네비 넣기 -->
    <!-- <nav class="site-nav"> ... </nav> -->

    <section class="main-banner hero-banner">
      <!-- 배너 (그림/카피 영역) -->
      <swiper
        class="mbannerSwiper"
        :modules="[Autoplay, Navigation]"
        :autoplay="{ delay: 2500, disableOnInteraction: false }"
        :navigation="true"
        :loop="true"
      >
        <swiper-slide>
          <img src="/public/images/promotion/mainbanner1.png" alt="mainbanner1" />
        </swiper-slide>
        <swiper-slide>
          <img src="/public/images/promotion/mainbanner1.png" alt="mainbanner2" />
        </swiper-slide>
        <swiper-slide>
          <img src="/public/images/promotion/mainbanner1.png" alt="mainbanner3" />
        </swiper-slide>
      </swiper>

      <!-- ✅ 떠 있는(겹치는) 검색바: 배너의 하단 중심에 살짝 겹치도록 배치 -->
      <div class="search-dock">
        <div class="search-bar" role="search" aria-label="보관/배송 검색" ref="dockRef">
          <!-- 1) 목적지 -->
          <div class="search-item" :class="{ active: openPanel === 'dest' }" @click="toggle('dest')">
            <label class="label">목적지 찾기</label>
            <input
              type="text"
              :value="destination || ''"
              :placeholder="destination ? '' : '어느 지역을 방문하시나요?'"
              readonly
            />
            <!-- 목적지 패널 -->
            <div v-if="openPanel === 'dest'" class="popover popover-dest" role="dialog" aria-label="목적지 선택">
              <div class="popover-header">추천 목적지</div>
              <div class="dest-list">
                <button v-for="s in suggestions" :key="s.id" class="dest-row" @click.stop="selectDestination(s.name)">
                  <span class="dest-icon" aria-hidden="true">🏙️</span>
                  <span class="dest-texts stack-left">
                    <strong>{{ s.name }}</strong>
                    <small>{{ s.sub }}</small>
                  </span>
                </button>
              </div>
            </div>
          </div>

          <!-- 2) 날짜 -->
          <div class="search-item" :class="{ active: openPanel === 'dates' }" @click="toggle('dates')">
            <label class="label">보관 기간</label>
            <input type="text" :value="dateLabel" placeholder="날짜 선택" readonly />

            <div
              v-if="openPanel === 'dates'"
              class="popover popover-dates"
              role="dialog"
              aria-label="날짜 선택"
              @keydown.esc.prevent.stop="close()"
            >
              <div class="date-tabs">
                <button class="chip" :class="{ on: dateTab === 'range' }" @click.stop="dateTab = 'range'">날짜 지정</button>
                <button class="chip" :class="{ on: dateTab === 'month' }" @click.stop="dateTab = 'month'">월 단위</button>
                <button class="chip" :class="{ on: dateTab === 'flex' }" @click.stop="dateTab = 'flex'">유연한 일정</button>
              </div>

              <div class="cal-head">
                <button class="nav-btn" @click.stop="prevMonth" aria-label="이전 달">‹</button>
                <div class="cal-title">{{ monthTitle(viewYear, viewMonth) }}</div>
                <div class="spacer"></div>
                <div class="cal-title">{{ monthTitle(nextYear, nextMonth) }}</div>
                <button class="nav-btn" @click.stop="nextMonthNav" aria-label="다음 달">›</button>
              </div>

              <div class="cal-2col">
                <Calendar
                  :year="viewYear"
                  :month="viewMonth"
                  :start="startDate"
                  :end="endDate"
                  :hover="hoverDate"
                  @pick="onPickDate"
                  @hover="hoverDate = $event"
                />
                <Calendar
                  :year="nextYear"
                  :month="nextMonth"
                  :start="startDate"
                  :end="endDate"
                  :hover="hoverDate"
                  @pick="onPickDate"
                  @hover="hoverDate = $event"
                />
              </div>

              <div class="date-actions">
                <button class="link-btn" @click.stop="clearDates">지우기</button>
                <div class="grow"></div>
                <button class="cta" :disabled="!startDate || !endDate" @click.stop="applyDates">적용</button>
              </div>
            </div>
          </div>

          <!-- 3) 짐 크기/개수 -->
          <div class="search-item" :class="{ active: openPanel === 'bags' }" @click="toggle('bags')">
            <label class="label">짐 크기/개수</label>
            <input type="text" :value="bagsLabel" placeholder="어떤 짐을 보관하시나요?" readonly />

            <div
              v-if="openPanel === 'bags'"
              class="popover popover-guests"
              role="dialog"
              aria-label="짐 크기/개수 선택"
              @keydown.esc.prevent.stop="close()"
            >
              <div v-for="row in bagRows" :key="row.key" class="guest-row">
                <div class="guest-txt stack-left">
                  <strong>{{ row.title }}</strong>
                  <small>{{ row.desc }}</small>
                </div>
                <div class="guest-ctrl">
                  <button class="circle" :disabled="counters[row.key] === 0" @click.stop="dec(row.key)">−</button>
                  <span class="count">{{ counters[row.key] }}</span>
                  <button class="circle" @click.stop="inc(row.key)">＋</button>
                </div>
              </div>

              <div class="date-actions">
                <button class="link-btn" @click.stop="resetBags">지우기</button>
                <div class="grow"></div>
                <button class="cta" @click.stop="applyBags">적용</button>
              </div>
            </div>
          </div>

          <!-- 검색 버튼 -->
          <button class="search-btn" aria-label="검색" @click="submit">
            <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
              <path
                d="M21 21l-4.4-4.4M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Z"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>

    <!-- 배너 아래 콘텐츠가 겹치지 않도록 여백 확보 -->
    <div class="hero-bottom-spacer" aria-hidden="true"></div>
  </div>
</template>

<script setup>
/* -------------------- Swiper (배너) -------------------- */
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";

/* -------------------- SearchBarOnly (그대로) -------------------- */
import { ref, reactive, computed } from "vue";

/* 패널 열기/닫기 */
const openPanel = ref(null);
const dockRef = ref();
function toggle(which) { openPanel.value = openPanel.value === which ? null : which; }
function close() { openPanel.value = null; }

/* 목적지 */
const destination = ref("");
const suggestions = [
  { id: 1, name: "부산", sub: "해변으로 인기 있는 곳" },
  { id: 2, name: "광안리해수욕장, 부산", sub: "해변의 매력을 느낄 수 있는 곳" },
  { id: 3, name: "강릉시, 강원도", sub: "자연을 만끽하기 좋은 곳" },
  { id: 4, name: "속초시, 강원도", sub: "호수로 인기 있는 곳" },
  { id: 5, name: "오사카시, 일본", sub: "관광 명소: 오사카성" },
  { id: 6, name: "전주시, 전라북도", sub: "다이닝을 즐기기 좋은 곳" },
];
function selectDestination(name) { destination.value = name; close(); }

/* 날짜 범위 */
const dateTab = ref("range");
const startDate = ref(null);
const endDate = ref(null);
const hoverDate = ref(null);

const today = new Date();
const viewYear = ref(today.getFullYear());
const viewMonth = ref(today.getMonth());
const nextYear = computed(() => (viewMonth.value === 11 ? viewYear.value + 1 : viewYear.value));
const nextMonth = computed(() => (viewMonth.value === 11 ? 0 : viewMonth.value + 1));

function monthTitle(y, m) { return `${y}년 ${m + 1}월`; }
function prevMonth() { viewMonth.value === 0 ? ((viewMonth.value = 11), viewYear.value--) : viewMonth.value--; }
function nextMonthNav() { viewMonth.value === 11 ? ((viewMonth.value = 0), viewYear.value++) : viewMonth.value++; }

function onPickDate(d){
  if (!startDate.value || (startDate.value && endDate.value)) { startDate.value=d; endDate.value=null; }
  else if (d < startDate.value) { endDate.value = startDate.value; startDate.value = d; }
  else { endDate.value = d; }
}
function clearDates(){ startDate.value=null; endDate.value=null; hoverDate.value=null; }
function applyDates(){ close(); }
function fmt(d){ return `${d.getMonth()+1}월 ${d.getDate()}일`; }
const dateLabel = computed(() =>
  startDate.value && endDate.value ? `${fmt(startDate.value)} - ${fmt(endDate.value)}`
  : startDate.value ? `${fmt(startDate.value)} - ...` : ""
);

/* 짐 크기/개수 */
const counters = reactive({ small:0, medium:0, large:0, box:0 });
const bagRows = [
  { key:"small", title:"소형 가방", desc:"기내용 백팩·토트" },
  { key:"medium", title:"중형 캐리어", desc:"24~26인치" },
  { key:"large", title:"대형 캐리어", desc:"27인치 이상" },
  { key:"box", title:"박스/기타", desc:"상자·특수물품" },
];
const inc = k => counters[k]++;
const dec = k => counters[k] && counters[k]--;
const resetBags = () => { Object.keys(counters).forEach(k=>counters[k]=0); };
const applyBags = () => close();
const bagsLabel = computed(()=>{
  const p=[]; if(counters.small)p.push(`소형 ${counters.small}`);
  if(counters.medium)p.push(`중형 ${counters.medium}`);
  if(counters.large)p.push(`대형 ${counters.large}`);
  if(counters.box)p.push(`박스 ${counters.box}`);
  return p.join(" · ");
});

/* 제출 (데모) */
function submit(){
  console.log("검색 파라미터", {
    destination: destination.value,
    start: startDate.value && startDate.value.toISOString().slice(0,10),
    end: endDate.value && endDate.value.toISOString().slice(0,10),
    bags: { ...counters }
  });
}

/* 로컬 Calendar 컴포넌트 */
const Calendar = {
  name: "Calendar",
  props: { year:Number, month:Number, start:Date, end:Date, hover:Date },
  emits: ["pick","hover"],
  computed: {
    grid(){
      const first = new Date(this.year, this.month, 1);
      const startIdx = (first.getDay()+6)%7;
      const daysInMonth = new Date(this.year, this.month+1, 0).getDate();
      const cells=[]; for(let i=0;i<startIdx;i++) cells.push(null);
      for(let d=1; d<=daysInMonth; d++) cells.push(new Date(this.year, this.month, d));
      while(cells.length % 7 !== 0) cells.push(null);
      return cells;
    }
  },
  methods: {
    isSame(a,b){ return a && b && a.toDateString()===b.toDateString(); },
    inRange(d){ return this.start && this.end && d>=this.start && d<=this.end; },
    hovering(d){
      if(!this.start || this.end || !this.hover) return false;
      const [min,max] = this.hover>this.start ? [this.start,this.hover] : [this.hover,this.start];
      return d>=min && d<=max;
    }
  },
  template: `
    <div class="cal">
      <div class="cal-grid">
        <div class="dow" v-for="d in ['일','월','화','수','목','금','토']" :key="d">{{ d }}</div>
        <button
          v-for="(cell,i) in grid" :key="i"
          class="day"
          :class="{empty:!cell, start: cell && isSame(cell,start),
                   end: cell && isSame(cell,end), inrange: cell && inRange(cell),
                   hovering: cell && hovering(cell)}"
          :disabled="!cell"
          @mouseenter="$emit('hover', cell)"
          @focus="$emit('hover', cell)"
          @click="$emit('pick', cell)"
        >
          <span v-if="cell">{{ cell.getDate() }}</span>
        </button>
      </div>
    </div>`
};
</script>

<style scoped>
/* ============ 네임스페이스: .banner-main 하위로 한정 ============ */

/* -------------------- 배너 기본 -------------------- */
.banner-main .main-banner{
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  /* ✅ 겹치기용 기준점 */
  position: relative;
  background: #f3f3f3; /* 배너 배경 톤 (이미지 있을 때는 거의 안 보임) */
}
.banner-main .main-banner img{
  width: 100%;
  max-width: 1920px;
  height: auto;
  display: block;
  object-fit: cover;
}

/* Swiper 네비게이션(네임스페이스 포함) */
:deep(.banner-main .swiper-button-prev),
:deep(.banner-main .swiper-button-next){
  color: #b8b3b3;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  font-weight: bold;
  transition: all 0.3s ease;
}
:deep(.banner-main .swiper-button-prev){ left: 4%; }
:deep(.banner-main .swiper-button-next){ right: 4%; }

/* -------------------- 겹치는 서치바 포지셔닝 -------------------- */
.banner-main .search-dock{
  --overlap: 40%;                /* 얼마나 아래로 겹칠지 (퍼센트 = 자기 높이 기준) */
  position: absolute;
  left: 50%;
  bottom: 0;
  transform: translate(-50%, var(--overlap));
  width: 100%;
  max-width: 1320px;
  padding: 0 24px;
  z-index: 20;                   /* 배너보다 위 */
  pointer-events: none;          /* 겹친 상태에서도 바깥 클릭 버그 방지 */
}
.banner-main .search-dock > .search-bar{ pointer-events: auto; }

/* -------------------- SearchBarOnly (원본 유지, 위치만 네임스페이스) -------------------- */
.banner-main .search-bar{
  background:#fff; border:1.5px solid #e5e7eb; border-radius:9999px;
  box-shadow:0 10px 30px rgba(0,0,0,.1); padding:12px 14px;
  display:grid; align-items:center;
  grid-template-columns: 1.05fr 0.9fr 0.95fr auto; gap:0;
  position:relative; overflow:visible; z-index:10;
}

/* 항목 */
.banner-main .search-item{
  padding:14px 22px; position:relative; display:grid;
  grid-auto-rows:min-content; align-content:center;
  min-height:50px; cursor:pointer; z-index:11;
}
.banner-main .search-item:not(:first-child)::before{
  content:""; position:absolute; left:0; top:12px; bottom:12px; width:1px; background:#e5e7eb;
}
.banner-main .search-item.active{ background:#f7f7f8; z-index:20; }

/* 텍스트 */
.banner-main .label{ font-size:13px; font-weight:700; color:#2b2b2b; margin:0 0 3px; line-height:1; text-align:left; }
.banner-main input{
  border:none; outline:none; font-size:15px; color:#4b5563; padding:0; width:100%;
  background:transparent; text-align:left;
}
.banner-main input::placeholder{ color:#a3a3a3; }

/* 버튼 */
.banner-main .search-btn{
  width:50px; height:50px; border:none; border-radius:50%; background:#028587; color:#fff;
  display:inline-flex; align-items:center; justify-content:center; cursor:pointer;
  margin-left:10px; box-shadow:0 6px 16px rgba(2,133,135,.25);
  transition:background .2s ease, transform .05s ease;
}
.banner-main .search-btn:hover{ background:#019d9f; }
.banner-main .search-btn:active{ transform:translateY(1px); }

/* Popover 공통 */
.banner-main .popover{
  position:absolute; left:22px; right:22px; top:calc(100% + 12px);
  background:#fff; border-radius:22px; box-shadow:0 20px 50px rgba(0,0,0,.15);
  border:1px solid #eee; padding:14px; z-index:30;
}

/* 목적지 */
.banner-main .popover-dest{ max-height:420px; overflow:auto; }
.banner-main .popover-header{ font-weight:700; padding:8px 10px 14px; }
.banner-main .dest-list{ display:flex; flex-direction:column; gap:6px; }
.banner-main .dest-row{
  display:flex; align-items:center; gap:12px; padding:10px 12px; border-radius:12px; width:100%;
  border:1px solid transparent; background:#fff; cursor:pointer;
}
.banner-main .dest-row:hover{ background:#f7f7f8; border-color:#eee; }
.banner-main .dest-icon{
  width:36px; height:36px; flex:0 0 36px; border-radius:10px; display:flex; align-items:center; justify-content:center; background:#eef2f7;
}
.banner-main .dest-texts{ min-width:0; }

/* 날짜 */
.banner-main .popover-dates{ padding:18px 18px 12px; }
.banner-main .date-tabs{ display:flex; gap:8px; padding:0 4px 10px; }
.banner-main .chip{ border:none; background:#f2f3f5; border-radius:999px; padding:8px 14px; font-weight:600; cursor:pointer; }
.banner-main .chip.on{ background:#fff; border:1px solid #e6e7ea; box-shadow:0 2px 6px rgba(0,0,0,.04); }

.banner-main .cal-head{ display:grid; grid-template-columns:auto 1fr 1fr auto; align-items:center; gap:10px; padding:6px 4px; }
.banner-main .cal-title{ text-align:center; font-weight:700; }
.banner-main .nav-btn{ width:36px; height:36px; border:none; border-radius:999px; background:#f2f3f5; cursor:pointer; }
.banner-main .cal-2col{ display:grid; grid-template-columns:1fr 1fr; gap:16px; padding-top:6px; }

.banner-main .cal{ background:#fff; border-radius:16px; }
.banner-main .cal-grid{ display:grid; grid-template-columns:repeat(7,1fr); gap:4px; padding:8px; }
.banner-main .dow{ text-align:center; font-weight:700; color:#777; padding:6px 0; }
.banner-main .day{ height:40px; border:none; border-radius:10px; background:#fff; cursor:pointer; position:relative; }
.banner-main .day.empty{ background:transparent; cursor:default; }
.banner-main .day:hover:not(.empty){ background:#f6f7f9; }
.banner-main .day.inrange{ background:#e6f6f6; }
.banner-main .day.start, .banner-main .day.end{ background:#028587; color:#fff; }
.banner-main .day.hovering{ background:#effcfc; }

/* 짐(게스트) */
.banner-main .popover-guests{ padding:12px; min-width:420px; }
.banner-main .guest-row{ display:flex; align-items:center; justify-content:space-between; gap:12px; padding:14px 8px; border-bottom:1px solid #f0f0f0; }
.banner-main .guest-row:last-child{ border-bottom:none; }
.banner-main .guest-txt{ min-width:0; }
.banner-main .guest-ctrl{ display:flex; align-items:center; gap:12px; }
.banner-main .circle{ width:36px; height:36px; border-radius:50%; border:1px solid #e1e1e5; background:#fff; cursor:pointer; }
.banner-main .circle:disabled{ opacity:.4; cursor:not-allowed; }
.banner-main .count{ width:22px; text-align:center; }

/* 하단 액션 */
.banner-main .date-actions{ display:flex; align-items:center; gap:10px; padding:12px 4px 2px; }
.banner-main .link-btn{ background:transparent; border:none; color:#6b7280; text-decoration:underline; cursor:pointer; }
.banner-main .grow{ flex:1; }
.banner-main .cta{ padding:10px 16px; border:none; border-radius:12px; background:#111; color:#fff; font-weight:700; cursor:pointer; }
.banner-main .cta:disabled{ opacity:.5; cursor:not-allowed; }

/* 공통 유틸 */
.banner-main .stack-left{
  display:grid;
  grid-auto-rows:min-content;
  row-gap:2px;
  justify-items:start;
}
.banner-main .stack-left > *{
  margin:0;
  text-align:left;
  padding-left:0;
}

/* -------------------- 배너 아래 여백 -------------------- */
.banner-main .hero-bottom-spacer{
  height: 80px; /* 필요하면 조정 (서치바 높이/overlap에 따라) */
}

/* -------------------- 반응형(필요 최소한) -------------------- */
@media (max-width: 960px){
  .banner-main .search-bar{
    grid-template-columns: 1fr;
    row-gap: 6px;
    border-radius: 20px;
  }
  .banner-main .search-item:not(:first-child)::before{ display:none; }
  .banner-main .search-dock{ --overlap: 30%; padding: 0 16px; }
  .banner-main .hero-bottom-spacer{ height: 100px; }
}
@media (max-width: 560px){
  .banner-main .search-dock{ --overlap: 20%; }
  .banner-main .hero-bottom-spacer{ height: 110px; }
}
</style>

