<template>
    <div class="campaign">
        <create-camp :popupActive="popupActive"
                        @closePopup=closePopup
                        @reload="initialize"></create-camp>
        
        <email-header @searchThing="searchThing($event)">
            <template v-slot:title>
                Marketing campaign
            </template>
        </email-header>
        
        <v-loader v-if="isLoading" class="loader"></v-loader>

        <div class="campaign-body" v-if="!isLoading">
            <div class="campaign-body__new"
                @click="popupActive = true" >
                <svg class="campaign-body__new-icon">
                    <use xlink:href="../../assets/campaign.svg#icon-plus"></use>
                </svg>
                <h6>Thêm mới</h6>
            </div>

            <div class="campaign-body__card" v-for="(camp, i) in campaigns"
                :key="camp._id">
                <div class="campaign-body__card-title"
                    :style="colorMapping[i]">
                    <h6>{{ camp.name }}</h6>
                </div>
                <div class="campaign-body__card-desc">
                    <p>{{ camp.desc | stringShorter }}</p>                
                </div>

                <div class="campaign-body__card-action">
                    <router-link tag="h6" 
                                :to="`/campaign/${camp._id}`"
                                class="campaign-body__card-action--seen">Xem</router-link>
                    <h6 class="campaign-body__card-action--del"
                        @click="deleteCamp(camp._id)">Xóa</h6>
                </div>
            </div>
            
        </div>
    </div>
</template>

<script>
import createCamp from '../../components/popups/createCamp.vue'
import emailHeader from '../../components/layouts/marketingHeaders'
export default {
    components:{
        createCamp,
        emailHeader
    },

    created(){
        this.initialize();
    },

    data() {
        return {
            search: '',
            popupActive: false,
            campaigns: '',
            isLoading: true,
            prevData: '',
        }
    },

    filters:{
        stringShorter(value){
            value = value.split(' ');
            if(value.length > 29){
                const shortString = value.slice(0,28);
                return shortString.join(' ') + '...'
            }
            return value.join(' ')
        }
    },

    methods:{
        closePopup(){
            this.popupActive = false
        },
        initialize(){
            this.isLoading = true
            this.campaigns = null
            fetch(`${process.env.VUE_APP_PORT}/campaign/get`,{
                headers: {
                    'Authorization':'Bearer '+this.$store.state.token
                }
            }).then(resp=>{
                return resp.json()
            }).then(resData=>{
                this.isLoading = false;
                this.campaigns = resData.campaigns
            }).catch(err=>{
                this.isLoading = false;
                throw err
            })
        },
        deleteCamp(campId){
            this.$swal.fire({
                title: 'Bạn có chắc muốn xóa không',
                text: "Bạn sẽ không thể hoàn tác lại hành động này ",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Ok xóa'
                }).then((result) => {
                if (result.value) {
                    fetch(`${process.env.VUE_APP_PORT}/campaign/${campId}`,{
                        method: 'DELETE',
                        headers:{
                            'Authorization': 'Bearer '+this.$store.state.token
                        }
                    }).then(resp=>{
                        return resp.json()
                    }).then(resData=>{
                        if(resData.status === 'success'){
                            this.firePopup('success', 'Xóa thành công', 'Đã xóa thành công một campaign');
                            this.initialize();
                        }
                    })                    
                }
            })
        },

        searchThing(searchData){
            if(this.prevData){
                this.campaigns = this.prevData
            }
            const pattern = new RegExp(searchData,'gi');
            const searchCampaign = this.campaigns.filter(camp=>{
                return camp.name.match(pattern)
            })
            this.prevData = this.campaigns;
            this.campaigns = searchCampaign;
        }
    },
    computed:{
        colorMapping(){
            const colorMap = this.campaigns.map(camp=>{
                if(camp.scale === 'small'){
                    return 'background-color: #44d4eb'
                } else if (camp.scale === 'medium'){
                    return 'background-color: #ce4deb'
                }
            })
            return colorMap;
        }
    }
}
</script>

<style lang="scss">
    .color-small{
        background-color: #44d4eb !important;
    }
    .color-medium{
        background-color: #ce4deb !important;
    }  

    .loader{
        margin: 5rem auto;
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
    } 

    .campaign{
        grid-column: 2/13;
        @media screen and (max-width: 820px) {
                grid-column: 1/13;
            }        

    }

    .campaign-body{
        padding: 5rem;
        display: grid;
        justify-content: center;
        grid-template-columns: repeat(auto-fit, minmax(10rem, 20rem));
        grid-template-rows: auto;
        grid-column-gap: 5rem;
        grid-row-gap: 3rem;
        
        &__card{
            display: flex;
            flex-direction: column;
            box-shadow: 2px 2px 10px 0px rgba(0,0,0,0.45); 
        }
        &__card-title{
            display: flex;
            justify-content: center;
            align-items: center;
            height: 5rem;
            background-color: #ed5e5e;

            h6{
                color: white;
                text-transform: uppercase;
            }
        }
        &__card-desc{
            background-color: white;
            padding: 1rem;
            border-bottom: 1px solid rgba(0, 0, 0, .1);
            color: rgb(117, 117, 117);
            min-height: 51%;
        }
        &__card-action{
            background-color: white;
            padding: 1.5rem;
            display: flex;
            align-items: center;
            justify-content: space-evenly;
            h6{
                text-transform: uppercase;
                cursor: pointer;
                font-size: 1.2rem;
                transition: all .2s;
                &:hover{
                    transform: scale(1.1)
                }
            }
            &--seen{
                color: #3e8abd;
            }
            &--del{
                color: #e6564c
            }
        }
        &__new{
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            background-color: white;
            cursor: pointer;
            transition: all .2s;
            
            min-height: 20rem;

            &:hover{
                box-shadow: 2px 2px 13px 0px rgba(0,0,0,0.25);
            }

            h6{
                color: #3e8abd;
            }
        }
        &__new-icon{
            height: 7rem;
            width: 7rem;
            fill: #aac0d6;
        }
    }
</style>

