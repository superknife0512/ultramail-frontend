<template>
    <p v-if="appear" 
        class="text-darken-3 msg"
        :class="errorCon ? 'light-green-text' : 'red-text'">
        <i class="material-icons">
            {{ errorCon ? 'check_circle' : 'warning' }}
        </i>
        <slot></slot>
    </p>
</template>

<script>
export default {
    props:['appear', 'errorCon'],
}
</script>

