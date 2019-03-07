<template>
        <i class="material-icons left spinAnim">
            update
        </i>
</template>

<style lang="scss">
    .spinAnim{
        animation: spinner 1s linear infinite;
        margin-right: .5rem;
        font-size: 2rem;
    }
    @keyframes spinner {
        0%{
            transform: rotate(0deg)
        }
        100%{
            transform: rotate(360deg)
        }
    }
</style>

