<template>
    <div class="emailmar">
        <email-header findWhat="Tìm automation email">
            <template v-slot:title>
                Khởi động chiến dịch
            </template>
        </email-header>
        
        <div class="emailmar__body">
            <div class="emailmar__header">
                <h4 class="emailmar__title">
                    Automation email
                </h4>
                <router-link :to="`/campaign/${campaignId}/wizard`"
                            tag="button"
                            class="btn waves-effect waves-light blue lighten-1 emailmar__btn">
                            Tạo mới
                </router-link>
            </div>

        <div class="emailmar__list">
            <div class="emailmar__list-badge z-depth-1">

                <div class="emailmar__icon z-depth-1" >
                    <svg >
                        <use xlink:href="../../assets/campaign.svg#icon-time"></use>
                    </svg>
                </div>

                <div class="emailmar__list-item">
                    <p class="emailmar__mini-title">
                        Tên
                    </p>
                    <h6 class="emailmar__name">
                        Chiến dịch quảng cáo lần 1
                    </h6>
                </div>

                <div class="emailmar__list-item">
                    <p class="emailmar__mini-title">
                        Thời gian
                    </p>
                    <h6 class="emailmar__time">
                        12-3-2019 <br>
                        22h30 p.m
                    </h6>
                </div>

                <div class="emailmar__list-item">
                    <p class="emailmar__mini-title">
                        Liên lạc
                    </p>
                    <h6 class="emailmar__contact">
                        23 trên 25 <br>
                        contacts
                    </h6>
                </div>

                <div class="emailmar__list-item">
                    <p class="emailmar__mini-title">
                        Template
                    </p>
                    <h6 class="emailmar__temp">
                        Basic template 1
                    </h6>
                </div>

            </div>             
        </div>
        </div>

    </div>
</template>

<script>
import emailHeader from "../../components/layouts/marketingHeaders";
export default {
    props:['campaignId'],
    components:{
        emailHeader
    },
    computed:{
    }
}
</script>


<style lang="scss">
    %each-item{
        margin: 0;
        margin-left: 1rem;
        font-size: 1.3rem;
        line-height: 1.3;
    }

    .emailmar{
        grid-column: 2/13;

        &__body{
            margin: 3.5rem 5rem;
        }
        &__header{
            display: flex;
            align-items: center;
        }
        &__title{
            color: #0ab498;
            margin: 0;
            margin-right: 2rem;
        }
        &__list{
            margin-top: 4rem;
        }
        &__list-badge{
            height: 6.5rem;
            background-color: white;
            display: flex;
            align-items: center;
            justify-content: space-evenly;   
            position: relative;
            max-width: 92%;
            cursor: pointer;

            &:not(:last-child){
                margin-bottom: 2rem;
            }

            &::before{
                content: "";
                height: 100%;
                width: 1rem;
                background-color: #35e796;
                position: absolute;
                top: 0;
                left: 0;
            }
        }

        &__icon{
            height: 3.5rem;
            width: 3.5rem;
            background-color: #47a1e6;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;            
            position: absolute;
            top: -1rem;
            right: -1rem;

            svg{
                fill: white;
                height: 2.5rem;
                width: 2.5rem;
            }
        }

        &__list-item{
            display: flex;
            align-items: flex-start;
        }
        &__mini-title{
            font-size: 1.1rem;
            color: #b1b1b1;
            margin: 0;
        }
        &__name{
            @extend %each-item;
            color: #ff5b85;            
            width: 60%;            
            text-transform: capitalize;
        }
        &__time{
            @extend %each-item;
            color: #47a1e6;
        }
        &__contact{
            @extend %each-item;
            color: #444;
        }
        &__temp{
            @extend %each-item;
            color: #444;
            width: 51%;
        }
    }
</style>

