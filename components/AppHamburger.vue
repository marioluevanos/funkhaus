<template>
    <svg 
        class="app-hamburger"
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
    name: 'AppHamburger',
    methods: {
        onClickIcon() {
            // Another way to toggle the class would be the Vue way, but I felt that was too much
            this.$el.classList.toggle('is-active')
            
            // Toggle the menu open or close
            this.$store.commit('SET_IS_MENU_ACTIVE')
        }
    },
}
</script>

<style lang='scss' scoped>

.app-hamburger { 
    fill: var(--color-primary);
    overflow: visible;
    cursor: pointer;
    transition: all 0.15s var(--ease-in-out-sine);
    position: relative;
    z-index: 500;
    user-select: none;
    rect {
        transition: inherit;    
    }
}

// Hover State
.app-hamburger:hover {
    fill: white;
}

// Active State
.app-hamburger.is-active {
    rect:nth-child(1) {
        transform-origin: 11px 14px; // Finding the sweet spot for the rotation, to account for x, y and height.
        transform: rotate(45deg);
    }
    rect:nth-child(2) {
        transform-origin: 9px 17px; // Same here.
        transform: rotate(-45deg);
    }
}

</style>
