<template>
  <div class="res-inner">
    <!-- 상단 스텝 표시 -->
    <div class="stepper">
      <div class="step active">
        <div class="circle"></div>
        <p>예약 하기</p>
        <div class="dotline"></div>
      </div>

      <div class="step">
        <div class="circle"></div>
        <p>확인 및 결제</p>
        <div class="dotline"></div>
      </div>

      <div class="step">
        <div class="circle"></div>
        <p>변경 완료</p>
      </div>
    </div>
    <div class="reserve">
      <div class="res-boxs">
        <!--  하단 왼쪽 입력란 -->
        <div class="res-left">
          <div class="l-box">
            <h2>사물함 예약</h2>
          </div>
          <div class="res-lf-btn">
            <div class="btn-l">짐을 가져와 주세요</div>
            <div class="btn-r">집으로 배송해 주세요</div>
          </div>
        </div>
        <!-- 하단 오른쪽 표시란 -->
        <!-- <div class="res-right">
          <div class="r-box">
            <h2>선택 상품</h2>
          </div>
          <button>입력완료</button>
        </div> -->
      </div>
    </div>
  </div>
</template>
<script setup></script>
<style scoped lang="scss">
@use "/src/assets/style/variables" as *;
// 이너
.res-inner {
  width: 80%;
  margin: auto;
  background-color: antiquewhite;
}

// 상단 스텝 표시
.stepper {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4rem;
  margin: 3rem auto;
  position: relative;
}

.step {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  font-size: $text-md;
  color: #bbb;
  font-weight: 400;

  .circle {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 2px solid #bbb;
    background-color: #fff;
    margin-bottom: 0.5rem;
  }

  .dotline {
    position: absolute;
    top: 9px;
    right: -79px;
    width: 90px;
    height: 2px;
    border-top: 2px dotted #bbb;
  }

  &.active {
    color: #028587;
    font-weight: 600;

    .circle {
      border-color: #028587;
      background-color: #028587;
    }

    .line {
      border-top-color: #9fd3cf; /* 점선도 살짝 초록빛 */
    }
  }
}

// 하단 입력창들
.reserve {
  width: 100%;
  position: relative;
  .res-boxs {
    width: 80%;
    position: relative;
    display: flex;
    margin: auto;
    gap: 40px;
    .res-left {
      .l-box {
        width: 600px;
        background: #9fd3cf;
        border-radius: 10px;
        padding: 30px 50px;
        h2 {
          font-size: $text-lg;
        }
        &::after {
          position: absolute;
          top: 0;
          left: 0;
        }
      }
      .res-lf-btn {
        display: flex;
        gap: 20px;
        width: 600px;
        background-color: antiquewhite;
        .btn-l {
          width: 290px;
          border-radius: 10px;
          background-color: white;
          padding: 30px 50px;
        }
        .btn-r {
          width: 290px;
          border-radius: 10px;
          background-color: white;
          padding: 30px 50px;
        }
      }
    }
    .res-right {
      width: 500px;
      position: relative;
      border-radius: 10px;
      .r-box {
        width: 100%;
        background-color: #fff;
        border-radius: 10px;
        padding: 30px 50px;
      }
    }
  }
}
</style>
