<template>
    <div class="sucess-log container z-depth-3">
        <h4 class="cyan-text darken-4">
            Chúc mừng! Bạn đã đăng kí thành công!
        </h4>
        <h6>
            Có một email xác nhận vừa được gởi đến 
            email mà bạn đã đăng kí, trong đó có một mã dùng
            thử các dịch vụ trang web trong vòng 7 ngày.
            bạn hãy dán nó vào trường bên dưới. Xin cảm ơn.
            Nếu 5 phút mà bạn vẫn chưa nhận được hãy nhấn
            <a href="#">Gửi lại</a>
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
import  submitBtn from '../../components/button/submitBtn.vue'
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
            fetch('http://localhost:4000/user/activate',{
                method: 'POST',
                body:JSON.stringify({
                    code: this.code,
                    userId: this.$store.state.signupUserId,
                }),
                headers:{
                    'Content-Type': 'application/json'
                }
            }).then(resp=>{
                this.isLoading = false;
                return resp.json();
            }).then(resData=>{
                if(resData.status === 'success'){
                    this.firePopup('success', 'Thành công', 'Kích hoạt tài khoảng thành công');
                } else if (resData.status === 'fail'){
                    this.firePopup('error', 'Mã không hợp lệ', 'Kích hoạt tài khoảng thất bại');
                }
            }).catch(err=>{
                this.firePopup('error', 'Lỗi sever', 'Kích hoạt thất bại');
                throw err
            })
        },
        firePopup(type, title, text){
            this.$swal.fire({
                type,
                title,
                text,
                confirmButtonText: 'OK',
                confirmButtonClass: 'teal darken-1 ',
                footer: '<a href="/auth/login#" class="orange-text">Đăng nhập</a> '
            })
        }
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
        h4, h6{
            text-align: center;
        }
        h6{
            line-height: 1.6rem;
        }
        .input-field{
            width: 30rem !important;
        }
    }
</style>

