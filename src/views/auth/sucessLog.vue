<template>
    <div class="sucess-log container z-depth-3">
        <h4 class="cyan-text darken-4">
            Chúc mừng! Bạn đã đăng kí thành công!
        </h4>
        <h6>
            Có một email xác nhận vừa được gởi đến 
            email mà bạn đã đăng kí, trong đó có một mã dùng
            thử các dịch vụ trang web trong vòng 5 ngày.
            bạn hãy dán nó vào trường bên dưới. Xin cảm ơn.
            Nếu 5 phút mà bạn vẫn chưa nhận được hãy nhấn
            <a href="#" @click.prevent.once="resend">Gửi lại (1 lần nữa)</a>,
            Bạn có 10' trước khi mã kích hoạt hết hạn
        </h6>
        
        <div class="row">
            <div class="input-field col s6">
                <input placeholder="Mã kích hoạt" 
                        name="code"  
                        type="text" 
                        v-model="code">
            </div>
        </div>
        <submit-btn :isLoading="isLoading"
                    :disableCon="!disabled"
                    @onSubmit="onSubmit">
            Kích hoạt
        </submit-btn>
        <!-- <a href="/auth/login">Đăng nhập</a> -->
    </div>
    
</template>

<script>
import submitBtn from '../../components/button/submitBtn.vue'
export default {
    data() {
        return {
            isLoading: false,
            code: ''
        }
    },
    components:{
        submitBtn
    },
    computed:{
        disabled(){
            return this.code.length > 0 ? true : false
        }
    },
    methods:{
        onSubmit(){
            this.isLoading = true;
            fetch(`${process.env.VUE_APP_PORT}/user/activate`,{
                method: 'POST',
                body:JSON.stringify({
                    code: this.code,
                    userId: this.$store.state.signupUserId || 'acais1i2hiuas',
                }),
                headers:{
                    'Content-Type': 'application/json'
                }
            }).then(resp=>{
                this.isLoading = false;
                return resp.json();
            }).then(resData=>{
                if(resData.status === 'success'){
                    this.firePopup('success', 'Thành công', 'Kích hoạt tài khoảng thành công - đang chuyển về trang đăng nhập ...');
                    setTimeout(()=>{
                        this.$router.push('/auth/login');
                    }, 2000)
                } else if (resData.status === 'fail'){
                    this.firePopup('error', 'Mã không hợp lệ', 'Kích hoạt tài khoảng thất bại');
                }
            }).catch(err=>{
                this.firePopup('error', 'Lỗi sever', 'Kích hoạt thất bại');
                throw err;
            })
        },

        resend(){
            fetch(`${process.env.VUE_APP_PORT}/user/resend`, {
                headers:{
                    'Content-Type': 'application/json',
                },
                method: 'POST',
                body: JSON.stringify({
                    userId: this.$store.state.signupUserId
                })
            }).then(resp=>{
                return resp.json()
            }).then(resData=>{
                if(resData.status === 'fail'){
                    this.firePopup('warning', 'Gửi lại mail thất bại', 'Lỗi gửi mail thất bại từ server')
                } else {
                    this.firePopup('success', 'Thành công', 'Chúng tôi đã gửi lại mã kích hoạt cho bạn')
                }
            })
        },

        
    }
}
</script>


<style lang="scss">
    .sucess-log{
        background-color: white;
        opacity: .91;
        max-width: 60%;
        padding: 3rem 4rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        @media screen and (max-width: 862px) {
            max-width: 90%;
            padding: 2rem 1.2rem;
        }
        h4, h6{
            text-align: center;
        }
        h6{
            line-height: 1.6rem;
        }
        h4{
            @media screen and (max-width: 600px) {
                font-size: 1.8rem;
            }
        }
        .input-field{
            width: 30rem !important;
            @media screen and (max-width: 862px) {
                width: 100% !important;
            }
        }
        .row .col s6{
            margin-left: 1rem;
        }
    }
</style>

