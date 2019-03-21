export const firePopup = {
    methods:{
        firePopup(type, title, text, footer = '<a href="/auth/login"> Đăng nhập </a>'){
            this.$swal.fire({
                type,
                title,
                text,
                confirmButtonText: 'OK',
                confirmButtonClass: 'teal darken-1 ',
                footer
            })
        },
        confirmPopup(type, title, text){
            this.$Swal.fire({
                title: title,
                text: text,
                type: type,
                showCancelButton: true,
                confirmButtonColor: '#ff2f00',
                cancelButtonColor: '#1ab3a5',
                confirmButtonText: 'Yes, delete it!'
              })
        }
    }
}
