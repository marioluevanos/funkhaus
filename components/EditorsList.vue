<template>
    <ul class="editors-list">
        <li
            v-for="(editor, idx) in editors"
            :key="editor.id"
            :style="staggerProp(idx)"
            style="opacity: 0"
            class="editors-list-item"
        >
            <p 
                class="editors-list-title font-large"
                :data-id="editor.id"
                @mouseenter="onMouseEnter" 
                @mouseleave="onMouseLeave"
                v-text="editor.title"
            />
            <slide-show
                :id="editor.id"
                :images="editor.images"
                :should-play="shouldPlay"
                class="editors-list-image" 
            />
        </li>
    </ul>
</template>

<script>

import SlideShow from '@/components/SlideShow.vue'

export default {
    name: 'EditorsList',
    components: {
        SlideShow
    },
    props: {
        editors: {
            type: Array,
            default() {
                return []
            }
        }
    },
    data() {
        return {
            shouldPlay: {
                id: null
            }
        }
    },
    mounted() {
        this.animateList()
    },
    methods: {
        animateList() {
            // Animate the list
            Array.from(this.$el.children).forEach(li => {
                li.style.opacity = 1
                // Clean-up the attributes, maybe not necessary
                li.addEventListener('transitionend', event => event.target.style = null)
            })
        },
        onMouseEnter(event) {
            this.shouldPlay = { id: event.target.dataset.id }
            this.toggleVisibility(true)
        },
        onMouseLeave() {
            this.shouldPlay = false
            this.toggleVisibility()
        },
        toggleVisibility(bool) {
            if (bool) {
                this.toggleClasses('add')
            } else {
                this.toggleClasses('remove')
            }
        },
        // Probably a better way to toggle the classes, on all the children
        toggleClasses(methodName) {
            Array.from(this.$el.children).forEach(li => li.firstElementChild.classList[methodName]('active'))
        },
        staggerProp(idx = 0) {
            const delay = 0.05
            return { '--stagger': `${ idx * delay }s` }
        }
    }
}
</script>

<style lang='scss' scoped>

.editors-list {
    margin: 0;
    padding: 0;
    width: 100%;
    list-style: none;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
}

.editors-list-item {
    transition: all 0.3s var(--ease-in-out-sine) var(--stagger);
}

.editors-list-title {
    margin: 0;
    padding: 15px 0;
    position: relative;
    display: inline-block;
    cursor: pointer;
    transition: all 0.3s var(--ease-in-out-sine);
    z-index: 10;
}

// States
// -----------------------------------------


// Breakpoints 
// -----------------------------------------

@media #{$lt-tablet} {
    .editors-list {
        grid-template-columns: 1fr 1fr;
    }
}

@media #{$lt-phone} {
    .editors-list {
        grid-template-columns: 1fr;
    }

    .editors-list-item {
        position: relative;
    }
}

// // Hover Styles
// // -----------------------------------------

@media #{$has-hover} {
    .editors-list-title.active {
        opacity: 0.15;
    }
    .editors-list:hover .editors-list-title.active:hover {
        color: white;
        opacity: 1;
    }
}

</style>