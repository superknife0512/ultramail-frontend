<template>

    <div class="create-temp__wrapper">
        <float-down appear>
            <div class="create-temp z-depth-3" v-on-clickaway=away>
                <h5 class="cyan-text">Create template </h5>
                <form action="#">
                    <div class="row">
                        <div class="input-field col s12">
                            <input id="first_name" v-model="name" 
                                    type="text" 
                                    class="validate">
                            <label for="first_name">Template name</label>
                        </div>
                    </div>
                    <div class="row">
                        <div class="input-field col s12">
                            <textarea id="desc" v-model="desc" 
                                        type="text" 
                                        class="materialize-textarea"></textarea>
                            <label for="desc">Template description </label>
                        </div>
                    </div>

                    <div class="row" v-if="isAdmin">
                        <h6>Choose template limit</h6>
                        <label>
                            <input type="checkbox" v-model="limit" value="basic"/>
                            <span>basic</span>
                        </label><br>
                        <label>
                            <input type="checkbox" v-model="limit" value="standard"/>
                            <span>standard</span>
                        </label><br>
                        <label>
                            <input type="checkbox" v-model="limit" value="premium"/>
                            <span>premium</span>
                        </label><br>
                        <label>
                            <input type="checkbox" v-model="limit" value="bussiness"/>
                            <span>bussiness</span>
                        </label>
                    </div>

                    <div class="row">
                        <div class="file-field input-field col s12">
                            <div class="btn waves-effect cyan lighten-3 ">
                                <span class="grey-text text-darken-3">Images</span>
                                <input type="file" 
                                        ref="file"
                                        @change="checkFile">
                            </div>
                            <div class="file-path-wrapper">
                                <input class="file-path validate" type="text">
                            </div>
                        </div>
                        <img :src="fileUrlTemp" alt="img" v-if="fileUrlTemp">
                    </div>

                    <submit-btn class="btn-submit"
                                @onSubmit="submit"
                                :disableCon="!name && !desc && !fileUrlTemp"
                                :isLoading="isLoading">
                                {{ editMode ? 'Update' : 'Submit' }}
                    </submit-btn>
                </form>
                <i class="material-icons close-icon red-text"
                    @click="away"
                       >clear</i>
            </div>
        </float-down>
    </div>

</template>

<script>
import floatDown from '../transition/floatDown';
import { mixin as clickaway } from 'vue-clickaway';
export default {
    props:['components', 'inlinedHTML', 'editMode', 'editedTemplate'],

    mixins: [clickaway],

    components: {
        floatDown
    },

    created(){
        if (this.editMode == true){
            this.name = this.editedTemplate.name;
            this.desc = this.editedTemplate.desc;
            this.limit = this.editedTemplate.limit;
        }
    },

    data() {
        return {
            name: '',
            desc: '',
            fileUrlTemp: '',
            file: '',
            isLoading: false,
            limit: [],
        }
    },

    methods:{
        checkFile(){
            const file = this.$refs.file.files[0];
            this.file = file;
            this.fileUrlTemp = URL.createObjectURL(file);
        },
        submit(){
            this.$emit('getTemplate')
            this.isLoading = true;
            
            let url,method;

            if(!this.editMode){
                url = `${process.env.VUE_APP_PORT}/admin/create-template`;
                method = 'POST'
            } else {
                url = `${process.env.VUE_APP_PORT}/admin/edit-template/${this.editedTemplate._id}`;
                method = 'PUT'
            }

            setTimeout(()=>{
                const formData = new FormData();
                formData.append('name', this.name);
                formData.append('desc', this.desc);
                formData.append('tempImg', this.file);
                formData.append('components', this.components.toString());
                formData.append('html', this.inlinedHTML.toString());
                formData.append('limit', this.limit);

                fetch(url,{
                    method: method,
                    headers: {
                        'Authorization': 'Bearer '+ this.$store.state.token
                    },
                    body: formData
                }).then(resp=>{
                    return resp.json();
                }).then(resData=>{
                    this.isLoading = false;
                    if(resData.status === 'fail'){
                        this.firePopup('info', 'Có lỗi xãy ra', resData.msg);
                    } else {
                        let title;
                        if(!this.editMode){
                            title= 'Tạo thành công một template'
                            this.$emit('getTemplateId', resData.templateId)
                        } else {
                            title = 'Cập nhật thành công'
                        }
                        this.firePopup('success', title, resData.msg);
                    }
                }).catch(err=>{
                    this.isLoading = false;
                    this.firePopup('error', 'Có lỗi xãy ra', 'Lỗi không xác định từ server');
                    throw err
                })
            }, 500)
            
        },

        away(){
            this.$emit('deactivePopup');
        }
    },

    computed:{
        isAdmin(){
            return this.$store.state.userId === '5c9614fb2206af03f417171c'
        }
    }
}
</script>


<style lang="scss">
    .close-icon{
        position: absolute;
        top: .8rem;
        right: .8rem;
        cursor: pointer;
    }
    .create-temp{

        width: 45rem;
        background-color: white;
        position: relative;
        padding: 2rem 1.5rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        border-radius: 5px;

        h5{
            margin-bottom: 1.5rem;
        }

        form{
            margin-left: 1rem;
            width: 100%;
        }

        img{
            height: 15rem;
        }

        .btn-submit{
            align-self: flex-end;
        }

        &__wrapper{
            position: fixed;
            top: 0;
            left: 0;
            height: 100vh;
            width: 100vw;
            background-color: rgba(0, 0, 0, .3);
            z-index: 600;
            display: flex;
            justify-content: center;
            align-items: center;
            
        }
    }
</style>

