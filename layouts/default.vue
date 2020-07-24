<template>
    <main class="default-layout">
        <header class="default-header">
            <app-logo />
            <aside class="default-aside">
                <app-rps />
                <app-hamburger />
            </aside>
        </header>
        <Nuxt />
    </main>
</template>

<script>
// Components
import AppLogo from '@/components/AppLogo.vue'
import AppRps from '@/components/AppRps.vue'
import AppHamburger from '@/components/AppHamburger.vue'

export default {
    name: 'DefaultLayout',
    components: {
        AppLogo,
        AppRps,
        AppHamburger
    }
}
</script>

<style lang='scss' scoped>

.default-header {
    height: 50px;
    margin-top: var(--gutter-top);
    padding-right: var(--gutter-sides);
    padding-left: var(--gutter-sides);
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.default-aside {
    display: flex;
    align-items: center;
}

</style>
