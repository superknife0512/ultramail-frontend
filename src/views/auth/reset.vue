<template>
    <div class="sucess-log container z-depth-3">
        <h4 class="orange-text darken-2">
            Reset password 
        </h4>
        <h6>
            Hãy điền mật khẩu mới của bạn ở bên dưới (mật khẩu có độ dài từ 7 kí tự trở lên)
        </h6>
        
        <div class="">
            <div class="input-field col s12">
                <input placeholder="Mật khẩu mới " 
                        name="password"  
                        type="password" 
                        v-model="password">
            </div>
            <div class="input-field col s12">
                <input placeholder="lặp lại mật khẩu " 
                        name="cfPass"  
                        type="password" 
                        v-model="cfPass">
            </div>
        </div>

        <div class="row">
            
        </div>
        <submit-btn :isLoading="isLoading"
                    :disableCon="!disabled"
                    @onSubmit="onSubmit">
            Đổi mật khẩu
        </submit-btn>
        <!-- <a href="/auth/login">Đăng nhập</a> -->
        
    </div>
</template>

<script>
import submitBtn from '../../components/button/submitBtn'
export default {
    props:['token'], // token get from the router params
    data() {
        return {
            isLoading: false,
            password: '',
            cfPass: '',
        }
    },

    created(){
        this.checkValid();
    },

    methods: {
        onSubmit(){
            // do something
            this.isLoading = true;
            fetch('http://localhost:4000/user/reset',{
                method: 'PUT',
                headers: {
                    'content-type': 'application/json'
                },
                body:JSON.stringify({token: this.token, password: this.password})
            }).then(res=>{
                return res.json()
            }).then(resData=>{
                if(resData.status === 'success'){
                    this.firePopup('success', 'Thành công', resData.msg)
                    setTimeout(()=>{
                        this.$router.push('/auth/login')
                    }, 1500)
                }
                this.isLoading = false;

            }).catch(err=>{
                throw err
            })
        },
        checkValid(){
            //type, title, text, footer
            fetch('http://localhost:4000/user/check-valid',{
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body:JSON.stringify({token: this.token})
            }).then(res=>{
                return res.json()
            }).then(resData=>{
                if(resData.status === 'fail'){
                    this.firePopup('warning', 'Hết thời gian', 'Thời gian reset password của tài khoảng này đã hết!')
                    setTimeout(()=>{
                        this.$router.push('/auth/login')
                    }, 1500)
                }
                
            }).catch(err=>{
                throw err
            })

        }
    },

    computed: {
        disabled(){
            // length check                  //samecheck
            if(this.password.length < 6 || this.password !== this.cfPass){
                return false
            } else {
                return true
            }
        }
    },

    components:{
        submitBtn
    }
}
</script>

<style lang="scss">
    .input-field{
        margin-left: 1rem;
    }
</style>

