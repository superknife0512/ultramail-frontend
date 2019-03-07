<template>
    <button class="waves-effect waves-light btn pink signup__btn"
            @click.prevent="onSubmit"
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
    },
    methods:{
        onSubmit(){
            this.$emit('onSubmit')
        }
    }
}
</script>

<style lang="scss">
    .signup__btn{
        display: flex;
        justify-content: center;
    }
</style>



