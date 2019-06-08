<template>
    <div class="template-list">
        <h5 class="template-list__heading">Bước 1. Chọn template</h5>
        <p class="template-list__instruct">
            Dưới đây là một số template mẫu có sẵn các bạn có thể chọn một trong
            số chúng để chọn làm điểm khởi đầu, rồi sau đó có thể tự tạo cho mình 
            những template riêng
        </p>

        <v-loader v-if="isLoading"></v-loader>
        <div class="template-list__admin" v-if="!isLoading">
            <h6 class="template-list__title">Template mẫu</h6>  
               <!-- pagination -->
            <v-pagination :perPage="perPage"
                            :numPages="numPages1"
                            @changePage="curPage1 = $event"></v-pagination>

            <div class="template-list__body" v-if="adminTemplate[0]">
                <div class="card" v-for="temp in slicedAdminTemp"
                    :key="temp._id">
                    <div class="card-image">
                        <img :src="`${temp.imgUrl}`">
                        <span class="card-title">{{ temp.name }}</span>
                    </div>
                    <div class="card-content">
                        <p>{{ temp.desc | descFilter }}</p>
                    </div>
                    <div class="card-action">
                        <a href="#"
                            class="indigo-text"
                            @click.prevent="edit(temp._id)">Chỉnh sửa</a>
                    </div>
                </div>
            </div>
            
             
        </div>
        <div class="template-list__owner" v-if="!isLoading">
            <h6 class="template-list__title">Template bạn tạo ra</h6>

            <h6 v-if="!ownerTemplate[0]"> Bạn chưa tạo ra template nào </h6>

            <!-- Owner pagination -->
            <v-pagination :perPage="perPage"
                            :numPages="numPages2"
                            @changePage="curPage2 = $event"
                            v-if="ownerTemplate[0]"></v-pagination>

            <div class="template-list__body" v-if="ownerTemplate[0]">
                <div class="card" v-for="temp in slicedOwnerTemp"
                    :key="temp._id">
                    <div class="card-image">
                        <img :src="`${temp.imgUrl}`">
                        <span class="card-title">{{ temp.name }}</span>
                    </div>
                    <div class="card-content">
                        <p>{{ temp.desc | descFilter }}</p>
                    </div>
                    <div class="card-action">
                        <a href="#" class="indigo-text text-darken-1"
                            @click.prevent="edit(temp._id)">Chỉnh sửa</a>
                        <a href="#" class="red-text text-darken-1"
                            @click.prevent="deleteTemp(temp._id)">Xóa</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    created(){
        this.getTemplates();
    },

    data(){
        return{
            adminTemplate: '',            
            ownerTemplate: '',
            isLoading: false,
            perPage: 4,
            curPage1: 1,
            curPage2: 1,
            port: process.env.VUE_APP_PORT
        }
    },

    filters:{
        descFilter(value){
            if(value.split(' ').length > 14){
                return value.split(' ').slice(0,14).join(' ') + '...'
            } else {
                return value
            }
        }
    },

    computed:{
        numPages1(){
            return Math.ceil(this.adminTemplate.length/this.perPage);
        },
        numPages2(){
            return Math.ceil(this.ownerTemplate.length/this.perPage)
        },

        slicedAdminTemp(){
            const start = (this.curPage1 - 1)*this.perPage;
            const end = this.curPage1*this.perPage;
            return this.adminTemplate.slice(start, end)
        },
        slicedOwnerTemp(){
            const start = (this.curPage2 - 1)*this.perPage;
            const end = this.curPage2*this.perPage;
            return this.ownerTemplate.slice(start, end)
        },
    },

    methods:{
        getTemplates(){
            this.isLoading = true;
            fetch(`${process.env.VUE_APP_PORT}/campaign/template`,{
                headers:{
                    'Authorization': 'Bearer '+this.$store.state.token
                }
            }).then(resp=>{
                return resp.json()
            }).then(resData=>{
                this.isLoading = false;
                if(resData.status === 'success'){
                    this.ownerTemplate = resData.ownerTemplate;

                    const changeLevelNumber = (level)=>{ //this function turn the level from charater into number
                        if(level === 'basic') return 1 ;
                        else if (level === 'standard') return 2;
                        else if (level === 'premium') return 3;
                        else if (level === 'bussiness') return 4;
                        else if (level === 'free') return 5;
                        return 0;
                    }

                    const lowestLevel = (allLevel) =>{ // Lowest level can use
                        return Math.min(...allLevel);
                    }
                    
                    // this logic help us differentiate level of template and user for use
                    this.adminTemplate = resData.adminTemplate.filter(templ=>{
                        const levelNumbers = templ.limit.map(level=>{
                            return changeLevelNumber(level);
                        })
                        const userLevelNumber = changeLevelNumber(this.$store.state.userData.userLevel);
                        
                        let lowestLv = lowestLevel(levelNumbers);
                        if(userLevelNumber >= lowestLv) return true
                        else return false;
                    });

                    this.$store.commit('loadUserTemplates', {
                        ownerTemplate: resData.ownerTemplate,
                        adminTemplate: resData.adminTemplate
                    })
                    const allTemplate = [...resData.ownerTemplate, ...resData.adminTemplate];
                    this.$store.commit('setTemplates', allTemplate);
                }
            }).catch(err=>{
                this.isLoading = false;
                throw err;
            })
        },

        edit(templateId){
            this.$emit('editTemplate');
            this.$store.commit('setEditTemplate', templateId)
        },

        deleteTemp(templateId){
            this.$swal.fire({
                title: 'Bạn có chắc muốn xóa?',
                text: "Template này sẽ bị xóa đi vĩnh viễn",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#ffb923',
                cancelButtonColor: '#4677fd',
                confirmButtonText: 'Ok, xóa'
            }).then(result=>{
                if(result.value){
                    fetch(`${process.env.VUE_APP_PORT}/admin/delete-template/${templateId}`,{
                        method:'DELETE',
                        headers:{
                            'Authorization':'Bearer '+this.$store.state.token
                        }
                    }).then(resp=>{
                        return resp.json()
                    }).then(resData=>{
                        if(resData.status === 'success'){
                            this.firePopup('success','Thành công', resData.msg);
                            this.getTemplates();
                        }
                    }).catch(err=>{
                        throw err
                    })
                }
            })
        }
    }
}
</script>

<style lang="scss">
    .template-list{
        &__heading{
            font-size: 1.8rem;
            color: rgb(235, 131, 131);
            text-transform: uppercase;
        }

        &__title{
            font-size: 1.6rem;
            margin-bottom: 2rem;
            margin-top: 2.5rem;
            text-transform: uppercase;
            color: #444;
        }

        &__instruct{
            color: #666;
            max-width: 35rem;
        }

        &__body{
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(20rem, 21rem));
            grid-gap: 3.5rem;
            border-bottom: 1px solid rgba(0, 0, 0, .2);
            padding-bottom: 2rem;

            @media screen and (max-width: 600px) {
                grid-template-columns: repeat(auto-fit, 1fr);
                justify-content: center;
                grid-row-gap: 2rem;
            }
        }

        .card{
            &-image{
                img{
                    height: 17rem;
                    object-fit: cover;
                    filter: brightness(.9)
                }
            }
        }
    }
</style>

