<template>
    <div class="gift">
        <div class="edit-prev">
            <v-loader v-if="isMount"></v-loader>
            <div class="edit-prev__body z-depth-3" v-if="!isMount">
                <div class="edit-prev__name" :style="bgColor">
                    <h5>{{ userGift.name }}</h5>
                </div>
                <img :src="imgLink" alt="cax" class="edit-prev__img">
                <div class="edit-prev__info">
                    <p class="edit-prev__desc">
                        {{ userGift.desc }}
                    </p>
                    <div class="edit-prev__unlock" :style="unlockColor">
                        <h6 class=""
                            :style="{color: color.hex}">Để nhận được tài liệu, bạn vui lòng điền đầy đủ thông tin bên dưới</h6>
                        <div class="row">
                            <div class="input-field col s12">
                                <label for="token">Mã nhận quà</label>
                                <input type="text" name="token" v-model="token">
                            </div>
                        </div>

                        <div class="row">
                            <div class="input-field col s12">
                                <label for="name">Nhập vào email của bạn</label>
                                <input type="email" name="email" v-model="email">
                            </div>
                        </div>
                        <div class="edit-prev__lock">
                            <button class="btn waves-effect light-effect" 
                                    :style="bgColor"
                                    @click="unlock"
                                    :disabled="!email || !token">
                                <i class="material-icons left">lock_open</i>
                                Mở khóa tài liệu
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props:['userId'],

    data(){
        return{
            userGift: '',
            token: '',
            email: '',
            isMount: true,
            isUnlock: false,
        }
    },

    created(){
        this.initialize();
    },

    methods:{
        unlock(){
            if(this.token === this.userGift.token){
                this.isUnlock = true;
            }
        },

        initialize(){
            fetch(`${process.env.VUE_APP_PORT}/userDash/gift/${this.userId}`,{
                method:'GET'
            }).then(resp=>{
                    return resp.json()
                }).then(resData=>{
                    this.isMount = false
                    if(resData.status === 'fail'){
                        return this.firePopup('error', 'Phát hiện lỗi', resData.msg)
                    }
                    this.userGift = resData.user.gift;
                    this.$store.commit('createUserData', resData.user)
                }).catch(err=>{
                    this.firePopup('error', 'Phát hiện lỗi', err.err.msg)
                    this.isMount = false
                    throw err
                })

        }
    },

    computed: {
        imgLink(){
            if(this.userGift){
                if(!this.userGift.imgUrl){
                    return `${process.env.VUE_APP_PORT}/public/images/gift.jpg`
                }
                return `${process.env.VUE_APP_PORT}/${this.userGift.imgUrl}`
            }
            return false;
        },
        color(){
            if(this.userGift){
                return JSON.parse(this.userGift.color)
            }
            return false
        },
        bgColor(){
            return `backgroundColor : ${this.color.hex}` ;
        },
        unlockColor(){
            if(this.color){
                const color = this.color.rgba;
                return `backgroundColor : rgba(${color.r}, ${color.g}, ${color.b}, .13)`
            }
            return false
        }
    },
}
</script>


<style lang="scss">
.gift{
    .edit-prev{
            padding: 3rem;
            background-color: white;
            grid-column: 5/12;
            margin: 1rem;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            margin-bottom: 2rem;

            @media screen and (max-width:600px) {
                padding: 1rem;
            }

            &__body{
                max-width: 45rem;
            }
            &__name{
                padding: 1.5rem;
                display: flex;
                justify-content: center;
                background-color: #00afdb;
                color: white;
                text-transform: uppercase;
                border-top-left-radius: .4rem;
                border-top-right-radius: .4rem;
                h5{
                    font-size: 1.6rem;
                }
            }
            &__info{
                background-color: white;
                color: #555;
                margin: 0;
            }
            &__desc{
                padding: 2rem 1rem;
                margin: 0;
                margin-top: -.2rem;
            }
            &__img{
                width: 100%;
                height: 24rem;
                object-fit: cover;
            }
            &__unlock{
                background-color: #f1fbfd;
                padding: 2rem 1rem;
                h6{
                    color: rgb(0, 204, 240)
                }
            }
            &__lock{
                display: flex;
                justify-content: center;
            }
        }
}
</style>
