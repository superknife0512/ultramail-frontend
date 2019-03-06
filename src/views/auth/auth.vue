<template>
    <div class="auth-wrapper">
        <float-down :appear="true" >
            <router-view/>
        </float-down>
    </div>
</template> 

<script>
import floatDown from '../../components/transition/floatDown'
export default {
    components:{
        floatDown
    }
}
</script>


<style lang="scss">
    .auth-wrapper{
        background-image: url('../../assets/auth-page.jpg');
        background-position: center;
        background-size: cover;
        height: 94vh;
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>

