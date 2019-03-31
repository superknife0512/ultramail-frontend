<template>
    <div class="contact-list">

        <h5 class="contact-list__title">
            Bước 2.1. Thông tin cho automation email
        </h5>

        <form action="#" class="contact-list__info">
            <div class="row">
                
                <div class="input-field col s12">
                    <input id="mailName" 
                            type="text" 
                            class="validate"
                            v-model="mailName">
                    <label for="mailName">Tiêu đề email</label>
                    <small>Email cho địa điểm A</small>
                </div>

                <div class="input-field col s12">
                    <input id="subject" 
                            type="text" 
                            class="validate"
                            v-model="subject">
                    <label for="subject">Chủ đề thư (subject)</label>
                </div>
                <div class="input-field col s12">
                    <input id="from" 
                            type="text" 
                            class="validate"
                            v-model="from">
                    <label for="from">Gửi bởi ai</label>
                    <small>Ví dụ: Ebook@yahoo.com</small>
                </div>
            </div>
        </form>
        <br>

        <h5 class="contact-list__title ">Bước 2.2. Lên danh sách người nhận</h5>
        <p>Dưới đây là danh sách những khách hàng mà bạn thu thập được 
            thông qua hệ thống thu thập dữ liệu.    
        </p>
        <h6>Đã chọn: <b>{{ selectedUser.length || 0 }}</b>  contacts</h6>
        <div class="contact-list__body">
             <table class="centered responsive-table">
                <thead>
                <tr>
                    <th class="contact-list__choose">
                        <div class="contact-list__choose-all">
                            <p>
                                <label>
                                    <input type="checkbox" 
                                            v-model="selectAll" />
                                    <span>Chọn tất cả</span>
                                </label>
                            </p>
                        </div>
                    </th>
                    <th>Tên</th>
                    <th>Email</th>
                    <th>Ngày tạo</th>
                </tr>
                </thead>

                <tbody>
                    <tr v-for="contact in contacts" :key="contact._id">
                        <td>
                            <p>
                                <label>
                                    <input type="checkbox" 
                                            :value="contact._id" 
                                            v-model="selectedUser" />
                                    <span></span>
                                </label>
                            </p>
                        </td>
                        <td>{{ contact.studentName }}</td>
                        <td>{{ contact.studentEmail }}</td>
                        <td>{{ contact.createdAt | dateFilter }}</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <v-pagination :perPage="perPage"
                        :numPages=numPages
                        @changePage="changePage($event)"
                        ></v-pagination>
        <br>        

        <button class="btn waves-effect waves-light indigo lighten-1"
                :disabled=" !subject || !from || !selectedUser[0] || !mailName"
                @click="submit">
            Thiết lập thời gian
        </button>
    </div>
</template>

<script>
export default {
    data(){
        return {
            selectedUser:[],
            selectAll: false,
            subject: '',
            from:'',
            perPage: 8,
            curPage: 1,
            mailName: '',
        }
    },

    methods:{
        changePage(curPage){
            this.curPage = curPage
        },
        submit(){
            let contactTrans = [];
            this.initialContact.forEach(contact=>{
                if(this.selectedUser.includes(contact._id)){
                    contactTrans.push({
                        studentName: contact.studentName,
                        studentEmail: contact.studentEmail
                    })
                }
            })

            const submitArr = [
                {
                    field: 'mailName',
                    value: this.mailName,
                },
                {
                    field: 'subject',
                    value: this.subject,
                },
                {
                    field: 'from',
                    value: this.from,
                },
                {
                    field: 'contacts',
                    value: contactTrans,
                },
            ];

            submitArr.forEach(submitData=>{
                this.$store.commit('setAutomail', submitData)
            })

            this.$emit('timeSetup')
        }
    },

    computed: {
        numPages(){
            if(this.contacts){
                return Math.ceil(this.initialContact.length/this.perPage);
            }
            return 3;
        },
        contacts(){
            let contacts = this.$store.state.userData.studentContacts;
            const start = (this.curPage-1)*this.perPage;
            const end = this.curPage * this.perPage;
            contacts = contacts.slice(start, end);
            return contacts;
        },
        initialContact(){
            return this.$store.state.userData.studentContacts;
        }
    },

    filters:{
        dateFilter(value){
            if(value){
                return value.split('T')[0].split('-').reverse().join('-');
            }
        },
    },

    watch:{
        // watch and check select behavior
        selectAll(value){
            if(value){
                const contactIds = this.initialContact.map(contact=>{
                    return contact._id
                })
                this.selectedUser = [...contactIds];
            } else {
                this.selectedUser = [];
            }
        },
        selectedUser(value){
            const arrContacts = [...value];
            if(arrContacts.length === this.initialContact.length){
                this.selectAll = true
            } else if( arrContacts.length === 0) {
                this.selectAll = false                
            }
        }
    }
}
</script>


<style lang="scss">
    .contact-list{
        margin: 2rem auto;
        &__title{
            color: #fc6183;
            font-size: 1.5rem;
        }
        &__body{
            max-width: 85%;
            margin-top: 2rem;
            
        }
        &__choose{
            color: #eb8383
        }

        &__choose-all{
            display: flex;
            justify-content: center;
            p{
                margin-right: .7rem;
            }
        }

        &__info{
            width: 85%;
        }

        th{
            font-size: 1.1rem;
        }
    }
</style>

