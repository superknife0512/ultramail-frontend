<template>
    <div class="sidebar">
        <upload-img :popupActive="popupActive"
                    @deactivePopup="popupActive = false"
                    @success="successHandler($event)"></upload-img>
        <div class="sidebar__logo">
            <router-link to="#" tag="h5" class="sidebar__brand">
                <img src="../assets/Logo.png" alt="logo" height="90">
            </router-link>
            <a href="#" class="sidebar__icon--resp" @click="activeNav" >
                <svg class="sidebar__icon">
                    <use xlink:href="../assets/icons.svg#icon-grid"></use>
                </svg>
            </a>
        </div>
        <div class="sidebar__face">
            <img :src="avatar"
                class="sidebar__face--img"
                @click.prevent="popupActive = true">
            <button class="btn btn-small" @click="logout">Đăng xuất</button>
        </div>
        
        <router-link tag="div" :to="`/user/${userId}`" 
                    class="sidebar__item"
                    exact
                    exact-active-class="sidebar--active">
            <svg class="sidebar__icon">
                <use xlink:href="../assets/icons.svg#icon-display"></use>
            </svg>
            <p>Dashboard</p>
        </router-link>

        
        <router-link tag="div" :to="`/user/${userId}/contact`" class="sidebar__item"
                    exact
                    exact-active-class="sidebar--active">
            <svg class="sidebar__icon">
                <use xlink:href="../assets/icons.svg#icon-users"></use>
            </svg>
            <p>Liên hệ</p>
        </router-link>

        <router-link tag="div" :to="`/user/${userId}/create-email`" class="sidebar__item"
                    exact
                    exact-active-class="sidebar--active">
            <svg class="sidebar__icon">
                <use xlink:href="../assets/icons.svg#icon-gift"></use>
            </svg>
            <p>Quà tặng</p>
        </router-link>

        <router-link tag="div" to="/campaign" class="sidebar__item"
                    exact
                    exact-active-class="sidebar--active">
            <svg class="sidebar__icon">
                <use xlink:href="../assets/icons.svg#icon-flag"></use>
            </svg>
            <p>Marketing <br> campaign</p>
        </router-link>

        <router-link tag="div" to="/admin" class="sidebar__item"
                    exact
                    v-if="isAdmin"
                    exact-active-class="sidebar--active">
            <svg class="sidebar__icon" style="fill: #fe3f7e">
                <use xlink:href="../assets/icons.svg#icon-shield"></use>
            </svg>
            <p>Admin</p>
        </router-link>

    </div>
</template>

<script>
import uploadImg from '../components/popups/uploadImg'

export default {
    data() {
        return {
            popupActive: false,
        }
    },
    computed:{        
        isAdmin(){
            return this.$store.state.userId === '5c9614fb2206af03f417171c';
        },
        userId(){
            return this.$store.state.userId
        },
        avatar(){
            const avatar = this.$store.state.userData.avatarUrl;
            if(!avatar){
                return `${process.env.VUE_APP_PORT}/public/images/user.png`
            }
            return avatar;
        },
    },
    methods:{
        activeNav(){
            this.$emit('activeNav')
        },

        successHandler(avatar){
            this.$store.commit('updateAvatar',avatar);
            this.$forceUpdate();
        },
        logout(){
            this.$store.commit('logoutHandler')
        }
        
    },
    components:{
        uploadImg
    }
}
</script>


<style lang="scss">
    $color-primary: #e4e4e4;
    $color-secondary: #fe3f7e;

    .sidebar--active{
        background-color: #f3f3f3;
        width: 100% !important;
        border: none;
        p{
            color: #333
        }
        .sidebar__icon{
            fill: #333;
            height: 2.5rem;
            width: 2.5rem;
        }
    }

    .sidebar{
        background-color: rgb(53, 53, 53);
        color: white;
        display: flex;
        flex-direction: column;
        align-items: center;
        min-height: 100vh;
        position: sticky;
        z-index: 200;
        @media screen and (max-width: 667px) {
            flex-direction: row;
            min-height: 8rem;
            justify-content: space-around;
        } 

        &__logo{
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 1.8rem 0;
            color: #8af9fd;
            border-bottom: 1px solid rgba(255, 255, 255, 0.3);
            @media screen and (max-width: 667px) {
                border-bottom: 0 solid #000;
            } 
        }

        &__brand{
            cursor: pointer;
        }

        &__face{
            padding: 1.8rem 0;
            border-bottom: 1px solid rgba(255, 255, 255, 0.3);
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            cursor: pointer;
            @media screen and (max-width: 667px) {
                width: auto;
            } 
            &--img{
                
                height: 5.5rem;
                width: 5.5rem;
                object-fit: cover;
                object-position: center;
                border-radius: 50%;
                margin-bottom: 1rem;
            }
        }
        &__item{
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 2rem 1.2rem;
            cursor: pointer;
            width: 85%;
            transition: all .2s;
            @media screen and (max-width: 667px) {
               display: none;
            } 
            &:not(:last-child){
                border-bottom: 1px solid rgba(255, 255, 255, 0.3);
            }
            p{
                margin: 0.8rem;
                margin-bottom: 0;
            }
            &:hover{
                background-color: rgb(134, 134, 134);
                width: 100%;
                border: none;
            }
        }
        &__icon{
            height: 2.3rem;
            width: 2.3rem;
            fill: $color-primary;

            &--resp{
            }
        }
    }
</style>


