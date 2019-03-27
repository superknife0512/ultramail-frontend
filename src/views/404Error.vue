<template>
    <div class="container page404">
        <br>
        <h3>Lỗi không tìm thấy trang!</h3>
        <img src="../assets/search.png" alt="search">
        <h4>404-Page not found</h4>
        <h5>
            Chúng tôi không tìm thấy địa chỉ trang mà bạn muốn vào
            <router-link to="/" tag="a">
                Quay lại trang chủ!
            </router-link>
        </h5>
        <br>
    </div>
</template>

<style lang="scss">
    $color-primary: #0097a7;
    $color-background: #ffe3e5;
    $color-secondary: #5a2669;
    .page404{
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 4rem;
        padding: 3rem;
        @media screen and (max-width: 600px){
            padding: 3rem 1.5rem;
        }

        h3{
            color: $color-primary;
            text-transform: uppercase;
            margin-top: 0;
        }
        a{
            font-size: 1.4rem
        }
        img{
            height: 30rem;
        }
    }
</style>
