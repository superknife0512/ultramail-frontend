<template>
    <div class="up-popup" v-if="popupActive">
        <float-down>
                <div class="up-popup__body z-depth-3" 
                    v-on-clickaway="away"
                    v-if="activebody">
                    <h5 class="up-popup__title light-red-text text-darken-3">
                        Upload CSV file
                    </h5>
                    <h6>Chú ý !!!</h6>
                    <p>
                        Hãy đảm bảo rằng cấu trúc file .csv của bạn y hệt như bảng thông tin học viên 
                        bạn đang nhìn thấy bao gồm các trường: <b>name, email, phone</b>  Nếu không đúng như trên 
                        sẽ không thể thực hiện được chức năng này. Hành động này sẽ thêm các danh sách khác vào danh
                        sách hiện có của bạn.
                    </p>
                     <div class="file-field input-field">
                        <div class="btn">
                            <span>Upload csv</span>
                            <input type="file" @change="uploadFile"
                                    accept=".csv">
                        </div>
                        <div class="file-path-wrapper">
                            <input class="file-path validate" type="text">
                        </div>                       
                        
                    </div>

                    <submit-btn :isLoading="isLoading" 
                                :disableCon="!file"
                                @onSubmit="submit">
                        Upload
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
            file: '',
            isLoading: false,
            activebody: true,
        }
    },
    methods:{
        uploadFile(el){
            const file = el.target.files[0];
            this.file = file;
        },
        away(){
            this.activebody = false,
            setTimeout(() => {
                this.$emit('deactivePopup');
                this.activebody = true;                
            }, 1000);
        },
        submit(){
            this.isLoading = true;
            const formData = new FormData();
            formData.append('csv', this.file),

            fetch(`${process.env.VUE_APP_PORT}/userDash/contact/csv`, {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer '+this.$store.state.token
                },
                body: formData
            }).then(resp=>{
                return resp.json()
            }).then(resData=>{
                this.isLoading = false;
                if(status === 'fail'){
                    return this.firePopup('error', 'Không tìm thấy file', resData.msg);
                }
                this.firePopup('success', 'Upload thành công', resData.msg);
                this.$store.commit('addContact', resData.newContact);
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
        z-index: 200;
        display: flex;
        justify-content: center;
        align-items: center;

        p{
            text-align: center;
        }

        h5{
            margin-bottom: 1rem;
        }
        h6{
            color: #ff2638 !important;
            font-weight: 700;
            text-transform: uppercase;
        }

        &__body{
            width: 40rem;
            background-color: white;
            padding: 2rem 2.5rem;
            display: flex;
            flex-direction: column;
            align-items: center;
            border-radius: 5px;
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

