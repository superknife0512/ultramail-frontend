<template>
    <transition-group name="fly" mode="out-in" :tag="theTable" appear>
        <slot></slot>
    </transition-group>
</template>

<script>
export default {
    props:{
        isTable: Boolean
    },

    computed:{
        theTable(){
            return this.isTable ? 'tbody' : '';
        }
    }
}
</script>


<style lang="scss">
    .fly-enter-active {
        animation: fly 1s  cubic-bezier(.28,.63,.06,1);
    }
    .fly-leave-active {
        animation: fly 1s cubic-bezier(.28,.63,.06,1) reverse;
    }
    @keyframes fly {
        0% {
            opacity: 0;
            transform: translateX(-3rem);
        }
        100% {
            opacity: 1;
            transform: translateX(0rem);
        }
    }
</style>

