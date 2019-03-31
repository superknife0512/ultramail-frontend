<template>
    <div class="container">
        <div class="login">
            <div class="row signup__box z-depth-4">
                <div class="signup__left">
                    <div class="signup__welcome">
                        <h4 class="signup__welcome-title deep-purple-text">
                            Chào mừng các bạn quay trở lại với Ultramail
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
                        Đăng nhập
                    </h5>
                    <h6>Bạn chưa có tài khoảng
                        <router-link tag="a" to="/auth/signup">
                            Đăng kí ngay!!
                        </router-link>
                        hoặc
                        <router-link tag="a" to="/auth/forgot">
                            Quên mật khẩu
                        </router-link>
                    </h6>
                    <form action="#" class="row signup__form">
                        <div class="input-field col s12">
                            <label for="email" >Email đăng nhập</label>
                            <input placeholder="" 
                                    type="email" 
                                    class="validate"                                  
                                    v-model.lazy="email" autocomplete="true"> 
                        </div>

                        <div class="input-field col s12">
                            <label for="password" >Mật khẩu</label>
                            <input placeholder="" 
                                    type="password" 
                                    v-model="password">
                        </div>

                        <submit-btn :isLoading="isLoading" 
                                    :disableCon="!email || !password"
                                    @onSubmit="onSubmit">
                            Đăng nhập
                        </submit-btn>
                    </form>
                </div>
            </div>
        </div>
        
    </div>
</template>

<script>
import submitBtn from '../../components/button/submitBtn'
export default {
    created(){
        const isLogin = this.$store.state.isLogin;
        if(isLogin){
            this.$router.push( `/user/${this.$store.state.userId}`);
        }
    },

    data() {
        return {
            email: '',
            password: '',
            isLoading: false
        }
    },
    components:{
        submitBtn
    },
    methods:{
        //type, title, text, footer
        onSubmit(){
            this.isLoading = true;
            fetch(`${process.env.VUE_APP_PORT}/user/login`, {
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json',
                },
                body:JSON.stringify({
                    email: this.email.toLowerCase(),
                    password: this.password
                })
            }).then(resp=>{
                return resp.json();
            }).then(resData=>{
                this.isLoading = false;
                const remainingTime = 2*60*60*1000
                if(resData.status === 'fail'){
                    this.firePopup('error', 'Đăng nhập thất bại', resData.msg)
                } else if (resData.status === 'success') {
                    this.firePopup('success', 'Đăng nhập thành công', 'Chuẩn bị chuyển hướng sau vài giây nữa...');
                    this.$store.commit('loginHandler', resData);
                    this.$store.dispatch('autoLogout', remainingTime);
                    setTimeout(()=>{
                        this.$router.push(`/user/${resData.userId}`);
                    }, 1500)
                }
            })
            .catch(err=>{
                this.isLoading = false;
                this.firePopup('warning', 'Lỗi đăng nhập', 'Có lỗi không xác định đến từ server')
                throw err
            })
        }
    },
    
}
</script>


<style lang="scss">
    .login{
        .signup{
            &__box{
                height: 33rem;
                @media screen and (max-width: 600px){
                    height: 28rem;
                }
            }   
            &__right{
                display: flex;
                flex-direction: column;
                justify-content: center
            }     
            &__form{
                margin: 0;
            }
        }
        .input-field{
            p{
                margin: 0;
            }
        }
    }
</style>
