<template>
    <div class="sucess-log container z-depth-3 forgot">
        <h4 class="orange-text darken-2">
            Có vẻ như bạn đã quên mật khẩu của mình?
        </h4>
        <h6>
            Hãy điền email của bạn vào link bên dưới, chúng tôi sẽ gửi đến bạn một
            email giúp khôi phục mật khẩu.
        </h6>
        <div class="row">
                <div class="input-field col s6">
                    <input placeholder="Email của bạn" 
                            name="email"  
                            type="text" 
                            v-model="email">
                </div>
            </div>
            <submit-btn :isLoading="isLoading"
                        :disableCon="disabled"
                        @onSubmit="onSubmit">
                Gửi link
            </submit-btn>
        <!-- <a href="/auth/login">Đăng nhập</a> -->
        
    </div>
</template>

<script>
import submitBtn from '../../components/button/submitBtn'
export default {
    data() {
        return {
            email: '',
            isLoading: false,
        }
    },

    methods:{
        onSubmit(){
            //type, title, text, footer
            this.isLoading = true;
            fetch(`${process.env.VUE_APP_PORT}/user/forgot`, {
                method: 'POST',
                headers:{
                    'content-type':'application/json'
                },
                body: JSON.stringify({
                    email: this.email.toLowerCase()
                })
            }).then(resp=>{
                return resp.json()
            }).then(resData=>{
                if(resData.status === 'fail'){
                    this.firePopup('warning', 'Gửi dữ liệu thất bại', resData.msg)
                } else if (resData.status === 'success') {
                    this.firePopup('success', 'Thành công', resData.msg)
                }
                this.isLoading = false;
            }).catch(err=>{
                this.firePopup('error', 'Lỗi server', err)
                throw err
            })
        },
    },

    computed:{
        disabled(){
            return this.email.length === 0 
        }
    },
    components:{
        submitBtn
    }
}
</script>

<style lang="scss">
</style>

