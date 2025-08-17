<template>

        <!-- Spinner Start -->
        <!-- <div id="spinner" class="show w-100 vh-100 bg-white position-fixed translate-middle top-50 start-50  d-flex align-items-center justify-content-center">
            <div class="spinner-grow text-primary" role="status"></div>
        </div> -->
        <!-- Spinner End -->

        <slot />

        <!-- Copyright Start -->
        <div class="container-fluid copyright py-4">
            <div class="container">
                <div class="row g-4 align-items-center">
                    <div class="col-md-6 text-center text-md-start mb-md-0">
                        <span class="text-light">
                            <a href="#"><i class="fas fa-copyright text-light me-2"></i>Eventia</a>, All right reserved.</span>
                    </div>
                    <div class="col-md-6 text-center text-md-end text-white">
                        Designed By <a class="border-bottom" href="https://htmlcodex.com">FASPI</a>
                    </div>
                </div>
            </div>
        </div>
        <!-- Copyright End -->

        <!-- Back to Top -->
        <a href="#" class="btn btn-primary btn-primary-outline-0 btn-md-square back-to-top"><i class="fa fa-arrow-up"></i></a>   

    
</template>

<script setup lang="ts">
useHead({
    title: 'Mr&Mrs - Wedding Bootstrap Template',
    meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1.0, user-scalable=0, minimal-ui' },
        { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge' },
    ],
    link: [
        { rel: 'icon', href: '/favicon.svg', type: 'image/x-icon' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Public+Sans:wght@300;400;500;600;700&display=swap' },
        { rel: 'stylesheet', href: 'https://use.fontawesome.com/releases/v5.15.4/css/all.css' },        
        { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.4.1/font/bootstrap-icons.css' },        
        { rel: 'stylesheet', href: '/assets/layouts/classic/lib/animate/animate.min.css' },
        { rel: 'stylesheet', href: '/assets/layouts/classic/lib/lightbox/css/lightbox.min.css' },
        { rel: 'stylesheet', href: '/assets/layouts/classic/css/bootstrap.min.css' },
        { rel: 'stylesheet', href: '/assets/layouts/classic/css/style.css' },
    ],
    script: [
        { src: 'https://ajax.googleapis.com/ajax/libs/jquery/3.6.4/jquery.min.js' },
        { src: 'https://cdn.jsdelivr.net/npm/bootstrap@5.0.0/dist/js/bootstrap.bundle.min.js' },
        { src: '/assets/layouts/classic/lib/wow/wow.min.js' },
        { src: '/assets/layouts/classic/lib/easing/easing.min.js' },
        { src: '/assets/layouts/classic/lib/waypoints/waypoints.min.js' },
        { src: '/assets/layouts/classic/lib/lightbox/js/lightbox.min.js' },
        { src: '/assets/layouts/classic/js/main.js' }
    ]
})

</script>