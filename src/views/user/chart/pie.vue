<template>
    <canvas id="myChart" width="400" height="400" ></canvas>
</template>


<script>
export default {
    data(){
        return{
            myChart: '',
        }
    },
   mounted() {
           const Chart = this.$Chart;
           const ctx = document.getElementById('myChart').getContext('2d');
            this.chart = new Chart(ctx, {
                // The type of chart we want to create
                type: 'doughnut',
    
                // The data for our dataset
                data: {
                    labels: ['Clicks', 'Dont Clicks'],
                    datasets: [{
                        label: 'Tỉ lệ click trên tỉ lệ bỏ qua',
                        backgroundColor: ['#46b7a0', '#f68389'],
                        borderColor: 'white',
                        borderWidth: '7',
                        data: [ this.clickPercent, this.noneClickPer]
                    }],
                },
    
                // Configuration options go here
                options: {
                    title:{
                        display: true,
                        text: 'Phần trăm clicks trên lượt email gửi đi',
                        fontSize: 18,
                    }
                }
            });
           
   },

    computed:{
        userData(){
            return this.$store.state.userData;
        },

        clickPercent(){
            const clicksNum = this.userData.clicks;
            const emailSends = this.userData.emailSends;
            const percent = Math.ceil((clicksNum/emailSends)*100);
            return percent;
        },

        noneClickPer(){
            return 100 - this.clickPercent;
        }
   }
}
</script>


<style lang="scss">

</style>

