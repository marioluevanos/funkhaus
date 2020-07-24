<template>
    <figure 
        class="slide-show" 
        :class="isVisible"
    >
        <img 
            v-for="(img, idx) in images"
            :key="img.id"
            class="slide-show-img"
            :class="{ 'active': idx === activeIndex }"
            :src="img.sourceUrl"
            :srcSet="img.srcSet"
            :alt="img.title"
            :width="img.mediaDetails.width"
            :height="img.mediaDetails.height"
        >
    </figure>
</template>

<script>

const defaultTime = {
    intervalId: null, // store interval id
    passed: 0, // time elapsed
    limit: 2 // max seconds
}

export default {
    name: 'SlideShow',
    props: {
        images: {
            type: Array,
            default() {
                return []
            }
        },
        shouldPlay: {
            type: [Object, Boolean],
            default() {
                return false
            }
        },
        id: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            activeIndex: 0,
            time: { ...defaultTime }
        }
    },
    computed: {
        timeRemaining() {
            return this.time.limit - this.time.passed
        },
        // This is truthy, when moused over the <p> element 
        isVisible() {
            return { 'is-visible': this.isHovered }
        },
        isHovered() {
            return this.shouldPlay && this.shouldPlay.id && this.id === this.shouldPlay.id
        }
    },
    watch: {
        timeRemaining(val) {
            if (val === 0) this.timeEnd()
        },
        shouldPlay({ id })  {
            // When hovered, the component received an ID and is checked
            if (id && this.id === id) {
                this.timeStart()
            } else {
                this.timeEnd()
            }
        },
        // Resetting the slide show when not-hovering
        isHovered(hovered) {
            if (!hovered) this.activeIndex = 0
        }
    },
    mounted() {},
    methods: {
        setNextIndex() {
            this.activeIndex = this.activeIndex === this.images.length - 1 ? 0 : this.activeIndex + 1
        },
        timeEnd() {
            clearInterval(this.time.intervalId)

            // After the time has ended, check if mouse is still hovering to continue
            if (this.isHovered) {
                this.timeNext()
            } else {
                this.timeReset()
            }
        },
        timeStart() {
            const everySecond = 1000
            this.time.intervalId = setInterval(() => (this.time.passed += 1), everySecond)
        },
        timeReset() {
            this.time = { ...defaultTime }
        },
        timeNext() {
            this.timeReset()
            this.$nextTick(this.timeStart)
            this.setNextIndex()
        }
    }
}
</script>

<style lang='scss'>

.slide-show {

    --transition-delay: 0s;
    --transition-dur: 0.6s;

    margin: 0;
    position: absolute;
    top: 0; 
    left: 0; 
    right: 0;
    width: 100%;
    height: 100%;
    min-height: 540px;
    z-index: 0;
    overflow: hidden;
    pointer-events: none;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity var(--transition-dur) var(--ease-in-out-sine);
}

.slide-show-img {
    width: 100%;
    height: 65%;
    object-fit: contain;
    display: block;
    position: absolute;
    opacity: 0;
    transition: all var(--transition-dur) var(--ease-in-out-sine) var(--transition-delay);
}

// Is Visible State (When hovered over)
// -----------------------------------------

.slide-show.is-visible {
    opacity: 1;
}

// Active State
// -----------------------------------------

.slide-show-img.active {
    opacity: 0.85;
    --transition-delay: var(--transition-dur);
}


// Breakpoints 
// -----------------------------------------

@media #{$lt-phone} {
    .slide-show {
        min-height: 200px;
    }   
}

</style>