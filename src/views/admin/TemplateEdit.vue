<template>
    <grid-layout>
        <div class="btn-command">
            <button class="btn waves-effect amber black-text"
                    @click="isDisplay = true"> {{ editMode ? 'Update Template' : 'Create Template'}} </button>
        </div>        
        <temp-create-popup :inlinedHTML="inlinedHTML" :components="components"
                            :editMode="editMode"
                            :editedTemplate="editedTemplate"
                            v-if="isDisplay"
                            @deactivePopup="isDisplay = false"
                            @getTemplate="getTemplate"></temp-create-popup>

        <div class="template__canvas" id="gjs">
        </div>

    </grid-layout>
</template>

<script>
import gjsPresetNewsletter from 'grapesjs-preset-newsletter';
import tempCreatePopup from '../../components/popups/templateCreating'
export default {
    components:{
        tempCreatePopup
    },

    data() {
        return {
            editor: '',
            components: '',
            html: '',
            inlinedHTML: '',
            style: '',
            isDisplay: false,
            editedTemplate: '',
        }
    },

    mounted(){
        const SELF = this;
        this.editor = this.$grapesjs.init({
             // Indicate where to init the editor. You can also pass an HTMLElement
            container : '#gjs',
            assetManager:{
                // upload: `${process.env.VUE_APP_PORT}/admin/upload-asset`,
                uploadName: 'asset',
                uploadFile(e){
                    const file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
                    // console.log(file);
                    const formData = new FormData();
                    formData.append('asset', file)
                    fetch(`${process.env.VUE_APP_PORT}/admin/upload-asset`,{
                        method: 'POST',
                        headers:{
                            'Authorization': 'Bearer '+ SELF.$store.state.token,
                        },
                        body: formData
                    }).then(rep=>{
                        return rep.json()
                    }).then(resData=>{
                       SELF.editor.AssetManager.add(resData.data)
                    }).catch(err=>{
                        throw err
                    })
                }
            },
            plugins: [gjsPresetNewsletter],
            pluginsOpts: {
                    gjsPresetNewsletter: {
                    modalTitleImport: 'Cmm',
                    // ... other options
                    tableStyle : { height: '100px', margin: '0px auto 0px auto', padding: '0 0 0 0', width: '100%' }
                }
            },
        })

        const blockManager = this.editor.BlockManager;
        blockManager.get('button').set({
            content: `<a href="#" style=" background: #ff7800; color: white;
                        text-decoration: none;
                        padding: .5rem 1rem;
                        display: inline-block;
                        border-radius: 3px; ">Button
                        </a>`,
        })

        if(this.editMode === true){
            this.setComponents();
        }
        
    },
    methods:{
        getTemplate(){
            this.components = localStorage.getItem('gjs-components');
            this.style = localStorage.getItem('gjs-styles');
            this.html = localStorage.getItem('gjs-html');
            this.inlinedHTML = this.editor.runCommand('gjs-get-inlined-html');
        },

        setComponents(){
            const templateId = this.$store.state.editedTemplateId;
            this.editedTemplate = this.$store.getters.editedTemplate(templateId);
            const components = JSON.parse(this.editedTemplate.components);
            this.editor.setComponents(components);
        }
    },

    computed:{
        editMode(){
            return this.$store.state.editMode;
        }
    }
}
</script>


<style lang="scss">
    .template{
        &__title{
            grid-column: 2/5;
            margin-top: 2rem;
        }
        &__canvas{
            grid-column: 2/12;
            margin-bottom: 3rem;
            select{
                display: block !important
            }    
        }
        input{
                height: 1rem;
                border-bottom: none;
                padding: .5rem;
                display: flex;
                align-items: center;
        }

    }    

    .gjs-one-bg{
        background-color: #373d49
    }

    .demo{
        grid-column: 2/9;

    }

    .btn-command{
        grid-column: 3/10;
        margin: 2rem 0;
    }


</style>

