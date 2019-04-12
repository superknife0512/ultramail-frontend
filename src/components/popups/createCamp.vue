<template>
    <div class="up-popup passChange" v-if="popupActive">
        <float-down>
                <div class="up-popup__body z-depth-3" 
                        v-on-clickaway="away">
                    <h5 class="up-popup__title light-blue-text text-darken-3">
                        Tạo một chiến dịch
                    </h5>                     
                    <hr>
                    <div class="row">
                        <div class="input-field col s12">
                            <label for="name">Tên chiến dịch</label>
                            <input
                                    type="text"  
                                    class="validate"
                                    v-model="name">
                        </div>
                        <div class="input-field col s12">
                            <label for="desc">Miêu tả ngắn</label>
                            <textarea
                                    type="text"  
                                    class="validate materialize-textarea"
                                    v-model="desc"></textarea>
                        </div>
                        <div class="input-field col s12">
                            <label for="cax">  Chọn quy mô chiến dịch</label><br><br>
                            <select v-model="scale" class="scale">                                
                                <option value="small">Nhỏ</option>
                                <option value="medium">vừa</option>
                                <option value="big">Lớn</option>
                            </select>
                        </div>
                    </div>
                    

                    <submit-btn :isLoading="isLoading" 
                                :disableCon="!name || !desc"
                                @onSubmit="submit">
                        Tạo chiến dịch
                    </submit-btn>
                    <i class="material-icons close-icon red-text"
                        @click=away>clear</i>
                </div>
        </float-down>
    </div>
</template>

<script>
import { mixin as clickaway } from 'vue-clickaway';

export default {
    props: ['popupActive'],
    mixins: [clickaway],
    data() {
        return {
            name: '',
            desc: '',    
            isLoading: false,   
            instances: '',
            scale: '',
        }
    },

    methods:{
        away(){
            this.$emit('closePopup')
        },

        reload(){
            this.$emit('reload')
        },

        submit(){
            this.isLoading = true;
            fetch(`${process.env.VUE_APP_PORT}/campaign/create`,{
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer '+this.$store.state.token,
                    'Content-type':'application/json',
                },
                body: JSON.stringify({name: this.name, desc: this.desc, scale: this.scale})
            }).then(resp=> {
                return resp.json()
            }).then(resData=>{
                this.isLoading = false;
                if(resData.status === 'success'){
                    this.firePopup('success', 'Tạo thành công', resData.msg);
                    this.reload();
                } else {
                    this.firePopup('error', 'Có lỗi tử server', resData.msg);
                }
            }).cacth(err=>{
                this.isLoading = false;
                throw err
            })
        }
    }
}
</script>


<style lang="scss">
    .passChange{
        .up-popup__title{
            margin-bottom: 0rem;
        }
        .row{
            margin-left: 1rem;
            width: 100%;
        }
        .scale{
            display: block;
        }
    }
</style>

