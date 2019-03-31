<template>    
    <ul class="pagination">
        <li :class="{'disabled': isDisableLeft}"
            @click="changePage(1)"><a href="#!">
            <i class="material-icons">chevron_left</i></a>
        </li>

        <li v-for="page in numPages" 
            :key="page"
            :class="{'active': curPage === page}"
            @click.prevent="changePage(page)">
            <a href="#">{{ page }}</a>
        </li>

        <li :class="{'disabled': isDisableRight}"
            @click="changePage(numPages)">
            <a href="#!"><i class="material-icons">chevron_right</i>
        </a></li>
    </ul>
</template>

<script>
export default {
    props: {
        perPage:{
            type: Number,
            default: 2
        },
        numPages:{
            type: Number,
            default: 3
        },
        page: {
            type: Number,
            default: 1
        }
    },

    data(){
        return{
            curPage: 1,
        }
    },
    
    methods:{
        changePage(page){
            this.curPage = page;
            this.$emit('changePage', page)
        }
    },

    computed:{
        isDisableLeft(){
            if(this.curPage === 1){
                return true
            } else {
                return false
            }
        },
        isDisableRight(){
            if(this.curPage === this.numPages){
                return true
            } else {
                return false
            }
        }
    }

}
</script>


<style lang="scss">
    .pagination{
        margin-top: 3rem;
    }
</style>

