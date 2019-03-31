<template>
    <div class="contact"> 
        <div class="contact__body">
            <h4 class="contact__title">Danh sách thông tin học viên</h4>
            <h6>Có tổng cộng là: {{ contactList.length }} khách hàng</h6>

            <div class="contact__list">
                 <table class="centered responsive-table">
                    <thead>
                        <tr>
                            <th>Tên</th>
                            <th>Email </th>
                            <th>Ngày tạo</th>
                            <th>Xóa</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr v-for="contact in contactLists" :key="contact._id">
                            <td>{{ contact.studentName }}</td>
                            <td>{{ contact.studentEmail }}</td>
                            <td class="contact__date">{{ contact.createdAt | dateFilter }}</td>
                            <td>
                                <button class="btn btn-small waves-effect light-effects red"
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
export default {
    created(){
        this.contactLists = this.contactList    
    },

    data() {
        return {
            contactLists: '',
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
                    const deleteIndex = this.contactLists.findIndex(contact=>{
                        return contact._id === contactId
                    })
                    this.contactLists.splice(deleteIndex, 1);
                }
            }).catch(err=>{
                this.firePopup('error', 'Có lỗi server', err.err.msg);
                throw err
            })
        },
    },
}
</script>

<style lang="scss">
    .contact{
        grid-column: 2/13;
        h6{
            color: rgb(35, 123, 236)
        }

        &__title{

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


