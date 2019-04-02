<template>
    <div class="edit-temp">
        <h5 class="edit-temp__title">Bước 1.2. Chỉnh sửa template</h5>
        <p class="edit-temp__instruct">Tại đây bạn có thể tự do chỉnh sửa template và 
            nội dung theo ý muốn của mình. Thậm chí có thể thay đổi bố cục và 
            hình ảnh trong template. Nhấn <b>'lưu template'</b> để có thể sử dụng lại template nầy
            ở lần sau. Nhấn <b>'sử dụng template'</b> để dùng template này.
        </p>
        <div class="edit-temp__action">
            <button class="btn waves-effect waves-light cyan darken-1"
                    @click="createTemplate">
                Lưu template 
            </button>
            <button class="btn waves-effect waves-light amber black-text"
                    @click="useTemplate">
                Sử dụng template
            </button>
        </div>

        <div class="edit-temp__action">
            <div id="gjs"></div>
        </div>

        <template-create :components="components"
                        :inlinedHTML="html"
                        :editMode="false"
                        @deactivePopup="popupActive=false"
                        @getTemplateId="getTemplateId($event)"
                        v-if="popupActive"></template-create>
    </div>
</template>

<script>
import gjsPresetNewsletter from 'grapesjs-preset-newsletter';
import templateCreate from '../../../components/popups/templateCreating'
export default {
    components:{
        templateCreate
    },

    created(){
        setTimeout(() => {
            this.useTemplateId = this.editedTemplate._id;            
        }, 50);
    },

    data(){
        return{
            html: '',
            components:'',
            editor: '',
            popupActive: false,
            useTemplateId: '',
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

        this.setComponents();
               
    },

    computed:{
        editedTemplate(){
            const tempId = this.$store.state.editedTemplateId;
            return this.$store.getters.editedTemplate(tempId);
        }
    },

    methods:{
        setComponents(){
            if(this.editedTemplate){
                const html = this.editedTemplate.html;
                this.editor.setComponents(html)
            }
        },

        getTemplateId(tempId){
            this.useTemplateId = tempId;
            // also update in vuex store
            this.useTemplate();
        },

        createTemplate(){
            this.components = localStorage.getItem('gjs-components');
            this.html = this.editor.runCommand('gjs-get-inlined-html');
            this.popupActive = true;
        },

        useTemplate(){
            const html = this.editor.runCommand('gjs-get-inlined-html');
            const payload = {
                field: 'customTemplate',
                value: html,
            }
            this.$store.commit('setAutomail', payload);
            this.$emit('chooseContact')
        }
    }

}
</script>

<style lang="scss">
    .edit-temp{
        &__action{
            margin-bottom: 2rem;
            button{
                margin-right: 1.5rem;
            }
        }
        &__instruct{
            width: 55%;
        }
    }
    .gjs-one-bg{
        background-color: #373d49
    }
    #gjs{
        select{
            display: block;
        }
    }
</style>


