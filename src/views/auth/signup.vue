<template>
    <div class="container signup">
        <div class="">
            <div class="row signup__box z-depth-4">
                <div class="signup__left">
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
                <div class="signup__right">
                    <h5 class="signup__title cyan-text text-darken-1">
                        Đăng kí tài khoản <strong>FREE</strong>
                    </h5>
                    <h6>Bạn đã có tài khoản? 
                        <router-link tag="a" to="/auth/login">
                            Đăng nhập!
                        </router-link>
                    </h6>
                    <form action="#" class="row signup__form">
                        <div class="input-field col s12">
                            <label for="name" >Tên của bạn</label>
                            <input  type="text" 
                                    class="validate"
                                    v-model="name">
                        </div>

                        <div class="input-field col s12">
                            <label for="phone" >Nhập vào số điện thoại</label>
                            <input v-model="phone" 
                                    type="text" >
                        </div>
                        
                        <div class="input-field col s12">
                            <label for="email" >Địa chỉ email</label>
                            <input placeholder="" 
                                    type="email" 
                                    class="validate"                                 
                                    v-model.lazy="email"
                                    @change="checkEmail">    

                            <!-- check if email is registered -->
                            <warning-msg :appear="emailCheck && isEmail"
                                           :errorCon="canIUse ">
                                {{emailCheck}}
                            </warning-msg>
                            
                            <!-- check if it is an email -->
                            <warning-msg :appear="!isEmail && email.length>0"
                                        :errorCon="isEmail">
                                Hãy nhập vào 1 email hợp lệ
                            </warning-msg>
                        </div>

                        <div class="input-field col s12">
                            <label for="password" >Mật khẩu</label>
                            <input placeholder="" 
                                    type="password" 
                                    v-model="password"
                                    :class="{'invalid': !isLength}">

                            <warning-msg :appear="!isLength"
                                        :errorCon="isLength">
                                Mật khẩu phải có ít nhất từ 7 kí tự trở lên
                            </warning-msg>
                        </div>

                        <div class="input-field col s12">
                            <label for="cfPass" >Nhập lại mật khẩu</label>
                            <input v-model="cfPass" 
                                    type="password" 
                                    :class="{'invalid': !isSame}">
                            <warning-msg :appear="!isSame"
                                        :errorCon="isSame">
                                Mật khẩu khi nhập lại phải giống nhau
                            </warning-msg>
                        </div>                        
                        
                        <submit-btn :disableCon="!canIUse || !isSame || !isLength || password.length === 0 || !isEmail || !phone"
                                    :isLoading="isLoading"
                                    @onSubmit="submit">
                            Đăng kí
                        </submit-btn>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import warningMsg from '../../components/messages/warningMsg'
import submitBtn from '../../components/button/submitBtn'
export default {
    data(){
        return {
            email: '',
            password: '',
            name: '',
            phone: '',
            emailCheck: '',
            canIUse: false,
            cfPass: '',
            isLoading: false,
        }
    },
    methods:{
        submit(){
            this.isLoading = true;
            const expireDate = new Date().getTime() + 60*10*1000; // 10 minutes
            
            fetch(`${process.env.VUE_APP_PORT}/user/signup`,{
                method: 'POST',
                body: JSON.stringify({
                    email: this.email.toLowerCase(),
                    password: this.password,
                    name: this.name,
                    phone: this.phone
                }),
                headers:{
                    'Content-Type': 'application/json'
                }
            }).then(resp=>{
                return resp.json();
            }).then(resData=>{
                this.isLoading = false;
                if(resData.status === 'success'){
                    this.$store.state.signupUserId = resData.userId;
                    // save userId and expire time 5 minutes
                    localStorage.setItem('signupId', resData.userId);
                    localStorage.setItem('expiryId', expireDate);
                    this.$router.push('/auth/sucess');
                } else {
                    this.firePopup('error', 'Lỗi từ server', resData.msg)
                }
            }).catch(err=>{
                this.firePopup('error', 'Lỗi từ server', err.err)
                throw err
            })
        },
        checkEmail(){
            fetch(`${process.env.VUE_APP_PORT}/user/check-mail`,{
                method: "POST",
                body: JSON.stringify({email: this.email.toLowerCase()}),
                headers :{
                    'Content-Type': 'application/json'
                }
            }).then(res=>{
                return res.json()
            }).then(resData=>{
                this.canIUse = resData.canIUse;
                this.emailCheck =resData.msg;
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
        },
        isEmail(){
            const emailReg = /^[a-z][a-z0-9_.]{5,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}$/;
            if(emailReg.test(this.email.toLowerCase())){
                this.checkEmail();
                return true
            } else {
                return false
            }
        }
    },
    components:{
        warningMsg,
        submitBtn
    }
}
</script>


<style lang="scss">
    $color-primary: #0097a7;
    $color-background: #ffe3e5;
    $color-secondary: #5a2669;
    .signup{
        margin: 0 auto;
        &__box{
            margin: 0 3rem;
            display: flex;
            @media only screen and (max-width: 600px){
                margin: 0;
            };
            
            @media only screen and (max-width: 1186px){
                margin: 0;
            };
        }
        &__left{
            background-color: #e5f1ff;
            padding: 0 3rem !important; 
            display: flex; 
            flex-direction: column;
            justify-content: center;
            align-items: center;
            flex: 4;
            @media only screen and (max-width: 980px){
                display: none;
            };
        }
        &__social{
            .fab{
                font-size: 2.2rem;
                color: $color-secondary;
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
            font-size: 1.9rem;
            line-height: 2.3rem;
        }
        &__right{
            height: auto;
            background-color: white;           
            opacity: .97;
            padding: 2.2rem 4rem !important;
            flex: 5;
            @media only screen and (max-width: 1350px){
                padding: 1.2rem 2rem !important;
            };
        }
        &__title{
            font-size: 1.8rem;
        }
        &__form{
            margin-top: .8rem;
        }
        &__btn{
            margin-left: 0rem;
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
        transform: translateX(-.8rem);
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
