<template>
  <div class="home">
    
      <div class="hero">

        <div class="hero__wrapper">
          <header class="hero__header container">
            <img src="../assets/Logo_light.png" alt="logo" class="hero__brand">
            <div class="hero__nav" :class="{'active': resMenu}">

              <li class="hero__item">
                <a href="/" class="hero__link">
                  Trang chủ
                </a>
              </li>
              <li class="hero__item">
                <a href="#" class="hero__link">
                  Hướng dẫn
                </a>
              </li>
              <li class="hero__item">
                <a href="/auth/login" class="hero__link">
                  Đăng nhập
                </a>
              </li>
              <li class="hero__item">
                <a href="/auth/signup" class="hero__link register">
                  Đăng kí
                </a>
              </li>
            </div>
            <div class="hero__res" @click="resMenu=!resMenu">
              <svg>
                <use xlink:href="../assets/hero.svg#icon-stack"></use>
              </svg>
            </div>
          </header>

          <div class="hero__content container">
            <div class="hero__left">
              <div class="hero__heading">
                <h4>
                  <span class="hero__heading--post">POST</span> 
                  <span class="hero__heading--camps">CAMPS</span>
                  <span> - Nền tảng</span>
                </h4>
                <h5>Email marketing chuyên nghiệp</h5>
              </div>
              <p class="hero__subtitle">
                Đăng kí ngay từ bây giờ bạn sẽ được tặng 5 ngày dùng thử các dịch vụ của chúng tôi
                một cách hoàn toàn miễn phí. Click vào nút bên dưới để trải nghiệm ngay
              </p>      
              <router-link to="/auth/signup" class="hero__btn" tag="btn">
                Đăng kí ngay!
              </router-link>   
            </div>
            <div class="hero__right">
              <img src="../assets/display.png" alt="display" class="hero__display">
            </div>
          </div>
        </div>
        <!-- ******************* BENEFIT HERE *********************** -->
        <div class="benefit">
          <div class="container benefit__wrap">
            <div class="benefit__title">
              <img src="../assets/logo_small.png" alt="logo">
              <div class="benefit__heading">
                <h4>tại sao chọn postcamps</h4>
                <p>Tham gia cùng chúng tôi ngay từ bây giờ để nhận được các lợi ích to lớn,
                   một công cụ đắc lực trong việc triển khai các chiến dịch email marketing</p>
              </div>
            </div>

              <div class="benefit__content">
                <div class="benefit__left">

                  <div class="benefit__card">
                    <h5>
                      Tiện lợi dễ sử dụng
                    </h5>
                    <p>
                      Chúng tôi đem lại cho các bạn những trải nghiệm tuyệt vời nhất 
                      với hệ thống lập email step-by-step vô cùng dễ sử dụng dù cho là
                      với người mới bắt đầu, cùng với đó là lượng template đồ sộ và dễ 
                      dàng áp dụng trong nhiều tình huống khác nhau.
                    </p>
                    <span class="benefit__icon">
                      <svg>
                        <use xlink:href="../assets/hero.svg#icon-meter"></use>
                      </svg>
                    </span>
                  </div>
                  <div class="benefit__card">
                    <h5>
                      Hướng dẫn đầy đủ
                    </h5>
                    <p>
                      Phần hướng dẫn của chúng tôi là sự kết hợp của việc sử dụng hình 
                      ảnh, chữ và video, giúp các bạn nhanh chóng nắm được các concepts và 
                      chiến lượt tạo ra các campaign dễ dàng và hiệu quả trên nền tảng 
                      <strong>POSTCAMPS</strong>.
                    </p>
                    <span class="benefit__icon">
                      <svg>
                        <use xlink:href="../assets/hero.svg#icon-book"></use>
                      </svg>
                    </span>
                  </div>

                </div>
                <div class="benefit__right">

                  <div class="benefit__card">
                    <h5>
                      Giá cả hợp lý
                    </h5>
                    <p>
                      Chúng tôi cung cấp nhiều gói dịch vụ khác nhau phù hợp với nhiều nhu cầu 
                      khác nhau từ khách hàng và tất nhiên là chi phí mà họ phải bỏ ra. Chúng tôi 
                      đảm bảo khách hàng sẽ luôn sử dụng được dịch vụ với chất lượng cao cùng chi 
                      phí hợp lý nhất.
                    </p>
                    <span class="benefit__icon">
                      <svg>
                        <use xlink:href="../assets/hero.svg#icon-pig"></use>
                      </svg>
                    </span>
                  </div>
                  <div class="benefit__card">
                    <h5>
                      Hỗ trợ kỹ thuật 24/7
                    </h5>
                    <p>
                      Nếu các bạn không hài lòng với các bảng hướng dẫn online hoặc video từ chúng tôi, 
                      hoặc bạn đang gặp những vấn đề không thể giải quyết nổi với nền tảng của chúng tôi,
                      thì đừng ngại ngần hiên hệ với chúng tôi thông qua sđt: 078 275 9831 để được tư vấn
                      nhanh chóng nhất.
                    </p>
                    <span class="benefit__icon">
                      <svg>
                        <use xlink:href="../assets/hero.svg#icon-life-bouy"></use>
                      </svg>
                    </span>
                  </div>

                </div>
              </div>
          </div>
        </div>

      </div>

      <div class="plan container ">
        <div class="plan__heading">
          <h3>Chọn gói dịch vụ phù hợp</h3>
          <p>Chúng tôi có đầy đủ các gói dịch vụ phù hợp với mọi nhu cầu của các bạn dù bạn
             là khách hàng cá nhân hay là khách hàng doanh nghiệp</p>
        </div>
        <div class="plan__packs">

          <!-- BASIC PACK -->
          <div class="plan__pack">
            <h5 class="plan__pack-head plan__pack-head--basic">
              basic (1 tháng)
            </h5>
            <div class="plan__features">

              <div class="plan__feature">
                <img src="../assets/tick.png" alt="tick">
                <p>Đầy đủ dịch vụ</p>
              </div>
              <div class="plan__feature">
                <img src="../assets/tick.png" alt="tick">
                <p>5 templates miễn phí</p>
              </div>
              <div class="plan__feature">
                <img src="../assets/tick.png" alt="tick">
                <p>5000 emails / 1 tháng</p>
              </div>
              <div class="plan__feature plan__not">
                <img src="../assets/x.png" alt="tick">
                <p>Template đặt biệt</p>
              </div>
              <div class="plan__feature plan__not">
                <img src="../assets/x.png" alt="tick">
                <p>Hỗ trợ ưu tiên</p>
              </div>
              <div class="plan__feature plan__not">
                <img src="../assets/x.png" alt="tick">
                <p>Gift page đặt biệt</p>
              </div>

              <h6 class="plan__price plan__price--basic">
                400.000 vnđ / 1 tháng
              </h6>

            </div>
          </div>

          <!-- Standard PACK -->
          <div class="plan__pack">
            <h5 class="plan__pack-head plan__pack-head--std">
              Standard (3 tháng)
            </h5>
            <div class="plan__features">

              <div class="plan__feature">
                <img src="../assets/tick.png" alt="tick">
                <p>Đầy đủ dịch vụ</p>
              </div>
              <div class="plan__feature">
                <img src="../assets/tick.png" alt="tick">
                <p>10 templates miễn phí</p>
              </div>
              <div class="plan__feature">
                <img src="../assets/tick.png" alt="tick">
                <p>10000 emails / 1 tháng</p>
              </div>
              <div class="plan__feature">
                <img src="../assets/tick.png" alt="tick">
                <p>Template đặt biệt</p>
              </div>
              <div class="plan__feature plan__not">
                <img src="../assets/x.png" alt="tick">
                <p>Hỗ trợ ưu tiên</p>
              </div>
              <div class="plan__feature plan__not">
                <img src="../assets/x.png" alt="tick">
                <p>Gift page đặt biệt</p>
              </div>
               <h6 class="plan__price plan__price--std">
                1.200.000 vnđ /3 tháng
              </h6>

            </div>
          </div>

          <!-- PREMIUM PACK -->
          <div class="plan__pack">
            <h5 class="plan__pack-head plan__pack-head--prem">
              Premium (6 tháng)
            </h5>
            <div class="plan__features">

              <div class="plan__feature">
                <img src="../assets/tick.png" alt="tick">
                <p>Đầy đủ dịch vụ</p>
              </div>
              <div class="plan__feature">
                <img src="../assets/tick.png" alt="tick">
                <p>Full templates miễn phí</p>
              </div>
              <div class="plan__feature">
                <img src="../assets/tick.png" alt="tick">
                <p>15000 emails / 1 tháng</p>
              </div>
              <div class="plan__feature">
                <img src="../assets/tick.png" alt="tick">
                <p>Template đặt biệt</p>
              </div>
              <div class="plan__feature">
                <img src="../assets/tick.png" alt="tick">
                <p>Hỗ trợ ưu tiên</p>
              </div>
              <div class="plan__feature plan__not">
                <img src="../assets/x.png" alt="tick">
                <p>Gift page đặt biệt</p>
              </div>
               <h6 class="plan__price plan__price--prem">
                2.300.000 vnđ / 6 tháng
              </h6>

            </div>
          </div>

          <!-- BUSINESS PACK -->
          <div class="plan__pack">
            <h5 class="plan__pack-head plan__pack-head--buss">
              Bussiness (12 tháng)
            </h5>
            <div class="plan__features">

              <div class="plan__feature">
                <img src="../assets/tick.png" alt="tick">
                <p>Đầy đủ dịch vụ</p>
              </div>
              <div class="plan__feature">
                <img src="../assets/tick.png" alt="tick">
                <p>Full templates miễn phí</p>
              </div>
              <div class="plan__feature">
                <img src="../assets/tick.png" alt="tick">
                <p>20000 emails / 1 tháng</p>
              </div>
              <div class="plan__feature">
                <img src="../assets/tick.png" alt="tick">
                <p>Template đặt biệt</p>
              </div>
              <div class="plan__feature">
                <img src="../assets/tick.png" alt="tick">
                <p>Hỗ trợ ưu tiên</p>
              </div>
              <div class="plan__feature">
                <img src="../assets/tick.png" alt="tick">
                <p>Gift page đặt biệt</p>
              </div>
               <h6 class="plan__price plan__price--buss">
                4.500.000 vnđ / 12 tháng
              </h6>

            </div>
          </div>
        </div>
      </div>

      <div class="CTA container">
        <h4>bạn đã tìm được gói phù hợp với mình chưa?</h4>
        <p>Hãy liên hệ với chúng tôi thông qua số điện thoại sau : 078 275 9831 <br>
         để được tư vấn hoặc đăng kí dùng thử 5 ngày free toàn bộ các dịch vụ của chúng tôi</p>
         <a href="/auth/signup">Đăng kí ngay</a>
      </div>
      
      <div class="service">
        <div class="service__wrap container">

          <div class="service__left">
            <div class="service__heading">
              <h5>Một số các dịch vụ khác</h5>
              <p>
                Bên cạnh dịch vụ chính là email marketing chúng tôi còn cung cấp
                cho các bạn nhiều loại dịch vụ khác nhằm phù hợp với nhu cầu cũng
                như hoàn thiện dịch vụ. Các bạn có thể liên hệ với chúng tôi 
                thông qua số điện thoại trên để được tư vấn chi tiết hơn.
              </p>
            </div>

            <div class="service__all">
              <div class="service__each" v-for="serv in services" :key="serv.name">
                <h6 class="service__no" :class="serv.classText">
                  {{ serv.no }}
                </h6>
                <div class="service__detail">
                  <h6 :style="serv.styleName">{{serv.name}}</h6>
                  <p> {{ serv.content }} </p>
                </div>
              </div>
            </div>
          </div>

          <div class="service__right">
            <img src="../assets/iphone.png" alt="iphone" class="service__iphone">
          </div>

        </div>
      </div>

  </div>
</template>

<script>

export default {
  name: 'home',
  data(){
    return {
      services: [
        {
          no: 1,
          name: 'Exclusive gift page (500.000-1.000.000 VND)',
          content: 'Dịch vụ này hỗ trợ bạn tạo ra một landing page liên kết trực tiếp với tài khoảng hiện có, giúp thu thập thông tin khách hàng. Với phong cách độc đáo mang bản sắc của doanh nghiệp bạn. Hãy liên hệ với chúng tôi ngay hôm nay',
          classText: 'service__no--1st',
          styleName: 'color: #a03bef'
        },
        {
          no: 2,
          name: 'Exclusive templates (200.000 - 450.000 vnđ)',
          content: 'Dịch vụ hỗ trợ bạn tạo ra một email template riêng biệt độc đáo, có một không hai chỉ cung cấp cho cá nhân hay doanh nghiệp của riêng bạn. Nếu bạn đang cần một branding hiệu quả, hãy liên hệ với chúng tôi ngay hôm nay',
          classText: 'service__no--2nd',
          styleName: 'color: #009bf5'
        },
        {
          no: 3,
          name: 'Special training (100.000 vnđ)',
          content: 'Nếu bạn cảm thấy việc xem các hướng dẫn và đọc hiểu thông tin trên website là khá khó khăn. Thì đừng lo bạn hãy giành ra 3 tiếng training cùng chúng tôi trong việc sử dụng phần mềm cũng như giải quyết các vấn đề thường gặp.',
          classText: 'service__no--3rd',
          styleName: 'color: #ff3300'
        },
      ],
      resMenu: false,
    }
  },

  components: {
  }
}
</script>

<style lang="scss">
.home{
  background-color: #f1f7f8;
  grid-column: 1/13;
}
$color-primary: #a03bef;
$color-secondary: #51d7e9;
$color-white: #fff;
@mixin responsive($vw){
  @media screen and (max-width: $vw){
    @content
  }
}

%displayFlex{
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;
  @include responsive(720px){
    width: 100%;
  }
}
.active{
  display: flex !important;
}
.hero{
    &__wrapper{
      height: 100vh;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      
      background-image: linear-gradient(90deg, rgba($color-white, .9) 0%, rgba($color-white, .9) 100%), url('../assets/hero.jpg');
      background-size: cover;
      background-position: center;
    }
    

    &__header{
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 1.7rem .5rem;
    }
    &__brand{
        height: 4.5rem;
    }
    &__nav{
        display: flex;
        align-items: center;
        @include responsive(680px){
          flex-direction: column;
          display: none;
        }
    }
    &__res{
      svg{
        height: 3rem;
        width: 3rem;
        fill: $color-primary;
      }
        display: none;
        @include responsive(1400px){
          display: block;
        }
    }
    &__item{
      list-style: none;
      transition: all .2s;
      &:not(:last-child){
          margin-right: 3rem;
          @include responsive(680px){
            margin-right: 0;
            margin-bottom: 1rem;
          }
      }
    }
    &__link{
      transition: all .3s;

      &:link, &:visited{
          color: #333;
          text-decoration: none;
          font-size: 1.1rem;
          @include responsive(680px){
            font-size: 1rem;
          }
      }
        
      &:hover{
        color: $color-secondary;
      }
    }

    &__content{
        display: flex;
        justify-content: space-between;
        align-items: center;
        transform: translateY(-8rem);
        z-index: 1000;

        @include responsive(1400px){
          flex-direction: column;
        }
        @include responsive(1400px){
          align-items: flex-start;
        }
        @include responsive(1400px){
          margin-top: 11rem;
        }
    }
    &__left{
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        transform: translateY(-3rem);
        animation: fromLeft 1s backwards;
        
    }
    &__right{
      animation: fromRight 1s backwards;
    }
    &__heading{
        font-weight: 600;
        color: $color-primary;
        text-transform: uppercase;       

        h4{
          font-size: 2.4rem; 
          font-weight: 700;

          @include responsive(1400px){
            font-size: 1.8rem;
          }
        }

        &--post{
            color: $color-primary;
        }
        &--camps{
            color: $color-secondary
        }

        h5{
            color: $color-primary;
            line-height: 6px;
            font-size: 1.74rem;
            @include responsive(1400px){
              font-size: 1.4rem;
            }
        }
    }

    &__subtitle{
        width: 75%;
        line-height: 26px;

        @include responsive(600px){
          width: 100%;
        }
    }

    &__btn{
      padding: 10px 22px;
      background-image: linear-gradient(135deg, #8e23e2 0%, #03b5ff 100%);
      color: white;
      border: none;
      border-radius: 100rem;
      cursor: pointer;
      transition: all .3s;
      font-size: 1.2rem;
      &:hover{
        background-image: linear-gradient(-135deg, #8e23e2 0%, #03b5ff 100%);
      }
      @include responsive(1400px){
        font-size: 0.9rem;
        padding: 8px 15px;
      }
    }

    &__display{
      height: 37.2rem;
      transform: translateX(1rem);
      z-index: 1000;

      @include responsive(1600px){
        height: 31rem;
      }
      @include responsive(1400px){
        height: 25rem;
      }
      @include responsive(1060px){
        margin-left: -1rem;
      }
      @include responsive(720px){
        height: 19rem;
      }
      @include responsive(600px){
        margin-left: -1rem;
      }
    }    
}
.register{
  padding: 7px 25px;
  border-radius: 100px;
  border: 1px solid $color-primary;
  color: $color-primary !important;
  transition: all .3s;

  &:hover{
    background-color: $color-primary;
    color: white !important;
  }
  @include responsive(1400px){
          padding: 4px 20px;
      }
}

.benefit{
  width: 99vw;
  height: 116rem; // for testing
  background-image: url('../assets/bgBen.png');
  background-size: cover;
  background-position: center;
  transform: translateY(-19rem);

  @include responsive(1060px){
    background-position: right;
    transform: translateY(-12rem)
  }

  &__wrap{
    transform: translateY(24rem);
    @include responsive(1060px){
      transform: translateY(14rem)
    }
    @include responsive(1060px){
      transform: translateY(12.5rem)
    }
  }
  &__title{
      display: flex;
      align-items: center;
      margin-bottom: 8rem;
      justify-content: space-between;
      @include responsive(720px){
        margin-bottom: 3.5rem;
      }

      img{
        margin-right: 3rem;
        height: 10rem;
        flex-shrink: 0;

        @include responsive(1400px){
          height: 7rem;
        }
      }
  }
  &__heading{
    color: $color-white;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    text-align: right;

    h4{
      font-weight: 700;
      text-transform: uppercase;
      @include responsive(1400px){
        font-size: 1.8rem;
      }
      @include responsive(700px){
        margin: 0;
      }
    }
    p{
      width: 70%;

      @include responsive(500px){
        width: 100%;
      }
    }

    &::after{
      content: "";
      height: 0.8rem;
      width: 4.7rem;
      background-color: white;
      position: absolute;
      bottom: -13px;
      right: 0;
    }
  }

  &__content{
    display: flex;
    @include responsive(720px){
      flex-direction: column;
    }
  }

  &__left{
    @extend %displayFlex;
    margin-right: 5.5rem;

    @include responsive(1600px){
      margin-right: 2.4rem;
    }
    @include responsive(1060px){
      margin-right: 1.4rem;
    }
    @include responsive(720px){
      margin-right: 0;
    }
  }
  &__right{
    @extend %displayFlex;
    margin-left: 5.5rem;
    margin-top: 10rem;
    @include responsive(1600px){
      margin-left: 2.4rem;
    }
    @include responsive(1600px){
      margin-left: 1.4rem;
    }
    @include responsive(720px){
      margin-top: 0;
    }
    @include responsive(720px){
      margin-left: 0;
    }
  }
  &__card{
    color: white;
    padding: 2.2rem 2.4rem;
    border: 1px solid white;
    border-radius: .4rem;
    position: relative;
    margin-bottom: 6.9rem;
    @include responsive(720px){
      margin-bottom: 2.3rem;
    }  

    @include responsive(600px){
      margin-bottom: 1.2rem;
      padding: 1rem;
    }
    
    h5{
      font-weight: 600;
      text-transform: uppercase;
    }
    p{
      font-size: 1.1rem
    }
  }
  &__icon{
    height: 6rem;
    width: 6rem;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: -1.5rem;
    right: -1.5rem;
    background-color: $color-primary;
    border-radius: 50%;
    box-shadow: 2px 2px 15px -1px rgba(0,0,0,0.37);

    @include responsive(700px){
      height: 4.5rem;
      width: 4.5rem;
    }

    svg{
      fill: rgb(167, 243, 253);
      height: 4rem;
      @include responsive(700px){
        height: 3rem;
      }
    }
  }
}

.plan{
  transform: translateY(-17rem);

    &__heading{
      margin-bottom: 6.7rem;
      text-align: center;
      h3{
        text-transform: uppercase;
        font-weight: 600;
        color: $color-primary;
        font-size: 2.5rem;
        margin-bottom: 2rem;
      }
      p{
        font-size: 1.2rem;
        width: 70%;
        margin: 0 auto
      }

      @include responsive(700px){
        margin-bottom: 4rem;
    }

    }
    &__packs{
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      grid-column-gap: 15px;
      @include responsive(1600px){
        grid-template-columns: repeat(2,1fr);
        grid-column-gap: 35px;
        grid-row-gap: 30px;
      }

      @include responsive(740px){
        grid-column-gap: 25px;
      }
       @include responsive(740px){
        grid-template-columns: repeat(1, 1fr)
      }
    }

    &__pack{
      cursor: pointer;
      transition: all .5s;
      &:hover{
        box-shadow: 0px 10px 9px 1px rgba(0,0,0,0.2); 
      }
    }
    &__pack-head{
      padding: 1.2rem 0;
      text-align: center;
      background-color: $color-secondary;
      text-transform: uppercase;
      margin: 0;
      font-size: 1.3rem;
      font-weight: 600;
      color: white;
      &--basic{
        background-image:linear-gradient(51deg, #06ffe5 0%, #0bdaff 100%) ;
      }
      &--std{
        background-image:linear-gradient(51deg, #1ef0ff 0%, #3593f3 100%) ;
      }
      &--prem{
        background-image:linear-gradient(51deg, #8324f0 0%, #ec21ff 100%) ;
      }
      &--buss{
        background-image:linear-gradient(51deg, #ffb400 0%, #f9173d 100%) ;
      }
    }
    &__features{
      padding: 1.4rem 1.5rem;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      background-color: white;
      box-shadow: 0px 11px 9px -7px rgba(0,0,0,0.2); 
      @include responsive(1600px){
        align-items: center;
        justify-content: center
      }
    }
    &__feature{
      display: flex;
      align-items: center;
      &:not(:last-child){
        padding-bottom: 1.2rem;
        border-bottom: 1px solid rgba(0, 0, 0, .15);
        width: 100%;
      }
      &:not(:first-child){
        padding-top: 1.2rem
      }

        img{
          height: 1.5rem;
          margin-right: 2.4rem;
        }
        p{
          text-align: center;
          margin: 0;
        }
    }
    &__not{
        p{
            color: rgb(197, 197, 197);
        }
    }
    &__price{
      padding: 1rem;
      display: flex;
      justify-content: center;
      border: 1px solid $color-secondary;
      border-radius: 5px;
      width: 100%;
      text-transform: uppercase;
      font-weight: 600;
      color: $color-secondary;

      &--std{
        border: 1px solid rgb(0, 119, 255);
        color: rgb(0, 119, 255);
      }
      &--prem{
        border: 1px solid #ae00ff;
        color: #ae00ff;
      }
      &--buss{
        border: 1px solid #ff4800;
        color: #ff4800;
      }
    }
}

.CTA{
  background-color: $color-primary;
  padding: 2.9rem 0;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  transform: translateY(-12rem);
  border-radius: 10px;

   @include responsive(600px){
      padding: 2.9rem 1rem;
    }

  h4{
    font-weight: 600;
    text-align: center;
    text-transform: uppercase;
    font-size: 1.8rem;
     @include responsive(600px){
      font-size: 1.4rem;
    }
  }
  p{
    font-size: 1.1rem;
    text-align: center;
  }
  a{
    background-color: $color-primary;
    border: 1px solid white;
    padding: .4rem 1.7rem;
    color: white;
    border-radius: 50px;
    transition: all .2s;
    &:hover{
      background-color: white;
      color: $color-primary;
    }
  }
}

.service{
    background-image: url('../assets/bg6.png');
    transform: translateY(-2rem);
    height: 63rem;
    background-position: center;
    @include responsive(700px){
      transform: translateY(-6rem)
    }

    &__wrap{
      display: flex;
      justify-content: space-between;
      transform: translateY(12rem);
       @include responsive(600px){
        transform: translateY(1rem)
      }
    }
    &__heading{
      margin-bottom: 3rem;
        h5{
          text-transform: uppercase;
          color: $color-primary;
          font-weight: 700;

        }
        p{
          color: 1.1rem;
          width: 80%;
        }
    }
    &__left{
      margin-right: 6.5rem;
      @include responsive(1400px){
        margin-right: 0;
      }
    }

    &__right{
      @include responsive(1400px){
        display: none;
      }
    }

    &__each{
      display: flex;
      align-items: flex-start;
      margin-bottom: 2rem;
      @include responsive(1600px){
        margin-bottom: 1rem;
      }
    }
    &__no{
      font-size: 1.5rem;
      height: 4rem;
      width: 4rem;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 50%;
      margin-right: 1.5rem;
      transform: translateY(-1.4rem);

      &--1st{
        color: $color-primary;
        border: solid 1px $color-primary;
      }
      &--2nd{
        color: #009bf5;
        border: solid 1px #009bf5;
      }
      &--3rd{
        color: #ff3300;
        border: solid 1px #ff3300;
      }
    }
    &__detail{
      flex: 4;
        h6{
          font-size: 1.2rem;
          font-weight: 600;
          text-transform: uppercase;
        }
    }

    &__iphone{
      height: 47rem;

      @include responsive(1600px){
        height: 42rem;
      }
    }
}

@keyframes fromLeft {
  0%{
    transform: translateX(-8rem) translateY(-3rem);
    opacity: 0;
  }
  100%{
    transform: translateX(0) translateY(-3rem);
    opacity: 1;
  }
}

@keyframes fromRight {
  0%{
    transform: translateX(8rem);
    opacity: 0;
  }
  100%{
    transform: translateX(0);
    opacity: 1;
  }
}

</style>

