<template>
    <div class="container">
        <expiration-msg v-if="remainingDate === 0">
            Thời hạn sử dụng của tài khoảng này đã hết, hãy nhanh chóng liên hệ
            với chúng tôi để gia hạn tài khoảng!
        </expiration-msg>
        <upload-img :popupActive="popupActive"
                    @deactivePopup="popupActive = false"
                    @success="successHandler($event)"></upload-img>
        
        <password-change :popupActive="passChangePopup"
                            @closePassChange="passChangePopup=false"></password-change>

        <div class="user">
            <h4 class="user__wel cyan-text">
                Xin chào {{ userData.name }}, bạn sẽ gửi email gì hôm nay?
            </h4>
            <div class="user__info">
                <div class="user__left">
                    <img :src="avatar" alt="user" class="user__img">

                    <i class="material-icons user__edit-img"
                        v-tooltip="'Chỉnh sửa ảnh'"
                        @click="activePopup">create</i>
                        
                </div>
                <div class="user__right">
                    <div class="user__info-gr">
                        <h6>Email</h6>
                        <h5>{{ userData.email }}</h5>
                    </div>

                    <div class="user__info-gr">
                        <h6>Tham gia ngày</h6>
                        <h5>{{ userData.createdAt | dateFilter }}</h5>
                    </div>

                    <button class="btn user__btn waves-effect waves-light amber grey-text text-darken-3"
                            @click="passChangePopup= true">
                        <i class="material-icons left">lock</i>
                        Đổi mật khẩu
                    </button>
                </div>
            </div>

            <float-down appear>
                <div class="user__account z-depth-3">

                    <div class="user__acc-left">
                        <!-- basic: cyan, standard: yellow, premiun: red -->
                        <h5 class="user__type">
                            Loại tài khoảng hiện tại: 
                            <span class="z-depth-2" :class="color">
                                {{userData.userLevel}}
                            </span>
                        </h5>
                        <h6 class="user__exp">
                            Thời hạn sử dụng đến ngày:
                            <span>
                                {{ userData.expirationDate | dateFilter }}
                            </span>
                        </h6>
                        <h6 class="user__exp">
                            Thời gian còn lại: 
                            <span>
                                {{ remainingDate }} ngày
                            </span>
                        </h6>
                    </div>
                    <div class="user__acc-right">
                        <div class="user__acc--info">
                            <i class="material-icons email">email</i>
                            <h6>Tổng cộng có <span class="cyan-text text-darken-3">{{ userData.emailSends }}</span> emails đã gửi</h6> 
                        </div>
                        <div class="user__acc--info ">
                            <i class="material-icons contact">supervisor_account</i>
                            <h6>Tổng cộng tài khoảng có <span class="amber-text text-darken-3">{{ userData.studentContacts | lengthFilter }}</span> contacts</h6> 
                        </div>
                    </div>

                    <div class="user__acc-bottom">
                        <h5>Nâng cấp tài khoảng ?</h5>
                        <p>Bạn đã mua mã kích hoạt trước đó thì bạn có thể kích hoạt ngay tại đây</p>
                        <div class="user__acc-inp">
                            <input v-model="code" type="text" placeholder="Mã kích hoạt" />
                            <submit-btn :isLoading="isActivating"
                                        :disableCon="!code"
                                        @onSubmit="activateLicense">
                                Kích hoạt tài khoảng
                            </submit-btn>
                        </div>
                    </div>
                </div>
                
            </float-down>
            
        </div>
        <br>
        
        <div class="contacts">
            <h4 class="cyan-text"> Danh sách contact </h4>
                <table class="striped responsive-table centered">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Ngày nhận</th>
                            <th>Xóa contact</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr v-for="contact in userData.studentContacts" :key="contact.email">
                            <td>{{contact.name}}</td>
                            <td>{{contact.email}}</td>
                            <td>{{contact.createdAt | dateFilter}}</td>
                            <td>
                                <button class="btn waves-effect waves-light red"
                                        @click="deleteContact(contact._id)">
                                    Delete
                                </button>
                            </td>
                        </tr>
                        
                    </tbody>
                </table>
            </div>
            <br><br>  
    </div>
</template>

<script>
import floatDown from '../../components/transition/floatDown'
import uploadImg from '../../components/popups/uploadImg'
import passwordChange from '../../components/popups/passwordChange'
export default {
    props: ['userId'],
    //type, title, text, footer
    created(){
        this.initialize();
    },

    data() {
        return {
            userData: {},
            code: '',
            popupActive: false,
            passChangePopup: false,
            isActivating: false,
        }
    },

    computed:{
        remainingDate(){
            if(this.userData){
                const remainingTime =new Date(this.userData.expirationDate).getTime() - Date.now();
                if(remainingTime < 0){
                    return 0
                } else {
                    return Math.round(remainingTime/(3600*24*1000))
                }
            }
            return 0;
        },
        color(){
            if(this.userData.userLevel){
                return {
                    'cyan darken-1' : this.userData.userLevel === 'basic',
                    'amber darken-1' : this.userData.userLevel === 'standard',
                    'deep- orange darken-1' : this.userData.userLevel === 'premium',
                    'red darken-1' : this.userData.userLevel === 'enterprise',
                }
            }
            return false;
        },
        avatar(){
            if(!this.userData.avatarUrl){
                return `${process.env.VUE_APP_PORT}/public/images/user.png`
            } else {
                return `${process.env.VUE_APP_PORT}/`+ this.userData.avatarUrl
            }
        }
    },

    filters:{
        dateFilter(value){
            if(value){
                return value.split('T')[0].split('-').reverse().join('-');
            }
        },
        lengthFilter(value){
            if(value){
                return value.length
            }
        }
    },
    methods:{
        activePopup(){
            this.popupActive = true
        },
        successHandler(avatar){
            this.userData.avatarUrl = avatar;
            this.initialize();
        },
        initialize(){
            fetch(`${process.env.VUE_APP_PORT}/userDash/${this.userId}`,{
                headers:{
                    'Authorization': 'Bearer '+ this.$store.state.token
                }
            }).then(resp=>{
                    return resp.json()
                }).then(resData=>{
                    if(status === 'fail'){
                        return this.firePopup('error', 'Phát hiện lỗi', resData.msg)
                    }
                    this.userData = resData.user;
                    this.$store.commit('createUserData', resData.user)
                }).catch(err=>{
                    throw err
                })
        },
        activateLicense(){
            this.isActivating = true;
            fetch(`${process.env.VUE_APP_PORT}/userDash/update-license`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer '+this.$store.state.token
                },
                body: JSON.stringify({
                    key: this.code,
                })
            }).then(resp=>{
                return resp.json();
            }).then(resData=>{
                this.isActivating = false;
                if( resData.status === 'fail'){
                    this.firePopup('error', 'Lỗi kích hoạt', resData.msg);
                } else {
                    this.firePopup('success', 'Kích hoạt thành công', resData.msg);
                    this.initialize();
                }
            }).catch(err=>{
                this.firePopup('info', 'Lỗi server', err)
                throw err
            })
        },
        deleteContact(contactId){
            fetch(`${process.env.VUE_APP_PORT}/userDash/contact`,{
                method: 'DELETE',
                headers:{
                    'content-type': 'application/json',
                    'Authorization': 'Bearer '+this.$store.state.token
                },
                body: JSON.stringify({
                    contactId: contactId,
                })
            }).then(resp=>{
                return resp.json();
            }).then(resData=>{
                if(resData.status === 'success'){
                    this.firePopup('success', 'Xóa thành công', resData.msg)
                    this.initialize()
                }
            }).catch(err=>{
                this.firePopup('error', 'Có lỗi server', err.err.msg);
                throw err
            })
        }
    },
    components:{
        floatDown,
        uploadImg,
        passwordChange
    }
}
</script>

<style lang="scss">
    .user{
        display: flex;
        flex-direction: column;
        align-items: center;

        &__wel{
            font-size: 2rem;
            font-weight: 600;
            margin-top: 5rem;
            margin-bottom: 6rem;
            text-align: center;
        }

        &__img{
            height: 14rem;
            width: 14rem;
            border-radius: .7rem;
            object-fit: cover
        }

        &__info{
            display: flex;
            justify-content: space-between;
            &-gr{
                &:not(:first-child){
                    margin-top: 2rem;
                }
                
            }
            @media screen and (max-width: 600px){             
                flex-direction: column;
                align-items: center;
                text-align: center;
            }
        }
        &__left{
            margin-right: 5rem;
            position: relative;
            @media screen and (max-width: 600px){             
                margin-right: 0;
                margin-bottom: 2rem;
            }
        }
        &__right{
            @media screen and (max-width: 600px){             
                display: flex;
                flex-direction: column;
                align-items: center;
            }
            h5{
                color: #333;
                margin: 0;
            }
            h6{
                color: #666;
                
            }
        }
        &__btn{
            margin-top: 2rem;
        }
        &__edit-img{
            position: absolute;
            bottom: .8rem;
            right: .8rem;
            font-size: 2rem;
            color: rgb(240, 240, 240);
            cursor: pointer;
            height: 3rem;
            width: 3rem;
            display: flex;
            justify-content: center;
            align-items: center;
            border: solid 1px rgb(216, 216, 216);
            border-radius: 3px;
            
        }

        // for account section ********************************
        &__account{
            margin: 3rem 0;
            padding: 4rem 0rem;
            width: 65rem;
            display: grid;
            grid-template-columns: repeat(2,1fr);
            grid-template-rows: repeat(2,auto);
            grid-gap: 3rem;
            padding-bottom: 0;
            border-top: 6px solid rgb(20, 189, 211);
            margin-bottom: 0;
            @media screen and (max-width: 965px){
                grid-template-rows: repeat(3,auto);
                width: auto
            }
        }
        &__acc-left{
            padding-left: 2rem;
            @media screen and (max-width: 965px){
                grid-column: 1/3;
                grid-row: 1/2;
            }
        }
        &__type{
            color: #444;
            font-size: 1.3rem;
            text-transform: uppercase;
            margin-top: 0;
            span{
                color: rgb(255, 251, 234);
                background-color: rgb(0, 168, 98);
                padding: .5rem 1.5rem;
                text-transform: uppercase;
                border-radius: 5px;
                font-style: italic;
                margin-left: .3rem;
                display: inline-block;
                @media screen and (max-width: 600px){
                    margin-top: .3rem;
                }
            }
        }

        &__exp{
            margin-top: 2.5rem;
            color: #444;
            span{
                color: rgb(255, 0, 13);
                text-transform: uppercase;
                font-size: 1.2rem;  
                font-weight: 500;
                margin-left: .7rem;              
            }
        }

        &__acc-right{
            padding: 0 2rem;
            width: 200%;
            @media screen and (max-width: 965px){             
                grid-row: 2/3;
            }
            @media screen and (max-width: 400px){             
                width: 190%;
            }
        }
        &__acc--info{
            display: flex;
            align-items: center;
            &:not(:last-child){
                margin-bottom: 1.5rem;
            }
            h6{
                margin: 0;
                @media screen and (max-width: 965px){
                    // flex: 5;
                }
            }
            i{
                margin-right: 1.3rem;    
                font-size: 2.2rem;
                height: 3.5rem;
                width: 3.5rem;
                display: flex;
                justify-content: center;
                align-items: center;
                border-radius: 50%;
                border: solid 2px rgba(0, 141, 177,.4);  
                @media screen and (max-width: 965px){
                    // flex: 1         
                } 
            }
            .email{
                color: rgb(116, 239, 255)
            }
            .contact{
                color: rgb(255, 205, 130);
            }
            span{
                font-size: 1.6rem
            }
        }
        &__acc-bottom{
            grid-column: 1/3;
            padding: 2rem 0;
            background-color: #f3f3f3;
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-top: 2rem;
            h5{
                text-transform: uppercase;
                color: rgb(0, 124, 182);
                @media screen and (max-width: 965px){
                    font-size: 1.3rem
                }
            }
            p{
                margin-bottom: 2rem;
                text-align: center;
            }
        }
        &__acc-inp{
            width: 80%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            input{
                margin-bottom: 2rem !important;
                background-color: white !important;
                padding-left: 1.4rem !important;
            }
            button{
                align-self: center;
            }
        }
    }
    .contacts{
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 2rem;
        h4{
            margin-bottom: 3rem;
        }
    }
    
</style>

