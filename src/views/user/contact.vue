<template>
    <div class="contact"> 
        <add-contact :popupActive="popupActive"
                    @deactivePopup="popupActive = false"
                    @addContact="addContact($event)"></add-contact>

        <div class="contact__body">
            <h4 class="contact__title">Danh sách thông tin học viên</h4>
            <h6>Có tổng cộng là: {{ contactList.length }} khách hàng</h6><br>
            <button class="waves-effect indigo btn"
                    @click="popupActive = true">
                Thêm liên lạc
            </button>

            <div class="contact__list">
                 <table class="centered responsive-table">
                    <thead>
                        <tr>
                            <th>Tên</th>
                            <th>Email </th>
                            <th>Ngày tạo</th>
                            <th>SĐT</th>
                            <th>Xóa</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr v-for="contact in contactList" :key="contact._id"
                            class="contact__badge" @click="edit(contact._id)">
                            <td>{{ contact.studentName }}</td>
                            <td>{{ contact.studentEmail }}</td>
                            <td class="contact__date">{{ contact.createdAt | dateFilter }}</td>
                            <td>{{ contact.phone ? contact.phone : 'Không có' }}</td>
                            <td>
                                <button class="btn btn-small waves-effect light-effects deep-orange"
                                        @click="deleteContact(contact._id)">
                                    Xóa liên lạc
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
import addContact from '../../components/popups/addContact'
export default {

    components:{
        addContact
    },

    data() {
        return {
            contactLists: '',
            popupActive: false,
        }   
    },

    filters:{
        dateFilter(value){
            if(value){
                return value.split('T')[0].split('-').reverse().join('-');
            }
        },
    },

    computed: {
        contactList(){
            return this.$store.state.userData.studentContacts
        }
    },

    methods: {        
        deleteContact(contactId){
            fetch(`${process.env.VUE_APP_PORT}/userDash/contact`,{
                method: 'DELETE',
                headers:{
                    'content-type': 'application/json',
                    'Authorization': 'Bearer '+this.$store.state.token
                },
                body: JSON.stringify({
                    contactId: contactId,
                })
            }).then(resp=>{
                return resp.json();
            }).then(resData=>{
                if(resData.status === 'success'){
                    this.firePopup('success', 'Xóa thành công', resData.msg)
                    this.$store.commit('deleteContact', contactId)
                }
            }).catch(err=>{
                this.firePopup('error', 'Có lỗi server', err.err.msg);
                throw err
            })
        },

        addContact(newContact){
            this.$store.commit('addContact', newContact)
        },
        edit(contactId){
            alert(contactId)
        }
    },
}
</script>

<style lang="scss">
    .contact{
        grid-column: 2/13;
        h6{
            color: rgb(35, 123, 236)
        }

        &__badge{
            cursor: pointer;
        }

        &__body{
            max-width: 1140px;
            margin: 0 auto;
            margin-top: 5rem;
        }
        &__list{
            margin-top: 3rem;
            th{
                text-transform: uppercase;
                font-size: 1.1rem;
            }
            tr{
                transition: all .2s;

                &:hover{
                    background: rgb(216, 216, 216);
                }
            }
        }
        &__date{
            color: rgb(255, 51, 102);
        }
    }
</style>


