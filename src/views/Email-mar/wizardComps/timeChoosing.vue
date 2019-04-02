<template>
    <div class="time">
        <h5 class="time__title">Bước 3. Chọn thời gian gửi thư</h5>
        <p>Cick vào khung thời gian bên dưới để lựa chọn thời gian bạn muốn gửi email tới
            cho người nhận
        </p>
        <div class="time__body">
            <h6>Thời gian: <i>{{ date | dateFilter }}</i> </h6>
            <date-pick v-model="date"
                        :displayFormat="'DD.MM.YYYY HH:mm'"
                        pickTime
                        format="YYYY-MM-DD HH:mm"
                        :hasInputElement="false"></date-pick>
        </div>
        <br>
        <button class="btn waves-effect indigo"
                @click="addDate">
            Tạo email
        </button>
        
    </div>
</template>

<script>
import DatePick from 'vue-date-pick';
import 'vue-date-pick/dist/vueDatePick.css';

export default {
    created(){
        this.date = this.initialDate;
    },

    components: {
        DatePick
    },
    data(){
        return {
            date: '2019-03-01 16:30'
        }
    },

    computed:{
        calculateDate(){
            const date = new Date(this.date).getTime() + 7*1000*60*60;
            return new Date(date).toISOString();
        },
        initialDate(){
            const now = new Date()
            const newDate = now.toISOString();
            const dateArr = newDate.split('T');
            const date = dateArr[0];
            const time = dateArr[1].split('').slice(0,5).join('');
            return `${date} ${time}`
        }
    },

    methods:{
        addDate(){
            const payload = {
                field: 'dateTime',
                value: this.calculateDate
            }
            this.$store.commit('setAutomail', payload)
            this.$emit('revision')
        }
    },

    filters:{
        dateFilter(value){
            let date = value.split(' ')[0];
            const time = value.split(' ')[1];
            date = date.split('-').reverse().join('-');
            return `${time} ngày ${date}`
        }
    }
}
</script>

<style lang="scss">
    .time{
        max-width: 30%;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        @media screen and (max-width: 1300px) {
            max-width: 50%;
        }

         @media screen and (max-width: 870px) {
            max-width: 80%;
        }

        &__title{
            color: rgb(255, 75, 105);
            font-size: 1.5rem;
            text-align: center;
        }
        p{
            color: #555;
            margin-bottom: 2rem;
            text-align: center;
        }
        input{
            padding-right: 30px;
            border: 1px solid rgba(0,0,0,.2);
            border-radius: 5px;
        }
        h6{
            margin-bottom: 1.2rem;
        }
    }
    .vdpTimeUnit{
        input{
            height: 29px !important;
        }
    }
</style>


