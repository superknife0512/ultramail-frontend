<template>
    <div class="dashboard">
        <div class="overview">
            <div class="overview__wel">
                <h6>Xin chào {{ userData.name }} đã quay trở lại</h6>
                <i class="material-icons overview__name" 
                    :class="{'pink-text' : isNearExpire}">                    
                    {{ isNearExpire ? 'info' : 'check_circle'}}
                </i>
            </div>
            <div>
                <button class="btn waves-effect black-text light-effect amber overview__pass"
                        @click="passChangePopup = true">
                    <i class="material-icons left black-text">lock_open</i>
                    Đổi mật khẩu
                </button>
            </div>
        </div>

        <div class="section-1">

            <div class="static-1st z-depth-1">
                <v-loader v-if="!userData.name"></v-loader>
                <div class="static-1st__chart--body" v-if="userData.name">
                    <pie-chart class="static-1st__chart"></pie-chart>
                   
                </div>
                <div class="static-1st__chart-info" v-if="userData.name">
                    <p>Biểu đồ thể hiện số lượt click trên email chỉ cho bạn biết bằng
                        tỉ lệ mà người nhận click vào thư của bạn trên tổng số email mà bạn 
                        đã gửi đi. Từ đó đưa ra các nhận định phù hợp với chiến dịch
                        marketing mình đề ra.
                    </p>
                    <h6>Lượt click mail: <b class="static-1st__chart-click">{{ userData.clicks }}</b></h6>
                    <h6>Lượt gửi mail: <b class="static-1st__chart-send">{{ userData.emailSends }}</b> </h6>
                </div>
            </div>
            
            <div class="account z-depth-1">
                <h5 class="account__title">Thông tin tài khoản </h5>

                <v-loader v-if="!userData.name"></v-loader>
                <div class="account__detail" v-if="userData.name">
                    <h6 class="account__budget">
                        Tổng tiền đã dùng: <b>{{ userData.budget | priceFilter }}</b> VND
                    </h6>

                     <h6 class="account__date">
                        Thời gian sử dụng đến ngày: <b>{{ userData.expirationDate | dateFilter }}</b> 
                    </h6>

                    <h6 class="account__remain">
                        Thời gian còn lại: <b>{{ remainingDate }} ngày</b> 
                    </h6>
                </div>

                <div class="account__update" v-if="userData.name">
                    <h6>Nâng cấp tài khoản:</h6>
                    <input type="text" v-model="code" placeholder="Mã kích hoạt">
                    <submit-btn :isLoading="isActivating"
                                :disableCon="!code"
                                @onSubmit="activateLicense"
                                class="submitBtn">
                        Nâng cấp tài khoản
                    </submit-btn>
                </div>

                <span class="account__badge z-depth-2" v-if="userData.name"
                        :style="userLevelColor">
                    <b>{{ userData.userLevel }}</b> 
                    {{ transUserLevel }}
                </span>
            </div>

        </div>

        <div class="static-2nd z-depth-1">
            <v-loader v-if="!dataSet._id"></v-loader>
            <div class="static-2nd__chart" v-if="dataSet._id">
                <line-chart :datasets="dataSet"></line-chart>
            </div>
            <div class="static-2nd__info" v-if="userData._id">
                <p>
                    Là số lượt mà các bạn chia sẻ trang quà tặng của mình
                    cho mọi người đăng kí và tải về ebook, số lượt tải được thu 
                    thập theo từng ngày, dựa vào đó bạn có thể điều chỉnh phù hợp
                </p>
                <h6>
                    Trung bình có: <b>{{ average }}</b>  lượt tải
                </h6>
            </div>
        </div>
        <expiration-msg v-if="remainingDate === 0">
            Thời hạn sử dụng của tài khoản này đã hết, hãy nhanh chóng liên hệ
            với chúng tôi để gia hạn tài khoản!
        </expiration-msg>
        
        
        <password-change :popupActive="passChangePopup"
                        @closePassChange="passChangePopup=false"></password-change>

    </div>

        
</template>

<script>
import passwordChange from '../../components/popups/passwordChange'
import pieChart from './chart/pie.vue'
import lineChart from './chart/line'
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
            dataSet: '',
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
        
        average(){
            let arr = this.dataSet.dataCollection;
            if(arr.length === 0){
                arr = [0,0,0,0,0]
            }
            const sum = arr.reduce((a,b)=>{
                return a + b;
            })    
            return (sum/arr.length).toFixed(2);
        },

        isNearExpire(){
            if(this.remainingDate <= 5){
                return true
            }
            return false
        },

        avatar(){
            if(!this.userData.avatarUrl){
                return `${process.env.VUE_APP_PORT}/public/images/user.png`
            } else {
                return `${process.env.VUE_APP_PORT}/`+ this.userData.avatarUrl
            }
        },

        transUserLevel(){
            let userLevel = this.userData.userLevel;
            let translate ;
            switch (userLevel){
                case 'free':
                    translate = 'Miễn phí';
                    break;
                case 'basic' :
                    translate = 'Cơ bản';
                    break;
                case 'standard' :
                    translate = 'Tiêu chuẩn';
                    break;
                case 'premium' :
                    translate = 'Chuyên nghiệp';
                    break;
                case 'enterprise' :
                    translate = 'Doanh nghiệp';
                    break;
            }
            return translate;
        },

        userLevelColor(){
            let userLevel = this.userData.userLevel;
            let backgroundColor ;

            switch (userLevel){
                case 'basic' :
                    backgroundColor = `background-image: linear-gradient( 180deg, #00fff6, #1797f9)`;
                    break;
                case 'standard' :
                    backgroundColor = `background-image: linear-gradient( 180deg, #00e4ff, #6217f9)`;
                    break;
                case 'premium' :
                    backgroundColor = `background-image: linear-gradient( 180deg, #4e00ff, #f917d6)`;
                    break;
                case 'enterprise' :
                    backgroundColor = `background-image: linear-gradient( 180deg, #ffb400, #f91762)`;
                    break;
            }
            return backgroundColor
        },
        
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
        },
        priceFilter(value){
            value = value.toString();
            const numArrRev = value.split('').reverse('');
            let finalArr = [] ;
            let count = 0;
            
            for(let i = 0; i< numArrRev.length; i++ ){
                if(count < 3){
                    count ++;
                    finalArr.push(numArrRev[i]);
                } else {
                    count = 0;
                    finalArr.push('.');
                    i--
                }
            }

            return finalArr.reverse().join('');
        }
    },
    
    methods:{
        activePopup(){
            this.popupActive = true
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
                    this.dataSet = resData.userData;
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
    },
    components:{
        passwordChange,
        pieChart,
        lineChart
    }
}
</script>

<style lang="scss">
    %shadow {
         box-shadow: 6px 6px 29px -10px rgba(0,0,0,0.57);
    }
    .submitBtn{
        margin-top: 1rem;
    }
    .container{        
        grid-column: 3/11;
        @media screen and (max-width: 667px){             
                grid-column: 1/13;
            }
    }
    
    .dashboard{
        background-color: #f3f3f3;
        width: 100%;
        grid-column: 2/13;
        @media screen and (max-width: 600px) {
            grid-column: 1/13
        } 
    }

    .overview{
        background-color: #ecebeb;
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 8rem;
        padding: 0 5rem;
        width: 100%;

        @media screen and (max-width: 1670px) {
            padding: 0 3rem;
        }   
        @media screen and (max-width: 864px) {
            flex-direction: column;
            padding: 2rem;
            height: auto;
        } 

        

        &__wel{
            color: #444;
            display: flex;
            align-items: center;
            h6{
                margin: 0;
                font-size: 1.4rem;
            }
        }
        &__name{
            color: #19c794;
            margin-left: 1rem;   
            font-size: 1.8rem;         
        }
        &__pass{
            @media screen and (max-width: 1300px) {
                margin-top: 1.2rem;
                margin-bottom: 1.2rem;
            } 
        }
    }

    .section-1{
        margin: 2rem 5rem;
        margin-top: 3rem;
        display: flex;  
        @media screen and (max-width: 1670px) {
            margin: 2rem 3rem;
        }  
        @media screen and (max-width: 1565px) {
            flex-direction: column;
            align-items: center;
        }     
        @media screen and (max-width: 667px) {
            margin: 2rem 1rem;
        }       
    }

    .static-1st{
        height: auto;
        background-color: white;
        margin-right: 1rem;
        flex: 6;
        padding: 2.5rem;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: all .5s;
        @media screen and (max-width: 1565px) {
            margin-bottom: 2.5rem;
        }  
        
        @media screen and (max-width: 1300px) {
            flex-direction: column;            
            margin-right: 0;
        } 

        &__title{
            color: #fa6639;
            font-weight: 100;
            text-transform: uppercase
        }
        &:hover{
            @extend %shadow;
        }

        &__chart{
            height: 30rem;
            width: 30rem;
            &--body{
                display: flex;
                flex-direction: column;
                align-items: center;
                h6{
                    color: rgb(90, 90, 90);
                    margin-top: 1rem;
                    font-weight: 100;
                }
                @media screen and (max-width: 667px) {
                    width: 20rem;
                } 
            }
        }
        &__chart-info{
            padding: 2rem;
            font-size: 1.3rem;
            font-weight: 400;

            p{
                color: #555;
                font-size: 1.2rem
            }

            h6{
                color: #555;
                b{
                    font-size: 1.5rem;
                    font-weight: 500;
                    margin-left: 0.5rem;
                }
            }
        }
        &__chart-click{
            color: #46b7a0
        }
        &__chart-send{
            color: #ff758c
        }
    }

    .account{
        flex: 4;
        background-color: white;
        margin-left: 1rem;
        padding: 2.5rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        position: relative;
        transition: all .3s;
         @media screen and (max-width: 1565px) {
            width: 100%;
        }  
        @media screen and (max-width: 1300px) {
            margin-left: 0;
        }

        &:hover{
            box-shadow: 6px 6px 29px -10px rgba(0,0,0,0.57);
        }

        &__title{
            font-size: 2rem;
            color: #fa6639;
            text-transform: uppercase
        }
        &__detail{
            margin-top: 2.5rem;
            h6{
                font-size: 1.2rem;
                margin-bottom: 2rem;
            }
            
            b{
                font-size: 1.7rem;
                font-weight: 400
            }
        }
        &__date{

        }
        &__budget{
            b{
                font-size: 1.9rem;
                color:#f54d63;                
            }
        }
        &__update{
            margin-top: 2rem;
            h6{
                color: #f5b33a;
                font-size: 1.5rem;
                text-transform: uppercase;
            }
        }
        &__badge{
            position: absolute;
            background-image: linear-gradient(180deg, #15c4ac, #00fd42);
            width: 8.2rem;
            height: 8.2rem;
            display: flex;
            flex-direction: column;
            text-transform: capitalize;
            justify-content: center;
            align-items: center;
            border-radius: 50%;
            color: white;
            right: -2rem;
            top: -2rem;
            text-align: center;

            @media screen and (max-width: 667px) {
                width: 7rem;
                height: 7rem;
                right: 0rem;
                top: 0rem;
            } 

            b{
                font-size: 1.2rem;
                text-transform: uppercase;
                @media screen and (max-width: 667px) {
                    display: none;
                } 
            }
        }
    }

    .static-2nd{
        height: auto;
        padding: 2.5rem;
        background-color: white;
        margin: 0 5rem;
        margin-bottom: 4rem;
        display: flex;
        @media screen and (max-width: 1670px) {
            margin: 0rem 3rem;
        } 
        @media screen and (max-width: 1300px) {
            flex-direction: column
        } 
        @media screen and (max-width: 667px) {
            margin: 2rem 1rem;
        } 
        &__chart{
            width: 60%;
            margin-right: 2rem;
            @media screen and (max-width: 1300px) {
                margin-right: 0;
                width: 100%;
            } 
        }
        &__info{
            flex: 4;
            margin-top: 3rem;
            font-size: 1.2rem;
            b{
                font-size: 1.6rem;
                color: #f54d63;
                font-weight: 400
            }
        }
    }
    
</style>

