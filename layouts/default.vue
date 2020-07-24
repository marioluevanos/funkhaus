<template>
    <main class="default-layout">
        <nav class="default-navigation">
            <app-logo />
            <span class="default-nav-aside">
                <img
                    class="logo-rps"
                    src="@/assets/logo-rps.svg" 
                    alt="Logo RPS"
                >
                <app-hamburger />
            </span>
        </nav>
        <Nuxt />
    </main>
</template>

<script>
// Components
import AppLogo from '@/components/AppLogo.vue'
import AppHamburger from '@/components/AppHamburger.vue'

export default {
    name: 'DefaultLayout',
    components: {
        AppLogo,
        AppHamburger
    }
}
</script>

<style lang='scss' scoped>

.default-navigation {
    height: 50px;
    margin-top: var(--gutter-top);
    padding-right: var(--gutter-sides);
    padding-left: var(--gutter-sides);
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.default-nav-aside {
    display: flex;
    align-items: center;
}

.logo-rps {
    display: block;
    width: 150px;
    height: inherit;
    margin-right: 30px;
}

// Breakpoints 
// -----------------------------------------

@media #{$lt-phone} {
    .logo-rps {
        width: 75px;
        margin-right: 15px;
    }
}

</style>
