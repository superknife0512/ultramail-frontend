<template>
    <div class="up-popup passChange" v-if="popupActive">
        <float-down>
                <div class="up-popup__body z-depth-3" 
                        v-on-clickaway="away"
                        v-if="activeBody">
                    <h5 class="up-popup__title light-blue-text text-darken-3">
                        Đổi mật khẩu
                    </h5>                     
                    <hr>
                    <div class="row">
                        <div class="input-field col s12">
                            <label for="pass">Mật khẩu hiện tại</label>
                            <input
                                    type="password"  
                                    class="validate"
                                    v-model="pass">
                        </div>
                        <div class="input-field col s12">
                            <label for="newpass">Mật khẩu mới</label>
                            <input 
                                    type="password"  
                                    class="validate"
                                    v-model="newpass">
                        <warning-msg :appear="!isLength && newpass.length > 0" :errorCon="isLength">
                            Mật khẩu nên có từ 7 kí tự trở lên
                        </warning-msg>
                        </div>
                        <div class="input-field col s12">
                            <label for="pass">Nhập lại mật khẩu</label>
                            <input 
                                    type="password"  
                                    class="validate"
                                    v-model="cfNewpass">
                        <warning-msg :appear="!isSame" :errorCon="isSame">
                            Nhập lại mật khẩu phải giống nhau
                        </warning-msg>
                        </div>
                    </div>
                    

                    <submit-btn :isLoading="isLoading" 
                                :disableCon="!pass || !newpass || !isLength || !isSame"
                                @onSubmit="submit">
                        Đổi mật khẩu
                    </submit-btn>
                    <i class="material-icons close-icon red-text"
                        @click=away>clear</i>
                </div>
        </float-down>
    </div>
</template>

<script>
import submitBtn from '../button/submitBtn'
import floatDown from '../transition/floatDown'
import warningMsg from '../messages/warningMsg'
import { mixin as clickaway } from 'vue-clickaway';
export default {
    props: ['popupActive'],
    data() {
        return {
            isLoading: false,
            pass: '',
            newpass: '',
            cfNewpass: '',
            activeBody: true,
        }
    },
    methods:{
        submit(){
            this.isLoading = true;
            fetch('http://localhost:4000/user/update-password',{
                method: 'PUT',
                headers:{
                    'Content-Type':'application/json',
                    'Authorization': 'Bearer '+ this.$store.state.token,
                },
                body: JSON.stringify({
                    password: this.pass,
                    newpass: this.newpass
                })
            }).then(resp=>{
                return resp.json()
            }).then(resData=>{
                this.isLoading = false;
                if(resData.status === 'fail'){
                    this.firePopup('error', 'Đổi mật khẩu thất bại', resData.msg)
                } else {
                    this.firePopup('success', 'Đổi mật khẩu thành công', 'Bạn có thể trở lại trang đăng nhập để đăng nhập lại')
    
                }
            }).catch(err=>{
                this.firePopup('error', 'Có lỗi từ server', 'Lỗi không xác định')
                throw err
            })
        },
        away(){
            this.activeBody = false;
            setTimeout(() => {
                this.$emit('closePassChange');
                this.activeBody=true;                
            }, 1000);
        }
    },
    components:{
        submitBtn,
        floatDown,
        warningMsg
    },

    computed: {
        isLength(){
            return this.newpass.length > 6 ? true : false
        },
        isSame(){
            return this.newpass === this.cfNewpass ? true : false
        }
    },

    mixins:[clickaway]
}
</script>

<style lang="scss">
    .passChange{
        .up-popup__title{
            margin-bottom: 0rem;
        }
        .row{
            margin-left: 1rem;
        }
    }
</style>

