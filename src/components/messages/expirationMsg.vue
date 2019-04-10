<template>
    <div class="exp-msg">
        <i class="material-icons exp-msg__icon">info</i>
        <h6>
            <slot></slot>
        </h6>
    </div>
</template>

<style lang="scss">
    .exp-msg{
        display: flex;
        width: 100%;
        padding: 1.5rem 0;
        justify-content: center;
        align-items: center;
        position: fixed;
        top: 0rem;
        left: 0;
        background-color: rgb(235, 132, 146);
        z-index: 600;

        &__icon{
            margin-right: 1rem;
            color: #001741;
            font-size: 1.5rem;
        }
        h6{
            color: #001741;
            margin: 0;
        }
    }
</style>

