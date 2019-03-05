<template>
    <transition name="slide-left">
        <slot></slot>
    </transition>
</template>

<style lang="scss">
    .slide-left-enter-active {
        animation: slide-left-in .5s;
    }
    .slide-left-leave-active {
        animation: slide-left-out .5s;
    }
    @keyframes slide-left-in {
        0% {
            transform: translateX(-30rem);
        }
        100% {
            transform: translateX(0rem)
        }
    }

    @keyframes slide-left-out {
        0% {
            transform: translateX(0);
        }
        100% {
            transform: translateX(-30rem)
        }
    }
</style>

