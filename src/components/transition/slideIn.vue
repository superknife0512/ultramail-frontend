<template>
    <transition name="slideIn" appear :mode="mode">
        <slot></slot>
    </transition>
</template>

<script>
export default {    
    props:{
        mode: {
            type: String,
            default: 'out-in'
        }
    }
}
</script>


<style lang="scss">
    .slideIn-enter-active {
        animation: slideIn .6s cubic-bezier(.28,.63,.06,1);
    }
    .slideIn-leave-active {
        animation: slideIn .6s cubic-bezier(.28,.63,.06,1) reverse;
    }
    @keyframes slideIn {
        0% {
            transform: translateX(50rem)
        }
        100% {
            transform: translateX(0)
        }
    }
</style>

