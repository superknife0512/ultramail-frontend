<template>
    <div class="card__body">
        <v-loader v-if="isLoading"></v-loader>
        <div class="row" v-if="!isLoading">
            <div class="col s12 m2 l3" 
                v-for="temp in templates" 
                :key="temp._id">

                <div class="card">
                    <div class="card-image">
                        <img :src="`http://104.248.159.101:4000/${temp.imgUrl}`">
                        <span class="card-title">{{temp.name}}</span>
                    </div>
                    <div class="card-content">
                        <p>{{ temp.desc | descFilter}}</p>
                    </div>
                    <div class="card-action">
                        <a href="#" class="btn waves-effect green"
                            @click.prevent="editTemplate(temp._id)">Edit</a>
                        <a href="#" class="btn waves-effect red" 
                            @click.prevent="deleteTemplate(temp._id)">Delete</a>
                    </div>
                </div>
            </div>
            
        </div>
    </div>
</template>

<script>
import vLoader from "../../components/button/loader";

export default {
    components:{
        vLoader
    },

    data() {
        return {
            isLoading: true,
            templates: [],
        }
    },
    created(){
        this.initialize();
    },

    methods:{
        initialize(){
            this.isLoading = true;
            fetch(`${process.env.VUE_APP_PORT}/admin/template`,{
                headers: {
                    'Authorization': 'Bearer '+this.$store.state.token
                }
            }).then(resp=> resp.json()).then(resData=>{
                this.templates = resData.templates;
                this.$store.commit('setTemplates', resData.templates)
                this.isLoading = false
            }).catch(err=>{
                this.firePopup('error', 'Something wrong', 'Lỗi từ server');
                this.isLoading = false
                throw err;
            })
        },

        editTemplate(templateId){
            this.$emit('editTemp');
            this.$store.commit('changeEditMode', {mode: true});
            this.$store.commit('setEditTemplate', templateId)
        },

        deleteTemplate(templateId){
            this.$swal.fire({
                title: 'Bạn có chắc sẽ muốn xóa',
                text: 'Hành động này sẽ xóa template vĩnh viễn',
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#e82a2a',
                cancelButtonColor: '#1ab3a5',
                confirmButtonText: 'Xóa cmnđ'
            }).then(result=>{
                if(result.value){
                    fetch(`${process.env.VUE_APP_PORT}/admin/delete-template/${templateId}`,{
                    method: 'DELETE',
                    headers: {
                        'Authorization': 'Bearer '+ this.$store.state.token
                    },
                }).then(resp=> resp.json()).then(resData=>{
                    if(resData.status === 'success'){
                        this.firePopup('success','Đã xóa 1 template', resData.msg);
                        this.initialize();
                    }
                }).catch(err=>{
                    throw err
                })
                }
            })
        }
    },

    computed: {
    },

    filters:{
        descFilter(value){
            if(value.split(' ').length > 20){
                return value.split(' ').slice(0,20).join(' ') + '...'
            } else {
                return value
            }
        }
    }
}
</script>


<style lang="scss">
    .card{
        margin-bottom: 2rem;
        margin-right: .75rem;

        img{
            height: 14rem;
            width: 100%;
            object-fit: cover;
            filter: brightness(80%)
        }

        &__body{
            display: flex;
            justify-content: center;
            padding: 2rem 0;
        }
        &-action{
            a{
                margin-right: .5rem;
            }
        }
    }
</style>

