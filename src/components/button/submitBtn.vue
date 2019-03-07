<template>
    <button class="waves-effect waves-light btn pink signup__btn"
            :disabled="disableCon || isLoading">
        <spinner v-if="isLoading"></spinner>
        <slot></slot>
        <span v-if="isLoading">...</span>
    </button>
</template>

<script>
import spinner from './spinner.vue';
export default {
    props: ['disableCon', 'isLoading'],
    components:{
        spinner
    }
}
</script>

<style lang="scss">
    .signup__btn{
        display: flex;
        justify-content: center;
    }
</style>



