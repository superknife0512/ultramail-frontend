<template>
    <div  v-if="isActive" class="side__wrapper" >    
        <left-slide>
            <nav class="side__navbar" v-on-clickaway="hide" v-if="isActiveNav">
                <h5 class="center-align cyan-text side__brand">Ultra email logo</h5>
                <ul class="side__links">
                    
                    <router-link tag="li" 
                                :to="`/user/${userId}`"
                                class="side__item" 
                                exact
                                exact-active-class="active"
                                v-if="isLogin">
                        <a>
                            <i class="material-icons icon__dashboard left">dashboard</i> 
                            Bảng điều khiển
                        </a>
                    </router-link>

                    <router-link tag="li" 
                                :to="`/user/${userId}/create-email`"
                                class="side__item" 
                                exact
                                exact-active-class="active"
                                v-if="isLogin">
                        <a>
                            <i class="material-icons icon__gift left">redeem</i> 
                            Trang quà tặng
                        </a>
                    </router-link>

                    <router-link tag="li" 
                                to="/auth/login" 
                                class="side__item" 
                                exact
                                exact-active-class="active"
                                v-if="!isLogin">
                        <a>
                            <i class="material-icons left">account_box</i> 
                            Đăng nhập
                        </a>
                    </router-link>

                    <router-link tag="li" 
                                    to="/auth/signup" 
                                    class="side__item" 
                                    exact
                                    exact-active-class="active"
                                    v-if="!isLogin">
                        <a>
                            <i class="material-icons left">account_circle</i>
                            Đăng kí 
                        </a>
                    </router-link>

                    <li class="side__item" v-if="isLogin" @click="logout">
                        <a class="" href="#">
                            <i class="material-icons left">exit_to_app</i>
                            Thoát
                        </a>
                    </li>
                </ul>
            </nav>
        </left-slide>    
    </div>
</template>

<script>
import { directive as onClickaway } from 'vue-clickaway';
import leftSlide from './transition/leftSlide';

export default {
    props: ['isActive'],
    data(){
        return {
            isActiveNav: true
        }
    },
    methods:{
        hide: function(){
            this.isActiveNav = false;
            setTimeout(()=>{
                this.$emit('deActiveSidenav')
                this.isActiveNav = true;
            }, 400)
        },
        
        logout(){
            this.$store.commit('logoutHandler')
            this.$router.push('/auth/login')
        }
    },
    directives:{
        onClickaway,
    },
    components:{
        leftSlide
    },
    computed: {
        isLogin(){
            return this.$store.getters.loginState
        },
        userId(){
            return this.$store.state.userId
        },
    },
}
</script>

<style lang="scss">
    .side{
        &__wrapper{
            height: 100vh;
            width: 100vw;
            background-color: rgba(0, 0, 0, .7);
            position: fixed;
            top: 0;
            left: 0;
            z-index: 1000;
            transition: all .3s;
            
        }
        &__navbar{
            background-color: white;
            height: 100vh;
            width: 23rem;
            position: absolute;
            top: 0;
            left: 0;
            @media screen and (max-width: 600px) {
                width: 16rem;
            }
        }
        &__links{
            display: flex;
            flex-direction: column;
            margin-top: 3rem;
            li{
                .active{
                    background-color: rgb(190, 247, 255);
                    a{
                        &:link{
                            color: rgb(0, 145, 170);
                        }
                    }
                }
            }
            @media screen and (max-width: 600px){
                margin-top: 1rem;
            }
        }
        &__item{
            a{
                &:link, &:visited{
                    color: #333;
                    font-size: 1.2rem
                }
                display: flex;
                align-items: center;
                padding: 0 3rem;
                @media screen and (max-width: 600px){
                    padding: 0 2rem;
                }
            }
        }
        &__brand{
            margin-top: 1.5rem;
        }
    }
    .icon{
        &__dashboard{
            color: rgb(255, 183, 116)
        }
        &__gift{
            color: rgb(176, 223, 67)
        }
    }
</style>


