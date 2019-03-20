<template>
    <div class="container">
        <div class="camp">
            <h4 class="cyan-text text-darken-5">Tạo mới một chiến dịch Email marketing</h4>
            <div class="camp__body">
                <a href="#">
                    <div class="camp__card z-depth-1" :style="bgImg">
                        <div class="camp__info">
                            <h6>Chiến dịch tiếng Anh loại 1</h6>
                            <p>Ngày tạo: 13/3/2019</p>
                        </div>
                    </div>
                </a>
               
                <div class="camp__new z-depth-3">
                    <h4>
                        <i class="material-icons new__icon">add_circle_outline</i>
                    </h4>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            imgUrl: 'https://genknews.genkcdn.vn/k:thumb_w/640/2016/img20160604190955076/rat-nhieu-nguoi-thich-yasuo-nhung-bi-mat-cua-yasuo-thi-bao-nhieu-nguoi-biet.jpg'
        }
    },
    computed:{
        bgImg(){
            return `backgroundImage: url('${this.imgUrl}')`
        }
    }
}
</script>

<style lang="scss">
    .camp{
        margin-top: 4rem;
        h4{
            margin-bottom: 4rem;
        }
        &__body{
            display: grid;
            grid-template-columns: repeat(auto-fit, 20rem);
            grid-gap: 3.5rem;
            @media screen and (max-width: 650px) {
                justify-content: center;   
            }
        }
        &__card{
            height: 20rem;
            width: 20rem;
            cursor: pointer;

            background-position: center;
            background-size: cover;
            transition: all .3s;

            border-radius: .7rem;
            overflow: hidden;

            display: flex;
            align-items: flex-end;
            

            &:hover{
                box-shadow: 1px 1px 19px 0px rgba(0,0,0,0.56);
            }
        }
        &__info{
            background-color: rgb(241, 252, 255);
            display: inline-block;
            width: 100%;
            padding: .5rem 1rem;
            h6{
                color: rgb(0, 168, 219);
                text-transform: uppercase;
            }
            p{
                color: #444;
            }
        }

        &__new{
            height: 20rem;
            width: 20rem;
            color: rgb(255, 180, 186);    
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: .7rem;
            h4{
                margin: 0;
                cursor: pointer;
                i{
                    font-size: 5rem
                }
            } 
        }
    }
</style>

