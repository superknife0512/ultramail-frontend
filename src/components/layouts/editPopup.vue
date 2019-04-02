<template>
    <slide-in mode="out-in">
        <div class="edit-pop z-depth-2"  v-on-clickaway="away">
            <h5 class="edit-pop__title">Edit automation mail</h5>
            <div class="edit-pop__group">
                <button class="btn waves-effect waves-light amber black-text"
                        >
                    Delete
                </button>
                <button class="btn waves-effect waves-light indigo"
                        :disabled="disableUpdate">
                    Update
                </button>
                <button class="btn waves-effect waves-light cyan"
                        :disabled="disableCancel">
                    Cancel
                </button>
            </div>

            <div class="edit-pop__body">
                <v-loader v-if="isLoading"></v-loader>
                <div v-if="!isLoading">

                    <div class="col s12 edit-pop__item">
                        <label for="name"> Automation mail name </label>
                        <input type="text" id="name" v-model="name">
                    </div>
                    <div class="col s12 edit-pop__item">
                        <label for="from"> Gửi từ ai </label>
                        <input type="text" id="from" v-model="from">
                    </div>
                    <div class="col s12 edit-pop__time">
                        <label for="time">Thời gian gửi đi</label><br>
                        <date-pick v-model="date"
                            :displayFormat="'DD.MM.YYYY HH:mm'"
                            pickTime
                            format="YYYY-MM-DD HH:mm"></date-pick>
                    </div>
                    <div class="col s12">
                        <p>Danh sách email liên lạc (không thể thay đổi)</p>
                        <p class="edit-pop__list">{{ contacts }}</p>
                    </div>

                </div>
                
            </div>
        </div>
    </slide-in>
</template>

<script>
import DatePick from 'vue-date-pick';
import 'vue-date-pick/dist/vueDatePick.css';
import slideIn from '../transition/slideIn';
import { mixin as clickaway } from 'vue-clickaway';
export default {
    props:['activeEdit', 'campId', 'mailId'],
    data(){
        return {
            date: '2019-04-08 14:30',
            name: '',
            from: '',
            subject: '',
            isLoading: true,
            initialContacts: [],
            initialDate: '',
            automail:'',
        }
    },
    mixins: [clickaway],
    components:{
        slideIn,
        DatePick
    },

    created(){
        setTimeout(()=>{
            this.initialize();
        },600)
    },

    watch:{
        initialDate(value){
            if(value){
                const dateArr = value.split('T');
                const date = dateArr[0];
                const time = dateArr[1].split('').slice(0,5).join('');
                this.date = `${date} ${time}`
            }
        }
    },

    computed:{
        contacts(){
            if(this.initialContacts){
                const contactEmails = this.initialContacts.map(cont=>{
                    return cont.studentEmail
                })
                return contactEmails.join(', ')
            }
            return []
        },
        disableCancel(){
            if(this.automail.isSend || this.automail.isCancel){
                return true
            }
            return false
        },

        disableUpdate(){
            if(this.automail.isSend){
                return true
            }
            return false
        }
    },
    
    methods:{
        initialize(){
            this.isLoading = true
            setTimeout(()=>{
                fetch(`${process.env.VUE_APP_PORT}/campaign/automail?campId=${this.campId}&mailId=${this.mailId}`,{
                    headers:{
                        'Authorization': 'Bearer '+this.$store.state.token
                    }
                }).then(resp=>{
                    return resp.json()
                }).then(resData=>{
                    this.isLoading = false
                    if(resData.status === 'success'){
                        const mailInfo = resData.automail;
                        this.automail = mailInfo;
                        this.initialDate = mailInfo.dateTime;
                        this.name = mailInfo.mailName;
                        this.from = mailInfo.from;
                        this.subject = mailInfo.subject;
                        this.initialContacts = mailInfo.contacts;
                    }
                }).catch(err=>{
                    throw err;
                })
            },100)
        },

        away(){
            this.$emit('deactivePopup')
        }
    }
}
</script>


<style lang="scss">
    
    .edit-pop{
        flex: 2;
        background-color: white;
        min-height: calc(100vh - 150px);
        padding: 3rem 4rem;

        @media screen and (max-width: 965px ) {
            position: fixed;
            top: 140px;
            right: 0;
            z-index: 1000;
        }
        @media screen and (max-width: 667px ) {
            top: 0;
            height: 100vh;
            padding: 2rem;
        }
        @media screen and (max-width: 441px ) {
            width: 80%;
            height: 100vh;
            overflow-x: scroll;
        }

        &__list{
            padding: 1.5rem;
            background-color: rgb(238, 238, 238);
            text-transform: capitalize
        }

        &__time{

        }
        &__item{
            margin-bottom: 2rem;
        }
        &__group{
            display: flex;
            margin-bottom: 2rem;
            button{
                margin-right: 2rem;
                @media screen and (max-width: 667px ) {
                    margin-right: 0;
                    margin-bottom: 1.5rem;
                }
            }
            @media screen and (max-width: 667px ) {
                flex-direction: column;
            }
        }

        &__title{
            color: rgb(118, 98, 231);
            margin-bottom: 2rem;
        }
    }
</style>

