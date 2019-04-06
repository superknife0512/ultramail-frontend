<template>
    <transition name="float-down" :appear="appear" :mode="mode">
        <slot></slot>
    </transition>
</template>
<script>
export default {
    props:{
        appear:{
            type: Boolean,
        },
        mode:{
            type: String,
            default: 'out-in'
        }
    }
}
</script>

<style lang="scss">
    .float-down-enter-active {
        animation: float-down 1s  cubic-bezier(.28,.63,.06,1);
    }
    .float-down-leave-active {
        animation: float-down 1s cubic-bezier(.28,.63,.06,1) reverse;
    }
    .float-down{
        
    }
    @keyframes float-down {
        0% {
            opacity: 0;
            transform: translateY(-5rem);
        }
        100% {
            opacity: 1;
            transform: translateY(0rem);
        }
    }
</style>

