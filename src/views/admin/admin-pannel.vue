<template>
    <div class="grid-center">
            <h4 class="indigo-text">Admin pannel</h4>
            <ul class="tab z-depth-2">
                <li class="tab__item" 
                    :class="{'tab__item--active': activeTab == 'key'}"
                    @click="changeComponent('keyGen','key')">
                    <a href="#" class="tab__link">Key generator</a>
                </li>
                <li class="tab__item"
                    :class="{'tab__item--active': activeTab == 'template'}"
                    @click=" changeComponent('templateEdit', 'template')">
                    <a href="#" class="tab__link">Template</a>
                </li>
                <li class="tab__item"
                    :class="{'tab__item--active': activeTab == 'user'}"
                    @click="changeComponent('userInfo', 'user')">
                    <a href="#" class="tab__link">user</a>
                </li>
                <li class="tab__item"
                    :class="{'tab__item--active': activeTab == 'modify-temp'}"
                    @click="changeComponent('modifyTemp', 'modify-temp')">
                    <a href="#" class="tab__link">Modify template</a>
                </li>
            </ul>
        
            <component :is="componentId" @editTemp="editTemplate"></component>
    </div>
</template>

<script>
import keyGen from './keyGen.vue'
import templateEdit from './TemplateEdit.vue'
import userInfo from './userInfo.vue'
import modifyTemp from './modify-temp.vue'
export default {
    data(){
        return{
            activeTab: 'key',
            componentId: 'keyGen',
        }
    },

    components:{
        keyGen,
        templateEdit,
        userInfo,
        modifyTemp
    },

    methods:{
        changeComponent(compId, tabActive){
            this.componentId = compId;
            this.activeTab = tabActive;

            // change the editMode to false
            this.$store.commit('changeEditMode', {mode: false})
        },
        editTemplate(){
            this.componentId = 'templateEdit';            
        }
    }
}
</script>

<style lang="scss">
    .grid-center{
        grid-column: 3/12;
    }
    .tab{
        margin-top: 3rem;
        display: flex;
        @media screen and (max-width: 600px){             
                flex-direction: column;
            }

        &__item{
            padding: 1.5rem 2rem;     
            &:hover{
                background-color: rgb(220, 240, 241);
                cursor: pointer;
            } 

            &--active{
                background-color: rgb(223, 238, 247);
            }      
        }
        &__link{
            &:link, &:visited{
                text-transform: uppercase;
                font-size: 1.1rem;
                color: rgb(0, 156, 247);
            }
        }
    }
</style>

