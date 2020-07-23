<template>
    <ul class="editors-list">
        <li
            v-for="editor in editors"
            :key="editor.id"
            class="editors-list-item"
        >
            <p 
                class="editors-list-title font-large" 
                v-text="editor.title"
            />
            <figure 
                v-if="editor && editor.image"
                class="editors-list-image" 
            >
                <img 
                    :src="editor.image.sourceUrl"
                    :srcSet="editor.image.srcSet"
                    :alt="editor.image.title"
                    :width="editor.image.mediaDetails.width"
                    :height="editor.image.mediaDetails.height"
                >
            </figure>
        </li>
    </ul>
</template>

<script>
export default {
    name: 'EditorsList',
    props: {
        editors: {
            type: Array,
            default() {
                return []
            }
        }
    }
}
</script>

<style lang='scss' scoped>

.editors-list {
    position: relative;
    margin: 0;
    padding: 0;
    width: 100%;
    list-style: none;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
}   

.editors-list-title {
    position: relative;
    z-index: 10;
    display: inline-block;
    cursor: pointer;
}

.editors-list-image {
    margin: 0;
    position: absolute;
    top: -70px; 
    left: 0; 
    right: 0;
    width: 100%;
    height: 100%;
    min-height: 540px;
    z-index: 0;
    overflow: hidden;
    img {
        width: 100%;
        height: 100%;
        object-fit: contain;
        display: block;
        position: absolute;
        opacity: 0;
        transition: all 0.3s $ease-in-out-sine;
    }
}

// Breakpoints 
// -----------------------------------------

@include bp(tablet) {
    .editors-list {
        grid-template-columns: 1fr 1fr;
    }
}

@include bp(mobile) {
    .editors-list {
        grid-template-columns: 1fr;
    }

    .editors-list-item {
        position: relative;
    }

    .editors-list-image {
        min-height: initial;
        top: 0;
    }

    .editors-list-image img {
        right: 0;
        width: auto;
    }
}

// Hover Styles
// -----------------------------------------

@include hover() {
    .editors-list-title:hover {
        color: white;
        + .editors-list-image img {
            opacity: 1;
        }
    }
}

</style>