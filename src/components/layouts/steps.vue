<template>
    <div class="steps">
        <h5 class="steps__title">automation mail progression</h5>
        <div class="steps__body">
            <div class="steps__item" 
                :class="{'steps__active': stepActive.includes(1)}"
                @click="changeStep(1)">
                <h6>1</h6>
            </div>
            <div class="steps__item" 
                :class="{'steps__active': stepActive.includes(2)}"
                @click="changeStep(2)">
                <h6>2</h6>
            </div>
            <div class="steps__item" 
                :class="{'steps__active': stepActive.includes(3)}"
                @click="changeStep(3)">
                <h6>3</h6>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props:{
        stepActive:{
            type: Array,     
            default: function(){
                return []
            }
        }
    },

    data(){
        return{

        }
    },

    methods:{
        changeStep(step){
            this.$emit('changeStep', step)
        }
    }
        
}
</script>


<style lang="scss">
    .steps{
        margin: 4rem auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 1.5rem 2rem;
        border: 1px solid rgba(0, 0, 0, .2);
        border-radius: .5rem;
        width: 55%;
        @media screen and (max-width: 1030px) {
            width: 90%;
        }

        &__title{
            color: #777777;
            text-transform: uppercase;
            font-size: 1.5rem;
        }
        &__body{
            display: flex;
            margin-top: 2rem;
            display: flex;
            position: relative;

            &::after{
                content: "";
                height: 3px;
                width: 100%;
                background-color: #6ca6fe;
                z-index: 40;
                position: absolute;
                top: 1.6rem;
                left: 0;
            }
        }
        &__item{
            height: 3.5rem;
            width: 3.5rem;
            background-color: white;
            border: 2px solid #6ca6fe;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 50%;
            z-index: 50;
            cursor: pointer;
            &:not(:last-child){
                margin-right: 5rem;
            }

            h6{
                color: #6ca6fe;
                margin: 0;
                font-size: 1.4rem;
            }
        }
        &__active{
            background-color: #6ca6fe !important;
            h6{
                color: white;
            }
        }
    }
</style>

