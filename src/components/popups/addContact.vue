<template>
    <div class="up-popup addContact" v-if="popupActive">
        <float-down>
                <div class="up-popup__body z-depth-3" 
                        v-on-clickaway="away">
                    <h5 class="up-popup__title light-blue-text text-darken-3">
                        Thêm contact
                    </h5>                     
                    <hr>
                    <div class="row">
                        <div class="input-field col s12">
                            <label for="name">Tên liên lạc</label>
                            <input
                                    type="text"  
                                    class="validate"
                                    v-model="name">
                        </div>
                        <div class="input-field col s12">
                            <label for="email">Email liên lạc</label>
                            <input
                                    type="email"  
                                    class="validate"
                                    v-model="email"/>
                        </div>
                    </div>
                    

                    <submit-btn :isLoading="isLoading" 
                                :disableCon="!name || !email"
                                @onSubmit="submit">
                        Thêm liên lạc
                    </submit-btn>
                    <i class="material-icons close-icon red-text"
                        @click=away>clear</i>
                </div>
        </float-down>
    </div>
</template>

<script>
import { mixin as clickaway } from 'vue-clickaway'
export default {
    data(){
        return{
            isLoading: false,
            name: '',
            email: '',
        }
    },

    mixins: [clickaway],
    props: ['popupActive'],
    methods:{
        away(){
            this.$emit('deactivePopup')
        },
        submit(){
            this.isLoading = true;
            fetch(`${process.env.VUE_APP_PORT}/userDash/contact`,{
                method: 'PUT',
                headers: {
                    'Authorization':'Bearer '+this.$store.state.token,
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({
                    name: this.name,
                    email: this.email,
                })
            }).then(resp=>{
                return resp.json()
            }).then(resData=>{
                if(resData.status === 'success'){
                    this.firePopup('success', 'Thêm thành công', resData.msg);
                    this.$emit('addContact', resData.contact)
                }
            }).catch(err=>{
                this.firePopup('error', 'Lỗi từ server', err.error.msg);
                throw err;
            })
        }
    },
}
</script>

<style lang="scss">
    .addContact{
        .up-popup__title{
            margin-bottom: 0rem;
        }
        .row{
            margin-left: 1rem;
            width: 100%;
        }
    }
</style>


