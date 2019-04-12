<template>
    <grid-layout class="adjust">
        <div class="email-editor">
            <form action="#" class="email-editor__body z-depth-3">
                <h5 class="blue-text text-darken-2">Chỉnh sửa trang quà tặng</h5>
                <br>
                 <div class="row">
                    <div class="input-field col s12">
                        <i class="material-icons prefix">text_rotation_none</i>
                        <!-- <label for="name">Tiêu đề trang</label> -->
                        <input type="text" class="validate" name="name"
                                v-model="name"
                                placeholder="Tiêu đề trang">
                    </div>
                    <slider-picker class="col s12" v-model="color">

                    </slider-picker>
                    <p class="email-editor__color">  {{ color.hex }}</p>
                 </div>

                  <div class="row">
                    <div class="input-field col s12">
                        <i class="material-icons prefix">subject</i>
                        <!-- <label for="desc">Miêu tả quà tặng</label> -->
                        <textarea name="desc" 
                                    placeholder="Miêu tả quà tặng"
                                    class="materialize-textarea" 
                                    data-length="120"
                                    v-model="desc"></textarea>
                    </div>
                 </div>

                  <div class="row">
                    <div class="file-field input-field">
                        <div class="btn btn-small ">
                            <span>Upload ảnh</span>
                            <input type="file" accept="image/*" ref="img">
                        </div>
                        <div class="file-path-wrapper">
                            <input class="file-path validate" type="text"
                                    @change="uploadImg" >
                        </div>
                    </div>
                 </div>

                 <div class="row">
                    <div class="input-field col s12">
                        <i class="material-icons prefix">cloud_download</i>
                        <!-- <label for="link">Link download quà tặng</label> -->
                        
                        <input type="text" v-model="link" placeholder="Link download quà tặng">
                    </div>
                 </div>

                  <div class="row">
                    <button class="btn btn-small waves-effect light-effect amber grey-text text-darken-4"
                            @click.prevent="generatorToken">
                        <i class="material-icons left">code</i>
                        Token generator
                    </button>
                    <p class="email-editor__token">{{ token }}</p>
                 </div>

                 <submit-btn :isLoading="isLoading" 
                            :disableCon="!name || !desc || !link"
                            @onSubmit="submit">
                    Submit
                 </submit-btn>
            </form>
        </div>

        <div class="edit-prev">
            <router-link tag="button" class="btn red darken-2" :to="`/gift/${userId}`">
                Preview
            </router-link>
            <br>
            <div class="edit-prev__body z-depth-2">
                <div class="edit-prev__name" :style="{ 'background-color': prevColor }">
                    <h5>{{ prevName }}</h5>
                </div>
                <img :src="prevImg" alt="cax" class="edit-prev__img">
                <div class="edit-prev__info">
                    <p class="edit-prev__desc">
                        {{ prevDesc }}
                    </p>
                    <div class="edit-prev__unlock" :style="unlockBg">
                        <h6 class="" :style="{color: color.hex}">Để nhận được tài liệu, bạn vui lòng điền đầy đủ thông tin bên dưới</h6>
                        <div class="row">
                            <div class="input-field col s12">
                                <label for="token">Mã nhận quà</label>
                                <input type="text" name="token" :value="token">
                            </div>
                        </div>

                        <div class="row">
                            <div class="input-field col s12">
                                <label for="name">Nhập vào email của bạn</label>
                                <input type="email" name="email">
                            </div>
                        </div>
                        <div class="edit-prev__lock">
                            <button class="btn waves-effect light-effect" :style='{backgroundColor: prevColor}'>
                                <i class="material-icons left">lock_open</i>
                                Mở khóa link
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </grid-layout>
</template>

<script>
export default {
    created(){
        if(this.userDataGift){
            this.name = this.userDataGift.name;
            this.desc = this.userDataGift.desc;
            this.imgUrl = this.userDataGift.imgUrl || '';
            this.link = this.userDataGift.downloadLink;
            this.token = this.userDataGift.token;
            this.color = JSON.parse(this.userDataGift.color);
        }
    },

    data(){
        return {
            isLoading: false,
            name: '',
            desc: '',
            link: '',
            token: '',
            imageTempUrl: '',
            imageFile: null,
            color: '',
            imgUrl: '',
        }
    },
    methods:{
        uploadImg(){
            const file = this.$refs.img.files[0];
            this.imageTempUrl = URL.createObjectURL(file);
            this.imageFile = file;
        },
        generatorToken(){
            const preToken = (Math.random() + 1);
            const token = preToken.toString(36).substr(2, 9).toUpperCase();
            this.token = token;
        },
        submit(){
            const formData = new FormData();
            formData.append('giftImg', this.imageFile);
            formData.append('name', this.name);
            formData.append('desc', this.desc);
            formData.append('token', this.token);
            formData.append('downloadLink', this.link);
            formData.append('color', JSON.stringify(this.color));

            this.isLoading = true;
            fetch(`${process.env.VUE_APP_PORT}/userDash/gift`,{
                method: 'PUT',
                headers:{
                    'Authorization':'Bearer '+this.$store.state.token
                },
                body: formData

            }).then(resp=>{
                return resp.json()

            }).then(resData=>{
                // console.log(resData);
                this.isLoading = false
                if(resData.status === 'fail'){
                    this.firePopup('error', 'Xuất hiện lỗi', resData.msg)
                } else if(resData.status === 'success') {
                    this.firePopup('success', 'Cập nhật thành công', resData.msg)
                    // hot update
                    this.$store.commit('createUserData', resData.userGift)
                }
            }).catch(err=>{
                this.isLoading = false
                throw err                
            })
        }
    },
    computed: {
        userDataGift(){
            return this.$store.state.userData.gift || undefined;
        },
        prevName(){
            return this.name || 'Tiêu đề cho trang quà tặng'
        },
        prevDesc(){
            return this.desc || 'Miêu tả cho trang quà tặng'
        },
        prevImg(){
            if(this.imageTempUrl === '' && this.imgUrl === ''){
                return `${process.env.VUE_APP_PORT}/public/images/gift.jpg`
            } else if (this.imageTempUrl === '' && this.imgUrl !== ''){
                return this.imgUrl
            } else if (this.imageTempUrl !== '' && this.imgUrl !== ''){
                return this.imageTempUrl
            } else {
                return this.imageTempUrl
            }
        },
        prevColor(){
            return this.color.hex || '';
        },
        unlockBg(){
            const bgColor = this.color.rgba || '';
            return `backgroundColor : rgba(${bgColor.r}, ${bgColor.g},${bgColor.b}, .15 )`
        },
        userId(){
            return this.$store.state.userId
        }
    },
}
</script>

<style lang="scss">
    .adjust{
        grid-column: 2/13;
        @media screen and (max-width: 600px){             
                grid-column: 1/13
            }

        background-color: #f3f3f3;
    }
    .email-editor{
        margin: 1rem;
        grid-column: 2/5;
        @media screen and (max-width: 1306px){
            grid-column: 5/9;
            grid-row: 1/2
        }
        @media screen and (max-width: 1000px){
            grid-column: 3/11;
            grid-row: 1/2
        }
        @media screen and (max-width: 600px){
            grid-column: 1/13;
            grid-row: 1/2
        }
        &__body{
            padding: 2rem 1.5rem;
            width: 100%;
            border-radius: .3rem;
            
            position: sticky;
            top: 5.4rem;
            
            background-color: white;

            @media screen and (max-width: 600px){
                padding: 1rem .5rem
            }
        }
        &__color{
            margin-left: 1rem;
        }
        &__token{
            padding: .7rem;
            border: solid 1px rgba($color: #000000, $alpha: .2);
            border-radius: .3rem;
        }
    }
    .edit-prev{
        padding: 4rem 3rem;
        border: 1px solid rgba($color: #000000, $alpha: .1);
        grid-column: 5/12;
        margin: 1rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin-bottom: 2rem;
        @media screen and (max-width: 1306px){
            grid-column: 2/12;
            grid-row: 2/3
        }
        @media screen and (max-width: 1306px){
            grid-column: 1/13;
            grid-row: 2/3;
            background-color: white;
        }

        @media screen and (max-width: 600px){
                padding: 1rem .5rem
        }

        &__body{
            max-width: 45rem;
        }
        &__name{
            padding: 1.5rem;
            display: flex;
            justify-content: center;
            background-color: #00afdb;
            color: white;
            text-transform: uppercase;
            border-top-left-radius: .4rem;
            border-top-right-radius: .4rem;
            h5{
                font-size: 1.6rem;
            }
        }
        &__info{
            background-color: white;
            color: #555;
            margin: 0;
        }
        &__desc{
            padding: 2rem 1rem;
            margin: 0;
            margin-top: -.2rem;
        }
        &__img{
            width: 100%;
            height: 24rem;
            object-fit: cover;
        }
        &__unlock{
            background-color: #f1fbfd;
            padding: 2rem 1rem;
            h6{
                color: rgb(0, 172, 240);
            }
        }
        &__lock{
            display: flex;
            justify-content: center;
        }
    }
</style>

