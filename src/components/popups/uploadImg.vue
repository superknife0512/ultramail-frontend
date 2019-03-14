<template>
    <div class="up-popup" v-if="popupActive">
        <float-down :appear="popupActive" >
                <div class="up-popup__body z-depth-3" v-on-clickaway="away">
                    <h5 class="up-popup__title light-blue-text text-darken-3">
                        Upload avatar của bạn
                    </h5>
                     <div class="file-field input-field">
                        <div class="btn">
                            <span>Upload avatar</span>
                            <input type="file" @change="uploadFile"
                                    ref="file">
                        </div>
                        <div class="file-path-wrapper">
                            <input class="file-path validate" type="text">
                        </div>                       
                        
                    </div>
                    <hr>
                    <img :src="fileUrl" alt="file" 
                        v-if="fileUrl" 
                        class="img-preview z-depth-2">

                    <submit-btn :isLoading="isLoading" 
                                :disableCon="!fileUrl"
                                @onSubmit="submit">
                        Upload avatar
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
    props: {
        popupActive: {
            type: Boolean,
        }
    },

    mixins:[clickaway],

    data() {
        return {
            fileUrl: null,
            file: '',
            isLoading: false,
            uploadPercentage: 0
        }
    },
    methods:{
        uploadFile(el){
            const file = el.target.files[0];
            this.fileUrl = URL.createObjectURL(file);
            this.file = file;
        },
        away(){
            this.$emit('deactivePopup')
        },
        success(user){
            this.$emit('success', user)
        },
        submit(){
            this.isLoading = true;
            const formData = new FormData();
            formData.append('avatar', this.file),

            fetch('http://localhost:4000/userDash/upload-avatar', {
                method: 'PUT',
                headers: {
                    'Authorization': 'Bearer '+this.$store.state.token
                },
                body: formData
            }).then(resp=>{
                return resp.json()
            }).then(resData=>{
                this.isLoading = false;
                if(status === 'fail'){
                    return this.firePopup('error', 'Không tìm thấy ảnh', resData.msg);
                }
                this.firePopup('success', 'Upload ảnh thành công', resData.msg);
                this.success(resData.avatarUrl)
            })
            .catch(err=>{
                this.isLoading = false;
                this.firePopup('error', 'Có lỗi từ server', 'có lỗi không xác định từ server');
                throw err
            })
        }
    },
    components:{
        submitBtn,
        floatDown,
    }
}
</script>

<style lang="scss">
    .up-popup{
        position: fixed;
        width: 100vw;
        height: 100vh;
        top: 0;
        left: 0;
        background-color: rgba(0,0,0,.6);
        z-index: 1000;
        display: flex;
        justify-content: center;
        align-items: center;

        &__body{
            width: 40rem;
            background-color: white;
            padding: 2rem 2.5rem;
            display: flex;
            flex-direction: column;
            align-items: center;
            border-radius: 10px;
            position: relative;
            @media only screen and (max-width: 620px){
                width: auto;
                margin: 0 1rem
            }
        }
        &__title{
            text-transform: uppercase;
            margin-bottom: 3rem;
            @media only screen and (max-width: 620px){
                font-size: 1.4rem;
            }
        }
    
    }
    .img-preview{
        height: 14rem;
        width: 14rem;
        margin-bottom: 2rem;
        object-fit: cover;
        border-radius: .7rem;
    }
    .close-icon{
        position: absolute;
        top: .8rem;
        right: .8rem;
        cursor: pointer;
    }
    .progression{
        span{
            display: flex;
            align-items: center;
            color: #666;
        }
    }
</style>

