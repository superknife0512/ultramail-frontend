<template>
    <div class="grid">
        <slot></slot>
    </div>
</template>

<style lang="scss">
    .grid{
        display: grid;
        grid-template-columns: minmax(10rem, 1fr) repeat(10, minmax(max-content,1fr)) minmax(1rem, 1fr);
        grid-template-rows: auto;
    }
</style>

