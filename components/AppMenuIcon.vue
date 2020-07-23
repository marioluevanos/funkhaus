<template>
    <svg 
        class="app-menu-icon"
        width="32"
        height="32"
        viewBox="0 0 32 32"
        @click="onClickIcon"
    >
        <rect 
            x="1" 
            y="10" 
            width="30" 
            height="2"
        />
        <rect 
            x="1" 
            y="20" 
            width="30" 
            height="2"
        />
    </svg>
</template>

<script>
export default {
    name: 'AppMenuIcon',
    methods: {
        onClickIcon() {
            this.$el.classList.toggle('is-active')
            this.$store.commit('SET_IS_MENU_ACTIVE')
        }
    }
}
</script>

<style lang='scss' scoped>

.app-menu-icon { 
    fill: var(--color-primary);
    overflow: visible;
    cursor: pointer;
    transition: all 0.15s $ease-in-out-sine;
    rect {
        transition: inherit;    
    }
}

// Hover State
.app-menu-icon:hover {
    fill: white;
}

// Active State
.app-menu-icon.is-active {
    rect:nth-child(1) {
        transform-origin: 11px 14px; // Finding the sweet spot for the rotation
        transform: rotate(45deg);
    }
    rect:nth-child(2) {
        transform-origin: 9px 17px; // Finding the sweet spot for the rotation
        transform: rotate(-45deg);
    }
}

</style>
