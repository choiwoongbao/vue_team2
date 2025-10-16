<template>
  <div class="search-main">
    <section class="branch-search" role="search" aria-label="짐보따리 지점 찾기">
    <div class="inner">
      <!-- ⬅️ 일러스트(이미지) 들어갈 자리 -->
      <!--
        <img src="@/assets/your-illustration.png" alt="위치와 캐리어 일러스트" />
        권장 크기: 가로 220~260px
        위치: figure.illustration 안쪽
      -->
      <figure class="illustration"><!-- 이미지 자리 --></figure>

      <div class="content">
        <h1 class="title">짐보따리 지점 찾기</h1>
        <p class="subtitle">
          근처에 있는 짐보따리 보관소와 무인함 위치를 한눈에 확인할 수 있습니다.
        </p>

        <form class="searchbar" action="#" method="get">
          <label class="a11y" for="branchQuery">지점 검색</label>
          <input
            id="branchQuery"
            type="search"
            placeholder="도로명 주소를 입력해 주세요. (예: 강남대로 00)"
            autocomplete="off"
            inputmode="search"
          />
          <button class="cta" type="submit">가까운 지점 검색하기</button>
        </form>
      </div>
    </div>
  </section>
  </div>
  
</template>

<style scoped>
.search-main .branch-search {
  --mint: #028587;
  --mint-weak: #f4fbfb;
  --ink: #111111;
  --muted: #647074;
  --ring: rgba(2,133,135,.26);
  --radius: 12px;

  background: #fff;
  padding: clamp(60px, 7vw, 100px) 0;
}

.search-main .inner {
  width: 1320px;
  max-width: 100%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: clamp(24px, 3vw, 40px);
  padding: 0 20px;
}

/* 일러스트 자리 */
.search-main .illustration {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 250px;
  height: 180px;
  background: var(--mint-weak);
  border-radius: 16px;
  box-shadow: inset 0 0 0 1px #e7efef;
}

/* 텍스트 영역 */
.search-main .content {
  flex: 1;
  max-width: 600px;
}

.search-main .title {
  font-weight: 800;
  font-size: clamp(24px, 3.2vw, 32px);
  letter-spacing: -0.02em;
  color: var(--ink);
  margin-bottom: 8px;
}

.search-main .subtitle {
  font-size: clamp(14px, 1.3vw, 15px);
  color: var(--muted);
  margin-bottom: 20px;
}

/* 검색 바 */
.search-main .searchbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 560px;
  background: #fff;
  padding: 10px;
  border-radius: calc(var(--radius) + 4px);
  border: 1px solid #f0f3f3;
  box-shadow: 0 4px 24px rgba(0,0,0,0.06);
  gap: 10px;
}

.search-main .searchbar input {
  flex: 1;
  height: 46px;
  border: 1px solid #e7efef;
  border-radius: var(--radius);
  padding: 0 14px;
  font-size: 15px;
  outline: none;
  transition: border-color .15s ease, box-shadow .15s ease;
}

.search-main .searchbar input::placeholder {
  color: #9aa6a9;
}

.search-main .searchbar input:focus {
  border-color: var(--mint);
  box-shadow: 0 0 0 4px var(--ring);
}

.search-main .cta {
  flex-shrink: 0;
  height: 46px;
  padding: 0 18px;
  border: none;
  border-radius: var(--radius);
  background: var(--mint);
  color: #fff;
  font-weight: 700;
  font-size: 14px;
  cursor: pointer;
  transition: transform .06s ease, opacity .15s ease;
}
.search-main .cta:hover { opacity: .95; }
.search-main .cta:active { transform: translateY(1px) scale(.99); }

/* 접근성용 라벨 숨김 */
.search-main .a11y {
  position: absolute !important;
  width: 1px; height: 1px;
  margin: -1px; padding: 0; border: 0;
  clip: rect(0 0 0 0); overflow: hidden;
}

/* ✅ 반응형 수정 버전 */
@media (max-width: 768px) {
  .search-main .inner {
    flex-direction: column;
    text-align: center;
  }

  .search-main .illustration {
    width: 200px;
    height: 150px;
  }

  .search-main .content {
    max-width: 100%;
  }

  /* 💡 인풋 크기 확대 */
  .search-main .searchbar {
    flex-direction: column;
    max-width: 90%; /* 화면의 90%로 확장 */
    margin: 0 auto;
    padding: 12px;
  }

  .search-main .searchbar input {
    width: 100%;
    min-width: 260px;
    font-size: 15px;
  }

  .search-main .cta {
    width: 100%;
    height: 46px;
    margin-top: 8px;
  }
}
</style>
