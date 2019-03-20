<template>
    <div class="container">
        <v-loader v-if="isLoading"></v-loader>
        <div class="row" v-if="!isLoading">
            <div class="col s12 m4 l3" 
                v-for="temp in templates" 
                :key="temp._id">

                <div class="card">
                    <div class="card-image">
                        <img :src="`http://localhost:4000/${temp.imgUrl}`">
                        <span class="card-title">{{temp.name}}</span>
                    </div>
                    <div class="card-content">
                        <p>{{ temp.desc | descFilter}}</p>
                    </div>
                    <div class="card-action">
                        <a href="#">Edit this template</a>
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
                this.isLoading = false
            }).catch(err=>{
                this.firePopup('error', 'Something wrong', 'Lỗi từ server');
                this.isLoading = false
                throw err;
            })
        }
    },

    computed(){
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
        margin-right: 1rem;

        img{
            height: 14rem;
            width: 100%;
            object-fit: cover;
        }
    }
</style>

