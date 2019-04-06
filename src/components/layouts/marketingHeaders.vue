<template>
    <div class="campaign__header">
        <h4 class="campaign__title">
            <slot name="title"></slot>
        </h4>
        <div class="campaign__search">
            
            <input type="text" :placeholder="findWhat"
                    v-model="search" 
                    class="campaign__search--form"
                    @change="searchThing(search)">

            <svg class="campaign__search--icon">
                <use xlink:href="../../assets/campaign.svg#icon-search"></use>
            </svg>
        </div>
    </div>
</template>

<script>
export default {    
    props: {
        findWhat:{
            type: String,
            default: 'Tìm chiến dịch'
        }
    },
    data(){
        return {
            search:'',
        }
    },

    methods:{
        searchThing(searchData){
            this.$emit('searchThing', searchData)
        }
    }

}
</script>


<style lang="scss">
    .campaign{
        &__header{
            display: flex;
            align-items: center;
            justify-content: space-between;

            height: 10rem;
            padding: 0 5rem;
            background-image: linear-gradient( 30deg, #21D4FD, #B721FF);
            width: 100%;

            @media screen and (max-width: 820px) {
                flex-direction: column;
                padding: 2.5rem 1rem;
            }
        }
        &__title{
            color: white;
            text-transform: uppercase;
            font-weight: 300;
            margin: 0;
            font-size: 2rem;
        }
        &__search{
            display: flex;
            align-items: center;

            &--icon{
                fill: rgb(243, 243, 243);
                height: 2rem;
                width: 2rem;
            }

            &--form{
                width: 20rem !important;
            }

            input{
                color: white;
            }
        }
    }
</style>

