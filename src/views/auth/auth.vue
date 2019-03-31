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
        grid-column: 1/13;
        background-color: #e9e9e9;
        background-position: center;
        background-size: cover;
        height: 94vh;
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>

