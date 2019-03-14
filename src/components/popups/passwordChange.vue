<template>
    <div class="up-popup passChange" v-if="popupActive">
        <float-down :appear="popupActive" >
                <div class="up-popup__body z-depth-3" v-on-clickaway="away">
                    <h5 class="up-popup__title light-blue-text text-darken-3">
                        Đổi mật khẩu
                    </h5>                     
                    <hr>
                    <div class="row">
                        <div class="input-field col s12">
                            <input placeholder="mật khẩu hiện tại"
                                    type="password"  
                                    class="validate"
                                    v-model="pass">
                        </div>
                        <div class="input-field col s12">
                            <input placeholder="mật khẩu mới"
                                    type="password"  
                                    class="validate"
                                    v-model="newpass">
                        </div>
                        <div class="input-field col s12">
                            <input placeholder="lặp lại mật khẩu"
                                    type="password"  
                                    class="validate"
                                    v-model="cfNewpass">
                        </div>
                    </div>
                    

                    <submit-btn :isLoading="isLoading" 
                                :disableCon="!pass || newpass"
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
import { mixin as clickaway } from 'vue-clickaway';
export default {
    props: ['popupActive'],
    data() {
        return {
            isLoading: false,
            pass: '',
            newpass: '',
            cfNewpass: '',
        }
    },
    methods:{
        submit(){
            // do something
        },
        away(){
            this.$emit('closePassChange')
        }
    },
    components:{
        submitBtn,
        floatDown
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

