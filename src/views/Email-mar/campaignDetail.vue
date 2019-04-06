<template>
    <div class="emailmar">
        <email-header findWhat="Tìm automation email"
                    @searchThing="searchThing($event)">
            <template v-slot:title>
                {{ campaignTitle }}
            </template>
        </email-header>
        
        <div class="emailmar__wrapper">
            <div class="emailmar__body">
                <div class="emailmar__header">
                    <h4 class="emailmar__title">
                        Automation email
                    </h4>
                    <router-link :to="`/campaign/${campaignId}/wizard`"
                                tag="button"
                                class="btn waves-effect waves-light blue lighten-1 emailmar__btn">
                                Tạo mới
                    </router-link>
                </div>

                <h6 v-if="!automails[0]">Bạn chưa có automail nào trong này</h6>
                
                <v-loader v-if="!automails[0]"></v-loader>

                    <div class="emailmar__list" v-if="automails[0]">

                        <fly-out class="resp">
                            <div class="emailmar__list-badge z-depth-1" 
                                    v-for="(mail,i) in automails" :key="mail._id"
                                    :style="statusColors[i].border"
                                    @click="moreInfo(mail._id)"
                                    :class="{'shrink': activeEdit}"
                                    >
                                <div class="emailmar__icon z-depth-1" :style="statusColors[i].bg">
                                    <i class="material-icons">
                                        {{ statusColors[i].icon }}
                                    </i>
                                </div>

                                <div class="emailmar__list-item">
                                    <p class="emailmar__mini-title">
                                        Email
                                    </p>
                                    <h6 class="emailmar__name">
                                        {{ mail.mailName }}
                                    </h6>
                                </div>

                                <div class="emailmar__list-item">
                                    <p class="emailmar__mini-title">
                                        From
                                    </p>
                                    <h6 class="emailmar__contact">
                                        {{ mail.from }}
                                    </h6>
                                </div>

                                <div class="emailmar__list-item">
                                    <p class="emailmar__mini-title">
                                        Thời gian
                                    </p>
                                    <h6 class="emailmar__time">
                                        {{mail.dateTime | dateTimeFilter}}
                                    </h6>
                                </div>

                                <div class="emailmar__list-item">
                                    <p class="emailmar__mini-title">
                                        Gửi cho
                                    </p>
                                    <h6 class="emailmar__contact">
                                        {{ mail.contacts.length }} trên {{ fullContactsQuantity }} contacts
                                    </h6>
                                </div>
                            </div>  
                        </fly-out>

                        <v-pagination :perPage="perPage"
                                        :numPages="numPages"
                                        @changePage="curPage = $event"></v-pagination>           
                    </div>

            </div>
            <edit-popup :activeEdit="activeEdit"
                        :campId="campaignId"
                        :mailId="mailId"
                        @deactivePopup="activeEdit = false"
                        @updateAutomail="updateAutomail($event)"
                        @delAutomail="delAutomail($event)"
                        @cancelAutomail="cancelAutomail($event)"
                        @restoreAutomail="restoreAutomail($event)"
                        v-if="activeEdit"></edit-popup>
        </div>


    </div>
</template>

<script>
import emailHeader from "../../components/layouts/marketingHeaders";
import editPopup from "../../components/layouts/editPopup"
import flyOut from "../../components/transition/flyOut"

export default {
    props:['campaignId'],
    components:{
        emailHeader,
        editPopup,     
        flyOut,
    },
    data(){
        return {
            initAutomails: '', // return an array
            activeEdit: false,
            mailId:'',   
            perPage: 5,
            curPage: 1,      
            campaignTitle: '',
            oldDataAutomail: '',
        }
    },

    created(){
        fetch(`${process.env.VUE_APP_PORT}/campaign/${this.campaignId}`,{
            headers:{
                'Authorization': 'cax '+this.$store.state.token
            },            
        }).then(resp=>{
            return resp.json()
        }).then(resData=>{
            this.initAutomails = resData.automails.reverse();
            this.campaignTitle = resData.title;
        }).catch(err=>{
            throw err        
        })
    },

    methods:{
        refreshPage(){
            const oldPage = this.curPage;
            this.curPage = 2;
            this.curPage = oldPage;
        },

        moreInfo(mailId){
            this.activeEdit = true;
            this.mailId = mailId;            
        },
        updateAutomail(automail){
            const mailId = automail._id;
            let mailIndex = this.initAutomails.findIndex(each=>{
                return each._id === mailId
            })
            this.initAutomails[mailIndex] = automail
            this.refreshPage();
        },

        delAutomail(mailId){
            let mailIndex = this.initAutomails.findIndex(each=>{
                return each._id === mailId
            })
            this.initAutomails.splice(mailIndex, 1);
            this.refreshPage();
        },

        cancelAutomail(mailId){
                let mailIndex = this.initAutomails.findIndex(each=>{
                    return each._id === mailId
                })
                this.initAutomails[mailIndex].isCancel = true;
                this.refreshPage();
        },

        restoreAutomail(mailId){
                let mailIndex = this.initAutomails.findIndex(each=>{
                    return each._id === mailId
                })
                this.initAutomails[mailIndex].isCancel = false;
                this.refreshPage();
        },

        searchThing(searchData){
            if(this.oldDataAutomail){
                this.initAutomails = this.oldDataAutomail
            }
            const pattern = new RegExp(searchData, 'gi')
            const newArr = this.initAutomails.filter(mail=>{
                return mail.mailName.match(pattern);
            })
            this.oldDataAutomail = this.initAutomails;
            this.initAutomails = newArr;
            this.refreshPage();
        }
    },

    computed:{
        fullContactsQuantity(){
            const contacts = this.$store.state.userData.studentContacts
            return contacts.length;
        },

        numPages(){
            return Math.ceil(this.initAutomails.length/this.perPage)
        },

        automails(){
            const automails = this.initAutomails
            const start = (this.curPage - 1)*this.perPage;
            const end = this.curPage*this.perPage;
            return automails.slice(start, end)
        },

        statusColors(){
            const statusColor = this.automails.map(mail=>{
                if(mail.isCancel){
                    return {
                        border: `border-left: 1rem solid #e7636f`,
                        bg: `background-color: #e7636f`,
                        icon: 'clear'
                    }
                }
                if(!mail.isSend){
                    return {
                        border: `border-left: 1rem solid #47a1e6`,
                        bg: `background-color: #47a1e6`,
                        icon: 'access_time',                        
                    }
                } else {
                    return {
                        border: `border-left: 1rem solid #35e796`,
                        bg: `background-color: #35e796`,
                        icon: 'done'
                    }
                }
            })
            return statusColor
        },
        
        maxWidth(){
            if(this.activeEdit){
                return `max-width: 95%`
            } 
            return ''
        }
    },

    filters:{
        dateTimeFilter(value){
            const dateArr = value.split('T');
            let date = dateArr[0];
            let time = dateArr[1];
            date = date.split('-').reverse().join('-');
            time = time.split('').slice(0,5).join('');
            return `${time} ngày 
                     ${date}`
        }
    }
}
</script>

<style lang="scss">
    %each-item{
        margin: 0;
        font-size: 1.3rem;
        line-height: 1.3;
    }
    .shrink{
        max-width: 96% !important;
    }

    .resp{
        @media screen and (max-width: 667px) {            
            display: flex;
            flex-direction: column;
            align-items: center;
        }
    }

    .emailmar{
        grid-column: 2/13;  
        @media screen and (max-width: 667px ) {
            grid-column: 1/13;
        }      

        .pagination{
            margin-top: 2rem;
        }

        &__wrapper{
            display: flex;
        }

        &__body{
            margin: 3.5rem 5rem;
            margin-right: 1.2rem;
            flex: 4;
            @media screen and (max-width: 523px ) {
                margin: 3rem 0 ;
            }
            
        }
        &__header{
            display: flex;
            align-items: center;
        }
        &__title{
            color: #0ab498;
            margin: 0;
            margin-right: 2rem;
        }
        &__list{
            margin-top: 3rem;
            @media screen and (max-width: 523px ) {
                display: flex;
                flex-direction: column;
                align-items: center;
            }
        }
        &__list-badge{
            height: 6.5rem;
            background-color: white;

            display: flex;
            align-items: center;
            justify-content:space-evenly;
            flex-wrap: wrap;

            position: relative;
            max-width: 90%;
            cursor: pointer;

            &:not(:last-child){
                margin-bottom: 2rem;
            }

            @media screen and (max-width: 1213px ) {
                height: auto;
                padding: 1.5rem .5rem ;
            }
            @media screen and (max-width: 523px ) {
                flex-direction: column;
                width: 100%;
                margin: 2rem;
                align-items: center;
            }
            // border-left: 1rem solid #35e796;
        }

        &__icon{
            height: 2.7rem;
            width: 2.7rem;
            background-color: #47a1e6;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;            
            position: absolute;
            top: -1rem;
            right: -1rem;

            i{
                color: white;
                font-size: 1.9rem;
            }
        }

        &__list-item{
            display: flex;
            align-items: flex-start;
            flex-direction: column; // danger
            @media screen and (max-width: 523px ) {
                margin-bottom: 1rem;
            }
        }
        &__mini-title{
            font-size: 1.1rem;
            color: #b1b1b1;
            margin: 0;
        }
        &__name{
            @extend %each-item;
            color: #ff5b85;            
            // width: 60%;            
            text-transform: capitalize;
            @media screen and (max-width: 523px ) {
                width: 100%
            }
        }
        &__time{
            @extend %each-item;
            color: #47a1e6;
            // width: 44%;
            @media screen and (max-width: 523px ) {
                width: 100%
            }
        }
        &__contact{
            @extend %each-item;
            color: #444;
        }
        &__temp{
            @extend %each-item;
            color: #444;
            // width: 51%;
            @media screen and (max-width: 523px ) {
                width: 100%
            }
        }
    }
</style>

