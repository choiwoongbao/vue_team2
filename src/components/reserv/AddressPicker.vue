<template>
  <div
    v-if="open"
    class="addr-modal"
    role="dialog"
    aria-modal="true"
    aria-labelledby="addr-title"
  >
    <div class="dialog">
      <div class="header">
        <h3 id="addr-title">주소 선택</h3>
        <button class="icon-btn" @click="$emit('close')" aria-label="닫기">
          ✕
        </button>
      </div>

      <div class="mode-tabs" role="tablist">
        <button
          role="tab"
          :aria-selected="mode === 'search'"
          :class="{ active: mode === 'search' }"
          @click="mode = 'search'"
        >
          지도/주소 검색
        </button>
        <button
          role="tab"
          :aria-selected="mode === 'manual'"
          :class="{ active: mode === 'manual' }"
          @click="mode = 'manual'"
        >
          직접 입력
        </button>
      </div>

      <div v-show="mode === 'search'" class="content">
        <div ref="postcodeWrap" class="postcode-wrap"></div>
        <p class="hint">검색 후 결과를 클릭하면 주소가 자동 입력됩니다.</p>
        <div v-if="hasKakaoKey" class="map-wrap">
          <div ref="mapEl" class="map"></div>
          <p class="hint">지도를 드래그해 위치를 조정할 수 있습니다.</p>
        </div>
      </div>

      <div v-show="mode === 'manual'" class="content">
        <input
          v-model="localAddress"
          placeholder="상세 주소까지 입력해 주세요"
          @keydown.enter.prevent="confirm"
        />
      </div>

      <div class="footer">
        <button class="btn" @click="confirm" :disabled="!localAddress">
          확인
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from "vue";

const props = defineProps({
  modelValue: { type: String, default: "" },
  open: { type: Boolean, default: false },
});
const emit = defineEmits(["update:modelValue", "close", "selected"]);

const mode = ref("search");
const localAddress = ref("");

watch(
  () => props.open,
  (v) => {
    if (v) {
      localAddress.value = props.modelValue || "";
      mountPostcode();
    }
  }
);

const postcodeWrap = ref(null);
const mapEl = ref(null);
const hasKakaoKey = Boolean(import.meta.env.VITE_KAKAO_MAP_APP_KEY);
let map, marker, geocoder;

function confirm() {
  if (!localAddress.value) return;
  emit("update:modelValue", localAddress.value);
  emit("selected", localAddress.value);
  emit("close");
}

function loadScript(src) {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) return resolve();
    const s = document.createElement("script");
    s.src = src;
    s.onload = () => resolve();
    s.onerror = reject;
    document.head.appendChild(s);
  });
}

async function mountPostcode() {
  // 다음 주소검색
  await loadScript(
    "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"
  );
  // eslint-disable-next-line no-undef
  const Postcode = new window.daum.Postcode({
    oncomplete: (data) => {
      const addr = data.roadAddress || data.address;
      localAddress.value = addr;
      if (hasKakaoKey) moveMapTo(addr);
    },
    width: "100%",
    height: "420px",
  });
  Postcode.embed(postcodeWrap.value);

  // Kakao 지도(선택)
  if (hasKakaoKey) {
    const key = import.meta.env.VITE_KAKAO_MAP_APP_KEY;
    await loadScript(
      `//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=${key}&libraries=services`
    );
    // eslint-disable-next-line no-undef
    window.kakao.maps.load(() => {
      // eslint-disable-next-line no-undef
      geocoder = new window.kakao.maps.services.Geocoder();
      // eslint-disable-next-line no-undef
      map = new window.kakao.maps.Map(mapEl.value, {
        center: new window.kakao.maps.LatLng(37.4979, 127.0276),
        level: 4,
      });
      // eslint-disable-next-line no-undef
      marker = new window.kakao.maps.Marker({ position: map.getCenter() });
      marker.setMap(map);
      window.kakao.maps.event.addListener(map, "dragend", () => {
        marker.setPosition(map.getCenter());
      });
      if (localAddress.value) moveMapTo(localAddress.value);
    });
  }
}

function moveMapTo(address) {
  if (!geocoder || !map) return;
  geocoder.addressSearch(address, (results, status) => {
    // eslint-disable-next-line no-undef
    if (status === window.kakao.maps.services.Status.OK) {
      const { x, y } = results[0];
      // eslint-disable-next-line no-undef
      const latlng = new window.kakao.maps.LatLng(y, x);
      map.setCenter(latlng);
      marker.setPosition(latlng);
    }
  });
}

onMounted(() => {
  if (props.open) mountPostcode();
});
</script>

<style scoped>
.addr-modal {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}
.dialog {
  width: min(720px, 92vw);
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  border-bottom: 1px solid #eee;
}
.icon-btn {
  background: transparent;
  border: none;
  font-size: 18px;
  cursor: pointer;
}
.mode-tabs {
  display: flex;
  gap: 8px;
  padding: 10px 12px;
  border-bottom: 1px solid #f0f0f0;
}
.mode-tabs button {
  flex: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: #fff;
  cursor: pointer;
}
.mode-tabs button.active {
  border-color: #2ca39f;
  background: #e9f8f8;
  color: #2ca39f;
}
.content {
  padding: 12px;
}
.postcode-wrap {
  width: 100%;
  min-height: 420px;
  border: 1px solid #eee;
  border-radius: 8px;
  overflow: hidden;
}
.map-wrap {
  margin-top: 10px;
}
.map {
  width: 100%;
  height: 200px;
  border-radius: 8px;
  border: 1px solid #eee;
}
.hint {
  color: #888;
  font-size: 12px;
  margin: 8px 2px;
}
.footer {
  padding: 12px;
  border-top: 1px solid #f0f0f0;
}
.btn {
  width: 100%;
  padding: 12px;
  background: #2ca39f;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 16px;
}
</style>
