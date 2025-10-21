<template>
  <div class="res-inner">
    <!-- ✅ 상단 스텝 표시 -->
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

    <!-- ✅ 예약 입력 영역 -->
    <div class="reservation_page">
      <div class="container">
        <!-- 왼쪽 입력란 -->
        <div class="left">
          <div class="form_card">
            <h2 class="card_title">사물함 예약</h2>

            <div class="form_group">
              <label>성함*</label>
              <input type="text" placeholder="성함을 입력해주세요" />
            </div>

            <div class="form_group">
              <label>휴대폰 번호*</label>
              <input type="text" placeholder="01012345678 (- 제외)" />
            </div>

            <div class="form_group">
              <label>사물함 사이즈*</label>
              <select>
                <option value="">사이즈를 선택해 주세요</option>
                <option>S</option>
                <option>M</option>
                <option>L</option>
                <option>XL</option>
              </select>
            </div>

            <div class="form_group">
              <label>대여 장소*</label>
              <input type="text" placeholder="지번 및 주소를 입력해주세요" />
            </div>

            <div class="form_group">
              <label>예약 날짜*</label>
              <input type="date" />
            </div>
          </div>

          <!-- 하단 카드 -->
          <div class="bottom_cards">
            <div class="mini_card">
              <p>여행 전 미리<br />짐을 가져와 주세요</p>
            </div>
            <div class="mini_card">
              <p>끝나면 바로<br />집으로 배송해주세요</p>
            </div>
          </div>
        </div>

        <!-- 오른쪽 요약 -->
        <div class="right">
          <div class="summary_card">
            <h2 class="card_title">선택 상품</h2>
            <table>
              <tr>
                <td>선택상품</td>
                <td>사물함 대여</td>
              </tr>
              <tr>
                <td>상세</td>
                <td>S</td>
              </tr>
              <tr>
                <td>선택 기간</td>
                <td>2일 4시간</td>
              </tr>
              <tr class="total">
                <td>총 결제금액</td>
                <td><strong>29,000원</strong></td>
              </tr>
            </table>
            <button class="submit_btn">입력완료</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style scoped lang="scss">
@use "/src/assets/style/variables" as *;

/* ✅ 기본 설정 */
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap");

.res-inner {
  width: 80%;
  margin: auto;
  background-color: antiquewhite;
  font-family: "Inter", "Pretendard", sans-serif;
  color: #333;
}

/* ✅ 상단 스텝 표시 */
.stepper {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4rem;
  margin: 3rem auto;
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

    .dotline {
      border-top-color: #9fd3cf;
    }
  }
}

/* ✅ 예약 입력 카드 스타일 */
$main: #53b4a1;
$line: #e7e7e7;
$bg: #f5f7f7;
$shadow: 0 4px 12px rgba(0, 0, 0, 0.05);

$reserve-left-width: 600px;
$reserve-right-width: 500px;
$reserve-gap: 40px;
$reserve-padding-y: 30px;
$reserve-padding-x: 50px;
$reserve-radius: 8px;

.reservation_page {
  background: $bg;
  padding: 80px 0;

  .container {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    gap: $reserve-gap;
    width: calc($reserve-left-width + $reserve-right-width + $reserve-gap);
    margin: 0 auto;
  }

  /* 왼쪽 입력 카드 */
  .left {
    width: $reserve-left-width;
    display: flex;
    flex-direction: column;
    gap: 20px;

    .form_card {
      position: relative;
      background: #fff;
      border-radius: $reserve-radius;
      box-shadow: $shadow;
      padding: $reserve-padding-y $reserve-padding-x;

      &::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 8px;
        background: $main;
        border-top-left-radius: $reserve-radius;
        border-top-right-radius: $reserve-radius;
      }

      .card_title {
        font-size: 18px;
        font-weight: 600;
        margin: 12px 0 24px;
      }

      .form_group {
        display: flex;
        flex-direction: column;
        margin-bottom: 20px;

        label {
          font-size: 14px;
          color: #555;
          margin-bottom: 6px;
        }

        input,
        select {
          border: none;
          border-bottom: 1px solid $line;
          font-size: 14px;
          color: #333;
          padding: 10px 4px;
          background: transparent;
          outline: none;
          transition: border 0.2s ease;

          &:focus {
            border-color: $main;
          }
        }

        input[type="date"] {
          color: #666;
        }
      }
    }

    .bottom_cards {
      display: flex;
      justify-content: space-between;
      gap: 20px;

      .mini_card {
        flex: 1;
        background: #fff;
        border-radius: $reserve-radius;
        box-shadow: $shadow;
        text-align: center;
        font-size: 15px;
        color: #444;
        line-height: 1.5;
        padding: $reserve-padding-y $reserve-padding-x;
      }
    }
  }

  /* 오른쪽 요약 카드 */
  .right {
    width: $reserve-right-width;

    .summary_card {
      position: relative;
      background: #fff;
      border-radius: $reserve-radius;
      box-shadow: $shadow;
      padding: $reserve-padding-y $reserve-padding-x;

      &::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 8px;
        background: $main;
        border-top-left-radius: $reserve-radius;
        border-top-right-radius: $reserve-radius;
      }

      .card_title {
        font-size: 18px;
        font-weight: 600;
        margin: 12px 0 20px;
      }

      table {
        width: 100%;
        font-size: 14px;
        color: #555;
        border-collapse: collapse;
        margin-bottom: 24px;

        tr {
          display: flex;
          justify-content: space-between;
          padding: 8px 0;
          border-bottom: 1px solid $line;

          &:last-child {
            border-bottom: none;
          }

          &.total {
            font-weight: 600;
            color: #222;
          }
        }
      }

      .submit_btn {
        width: 100%;
        background: $main;
        color: #fff;
        border: none;
        border-radius: 6px;
        font-weight: 600;
        font-size: 15px;
        padding: 14px 0;
        cursor: pointer;
        transition: 0.3s;

        &:hover {
          background: darken($main, 8%);
        }
      }
    }
  }

  /* 반응형 */
  @media (max-width: 1080px) {
    .container {
      flex-direction: column;
      width: 90%;
      align-items: center;
      gap: 30px;
    }

    .left,
    .right {
      width: 100%;
      max-width: 600px;
    }

    .bottom_cards {
      flex-direction: column;
    }
  }
}
</style>
