<template>
    <canvas id="CaxChart" height="320" width="600"></canvas>
</template>

<script>
export default {
    props: ['datasets'],
    data() {
        return {
            Chart:''
        }
    },

    mounted(){
        const ctx = document.getElementById('CaxChart').getContext('2d');
        const Chart = this.$Chart;
        this.Chart = new Chart(ctx, {
            type: 'line',
             data: {
                labels: ['1', '2', '3', '4', '5', '6', '7'],
                datasets: [{
                    label: '7 ngày gần nhất',
                    data: this.dataArr,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                title:{
                    display: true,
                    text: 'Số lượt tải về các phần quà trong 7 ngày gần nhất',
                    fontSize: '18'
                }
            }
        });
    },

    computed: {
        dataArr(){
            let maxLength;
            if(this.datasets){
                let data = this.datasets.dataCollection;
                if(data.length < 7) {
                    maxLength = data.length
                } else {
                    maxLength = 7
                }
                let newData = data.slice(data.length - maxLength,data.length);
                return newData;
            }
            return false;
        }
    },
}
</script>

<style lang="scss">
    #myChart{
        height: 450px;
    }
</style>



