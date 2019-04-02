<template>
    <button class="waves-effect waves-light btn signup__btn"
            @click.prevent="onSubmit"
            :disabled="disableCon || isLoading"
            :class="vClass">
        <spinner v-if="isLoading"></spinner>
        <slot></slot>
        <span v-if="isLoading">...</span>
    </button>
</template>

<script>
import spinner from './spinner.vue';
export default {
    props:{
        disableCon:{
            type: Boolean
        },
        isLoading:{
            type: Boolean,            
        },
        vClass:{
            type: String,
            default: 'pink'
        }
    },
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



