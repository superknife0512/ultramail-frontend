<template>
    <div class="up-popup addContact" v-if="popupActive">
        <float-down>
                <div class="up-popup__body z-depth-3" 
                        v-on-clickaway="away">
                    <h5 class="up-popup__title light-blue-text text-darken-3">
                        {{ isEdit ? 'Chỉnh sửa contact' : 'Thêm contact' }} 
                    </h5>                     
                    <hr>
                    <div class="row">
                        <div class="input-field col s12">
                            <label for="name" v-if="!isEdit">Tên liên lạc</label>
                            <input
                                    type="text"  
                                    class="validate"
                                    v-model="name">
                        </div>
                        <div class="input-field col s12">
                            <label for="phone" v-if="!isEdit">Số điện thoại</label>
                            <input
                                    type="text"  
                                    class="validate"
                                    v-model="phone">
                        </div>
                        <div class="input-field col s12">
                            <label for="email" v-if="!isEdit">Email liên lạc</label>
                            <input
                                    type="email"  
                                    class="validate"
                                    v-model="email"/>
                        </div>
                    </div>
                    

                    <submit-btn :isLoading="isLoading" 
                                :disableCon="!name || !email"
                                @onSubmit="submit">
                        {{ isEdit ? 'Cập nhật liên lạc' : 'Thêm liên lạc'}}
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
    props: ['popupActive', 'isEdit', 'editContact'],

 
    data(){
        return{
            isLoading: false,
            name: '',
            email: '',
            phone: '',
            editContactId: '',
        }
    },

    mixins: [clickaway],

    watch:{
        isEdit(value){
            if(value){
                this.setup(this.editContact.studentName,
                            this.editContact.studentEmail,
                            this.editContact.phone,
                            this.editContact._id)
            } else {
                this.setup('', '', '', '')
            }
        }
    },    

    methods:{
        away(){
            this.$emit('deactivePopup')
        },

        setup(name, email, phone, id){
            this.name = name;
            this.email = email;
            this.phone = phone;
            this.editContactId = id;
        },

        submit(){
            let method = 'PUT';
            if(this.isEdit){
                method = 'PATCH'
            }
            this.isLoading = true;
            fetch(`${process.env.VUE_APP_PORT}/userDash/contact`,{
                method: method,
                headers: {
                    'Authorization':'Bearer '+this.$store.state.token,
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({
                    name: this.name,
                    email: this.email,
                    phone: this.phone,
                    contactId: this.editContactId,
                })
            }).then(resp=>{
                return resp.json()
            }).then(resData=>{
                this.isLoading = false;
                if(resData.status === 'success'){
                    this.firePopup('success', 'Thêm thành công', resData.msg);
                    this.$emit('addContact', resData.contact)
                }
            }).catch(err=>{
                this.isLoading = false;
                this.firePopup('error', 'Lỗi từ server', err.error.msg);
                throw err;
            })
        },
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
    .editColor{
        color: rgb(240, 41, 101) !important;
    }
</style>


