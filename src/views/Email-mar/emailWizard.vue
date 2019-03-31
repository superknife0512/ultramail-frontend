<template>
    <div class="wizard">
        <email-header findWhat="Tìm kiếm template"
                        >
            <template v-slot:title>
                Tạo automation email
            </template>
        </email-header>

        <div class="wizard__body">

            <v-steps :stepActive="stepActive"
                    @changeStep="changeStep($event)"></v-steps>

            <keep-alive>
                <component :is="isComponent"
                            @editTemplate="isComponent = 'editTemplate'"
                            @chooseContact="changeStep(2)"
                            @timeSetup="changeStep(3)"
                            ></component>
            </keep-alive>
            
        </div>
    </div>
</template>


<script>
import emailHeader from '../../components/layouts/marketingHeaders'
import vSteps from '../../components/layouts/steps'
import templateChoose from './wizardComps/templateChoosing'
import editTemplate from './wizardComps/editTemplate'
import contactChoose from './wizardComps/contactChoosing'
import timeChoose from './wizardComps/timeChoosing'

export default {
    data(){
        return{
            stepActive: [1],
            isComponent:  `timeChoose`,
            automailInfo: '',
        }
    },

    components:{
        emailHeader,
        vSteps,
        templateChoose,
        editTemplate,
        contactChoose,
        timeChoose
    },
    created(){

    },
    methods:{
        changeStep(step){
            // if(step == 1){
            //     this.isComponent = 'templateChoose'
            //     this.stepActive = [1]
            // } else if (step == 2){
            //     if(this.checkEnough1){
            //         this.isComponent = 'contactChoose'
            //         this.stepActive = [1,2]
            //     } else {
            //         this.firePopup('warning', 'Cảnh báo','Hãy chọn template ở bước 1 trước khi tới bước 2',)
            //     }
            // } else if(step == 3){
            //     if(this.checkEnough2){
            //         this.isComponent = 'timeChoose'
            //         this.stepActive = [1,2,3]
            //     } else {
            //         this.firePopup('warning', 'Cảnh báo','Bạn hãy điền đầy đủ thông tin ở bước 2 trước khi tới bước 3',)
            //     }
            // }
        }
    }, 
    
    computed:{
        checkEnough1(){
            const automailInfo = this.$store.state.automail;
            if(automailInfo.customTemplate){
                return true
            }
            return false
        },
        checkEnough2(){
            const automailInfo = this.$store.state.automail;
            if(!automailInfo.subject || !automailInfo.contacts ) {
                return false
            }
            return true
        }
    }
}
</script>


<style lang="scss">
    .wizard{
        grid-column: 2/13;
        
        @media screen and (max-width: 667px) {
            grid-column: 1/13;
        }

        &__body{
            margin: 3rem 5rem;

            @media screen and (max-width: 1030px) {
                margin: 2rem 1rem;
            }
        }        
    }  

</style>


