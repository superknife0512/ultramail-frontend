<template>
    <div class="container">
        <h2>This is user board for user </h2>
    </div>
</template>

<script>
export default {
    data() {
        return {
        }
    },
    computed: {
        userId(){
            return this.$router.params
        }
    },
}
</script>
