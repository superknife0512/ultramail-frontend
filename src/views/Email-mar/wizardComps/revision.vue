<template>
    <div class="review">
        <div class="review__wrapper">

            <h5 class="review__title">
                Bước 3.2. Duyệt lại nội dung của toàn bộ thư
            </h5><br>
            <submit-btn :isLoading="isLoading"
                        @onSubmit="automailCreate">
                Tạo automation mail
            </submit-btn>
        </div>
        <div class="review__body">
            <div class="review__item">
                <p class="review__mini-title">Tên automail</p>
                <h6 class="review__name">{{ automail.mailName }}</h6>
            </div>
            <div class="review__item">
                <p class="review__mini-title">Tiêu đề thư (sucject)</p>
                <h6 class="review__subject">{{ automail.subject }}</h6>
            </div>
            <div class="review__item">
                <p class="review__mini-title">Gửi từ</p>
                <h6 class="review__from">{{ automail.from }}</h6>
            </div>
            <div class="review__item">
                <p class="review__mini-title">Thời gian</p>
                <h6 class="review__time indigo-text">{{ automail.dateTime | dateTimeFilter }}</h6>
            </div>
            
            <div class="review__template">
                <p class="review__mini-title">Template: </p>
                <div v-html="automail.customTemplate" id="temp"></div>
            </div>
            <br>
            <div class="review__contact">
                <p class="review__mini-title">
                    Danh sách liên hệ (bao gồm: {{ automail.contacts.length }} người)
                </p>
                 <table>
                    <thead>
                        <tr>
                            <th>Stt</th>
                            <th>Tên</th>
                            <th>Email</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr v-for="(info, i) in automail.contacts" :key="info.email">
                            <td>{{i}}</td>
                            <td>{{ info.studentName }}</td>
                            <td>{{ info.studentEmail }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['campaignId'],
    data(){
        return{
            isLoading: false,
        }
    },
    computed:{
        automail(){
            return this.$store.state.automail
        }
    },

    filters:{
        dateTimeFilter(value){
            const dateArr = value.split('T');
            let date = dateArr[0];
            let time = dateArr[1];
            date = date.split('-').reverse().join('-');
            time = time.split('').slice(0,5).join('');
            return `${time} ngày 
                     ${date}`
        }
    },

    methods:{
        automailCreate(){
            this.isLoading = true
            fetch(`${process.env.VUE_APP_PORT}/campaign/${this.campaignId}`,{
                method: 'PUT',
                headers:{
                    'Authorization': 'Bearer '+this.$store.state.token,
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify({
                    automail: this.automail
                })
            }).then(resp=>{
                return resp.json()
            }).then(resData=>{
                this.isLoading = false;
                if(resData.status === 'success'){
                    this.firePopup('success', 'Thành công', resData.msg)
                    this.$router.push(`/campaign/${this.campaignId}`);
                }
            }).catch(err=>{
                this.firePopup('error', 'Có lỗi', 'Lỗi không xác định từ server')
                throw err
            })
        }
    }    
}
</script>

<style lang="scss">
.review{
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    &__wrapper{
        display: flex;
        align-items: center
    }
    &__title{
        color: rgb(235, 70, 120);
        font-size: 1.6rem;
        margin: 0;
        margin-right: 1rem;
    }
    &__body{
        margin-top: 3rem;
        width: 70%;
    }
    &__item{
        display: flex;
        align-items: flex-start;
        margin-bottom: 2rem;

        h6{
            margin: 0;
            margin-left: 1rem;
            font-size: 1.5rem;            
        }
    }
    &__mini-title{
        margin: 0;
        color: #888;
        font-size: 1.1rem;
    }
    &__name{
        color: #e7378f;
        text-transform: uppercase;
    }
    &__subject{
        text-transform: capitalize
    }
    &__from{
        font-size: 1.3rem !important;
    }
    &__time{
        font-size: 1.2rem !important;
    }
}
#temp{
    h1{
        font-size: 2rem
    }
    .divider{
        display: none;
    }
}
</style>


