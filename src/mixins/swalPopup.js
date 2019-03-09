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
        }
    }
}
