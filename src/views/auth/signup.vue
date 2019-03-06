<template>
    <div class="container signup">
        <div class="">
            <div class="row signup__box">
                <div class="col s12 l6 signup__left">
                    <div class="signup__welcome">
                        <h4 class="signup__welcome-title deep-purple-text">
                            Chào mừng các bạn đến với Ultra-mail
                        </h4>
                        <h5>Ứng dụng hỗ trợ đắc lực trong email marketing.</h5>
                        <p> Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui numquam molestias accusamus, molestiae praesentium laborum, quos accusantium, officia unde minus nemo? Quos ab eos rem ut impedit modi consequuntur accusantium?</p> 
                    </div>
                    <hr>
                    <div class="signup__social">
                        <a href="#">
                            <i class="fab fa-facebook-square"></i>
                        </a>
                        <a href="#">
                            <i class="fab fa-instagram"></i>
                        </a>
                    </div>
                    
                </div>
                <div class="col s12 l6 signup__right">
                    <h5 class="signup__title cyan-text text-darken-1">
                        Đăng kí tài khoảng <strong>FREE</strong>
                    </h5>
                    <h6>Bạn đã có tài khoảng? 
                        <router-link tag="a" to="/auth/login">
                            Đăng nhập!
                        </router-link>
                    </h6>
                    <form action="#" class="row signup__form">
                        <div class="input-field col s12">
                            <label for="name" >Tên của bạn</label>
                            <input  type="text" 
                                    class="validate">
                        </div>
                        <div class="input-field col s12">
                            <label for="email" >Địa chỉ email</label>
                            <input placeholder="" 
                                    type="email" 
                                    class="validate"  
                                    :class="!canIUse ? '' : 'invalid-color'"                                  
                                    v-model.lazy="email"
                                    @change="checkEmail">     

                            <p v-if="emailCheck" 
                                class="text-darken-3 msg"
                                :class="canIUse ? 'light-green-text' : 'red-text'">
                                <i class="material-icons">
                                    {{ canIUse ? 'check_circle' : 'warning' }}
                                </i>
                                 {{ emailCheck }}
                            </p>
                        </div>

                        <div class="input-field col s12">
                            <label for="password" >Mật khẩu</label>
                            <input placeholder="" 
                                    type="password" 
                                    v-model="password"
                                    :class="{'invalid': !isLength}">

                            <p v-if="!isLength" 
                                class="text-darken-3 msg"
                                :class="isLength ? 'light-green-text' : 'red-text'">
                                <i class="material-icons">
                                    {{ isLength ? 'check_circle' : 'warning' }}
                                </i>
                                 Mật khẩu cần chứa ít nhất 8 kí tự
                            </p>
                        </div>

                        <div class="input-field col s12">
                            <label for="cfPass" >Nhập lại mật khẩu</label>
                            <input v-model="cfPass" 
                                    type="password" 
                                    :class="{'invalid': !isSame}">
                            <p v-if="!isSame" 
                                class="text-darken-3 msg"
                                :class="isSame ? 'light-green-text' : 'red-text'">
                                <i class="material-icons">
                                    {{ isSame ? 'check_circle' : 'warning' }}
                                </i>
                                 Nhập lại mật khẩu cần phải giống như mật khẩu
                            </p>
                        </div>

                        <button class="waves-effect waves-light btn pink signup__btn"
                                @click.prevent="submit"
                                :disabled="!canIUse || !isSame || !isLength || password.length === 0 ">
                            Đăng kí
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            email: '',
            password: '',
            emailCheck: null,
            canIUse: false,
            cfPass: '',
        }
    },
    methods:{
        submit(){
            // something here
        },
        checkEmail(){
            fetch('http://localhost:4000/user/check-mail',{
                method: "POST",
                body: JSON.stringify({email: this.email}),
                headers :{
                    'Content-Type': 'application/json'
                }
            }).then(res=>{
                return res.json()
            }).then(resData=>{
                this.canIUse = resData.canIUse;
                this.emailCheck = resData.msg;
            }).catch(err=>{
                throw err;
            })
        }
    },
    computed:{
        isLength(){
            if(this.password.length < 7 && this.password.length > 0){
                return false
            } else {
                return true
            }
        },
        isSame(){
            if(this.password !== this.cfPass || this.password.length > 0 && this.password.length < 7){
                return false
            } else {
                return true
            }
        }
    }
}
</script>


<style lang="scss">
    .signup{
        margin: 0 auto;
        &__box{
            padding: 0 3.4rem;
            @media only screen and (max-width: 600px){
                padding: 0;
            };
        }
        &__left{
            height: 518px;
            background-color: #afddf0;
            padding: 0 3rem !important; 
            display: flex; 
            flex-direction: column;
            justify-content: center;
            align-items: center;
            @media only screen and (max-width: 980px){
                display: none;
            };
        }
        &__social{
            .fab{
                font-size: 2.2rem;
                color: rgb(2, 104, 145);
                margin: 0 .4rem;
            }
        }
        &__welcome{
            p{
                color: #555;
            }
        }
        &__welcome-title{
            margin-top: 0;
            text-transform: uppercase;
            font-size: 1.9rem
        }
        &__right{
            height: auto;
            background-color: white;           
            opacity: .9;
            padding: 1.2rem 3rem !important;
        }
        &__title{
            font-size: 1.8rem;
        }
        &__form{
            margin-top: .8rem;
        }
        &__btn{
            margin-left: .8rem;
            margin-top: .2rem;
        }
        .material-icons{
            margin-right: .4rem;
        }
        &__social{
            display: flex;
            align-self: flex-start;
        }
    }
    .input-field{
        p{
            margin: 0;
        }
    }
    .msg{
        display: flex;
        align-items: center;
    }
    .invalid__color{
        border-bottom: 1px solid #ff1a2d !important;
        box-shadow: 0 1px 0 0 #000 !important;
    }
</style>
