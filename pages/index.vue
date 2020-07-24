<template>
    <section class="page-index">
        <h1 class="page-title">
            {{ pageTitle }}
        </h1>
        <EditorsList :editors="editors" />
    </section>
</template>

<script>
// Components
import EditorsList from '@/components/EditorsList.vue'
import removeDuplicates from '@/utils/removeDuplicates'

export default {
    name: 'PageIndex',
    components: {
        EditorsList
    },
    async fetch() {
        try {
            const url = 'https://raw.githubusercontent.com/funkhaus/technical-assessment/master/db.json'
            const response = await fetch(url)
            if (response.ok) {
                this.db = await response.json()
            }
        } catch (error) {
            console.log(error)
        }
    },
    data() {
        return {
            db: {}
        }
    },
    computed: {
        editors() {
            // Map editors list, that is unique
            return this.db.pages
                .map(p => {
                    return {
                        id: p.id,
                        title: p.title,
                        // Remove the duplicate objects based on a property
                        images: removeDuplicates([p.featuredImage, ...this.filterImages], 'mediaItemId')
                    }
                })
                // Sort alphabetically [A-Z]
                .sort((first, second) => (first.title > second.title) ? 1 : -1)
        },
        // Remove if image is falsy
        filterImages() {
            return this.db.images.filter(img => img.sourceUrl).reverse()
        },
        pageTitle() {
            return this.db.page.title
        }
    },
    head () {
        const { 
            title = '', 
            description = '',
            thumbnail = ''
        } = this.db.siteMeta

        return {
            title,
            meta: [
                { hid: 'description', name: 'description', content: description },
                { property: 'og:image', content: thumbnail, hid: 'og:image' },
                { property: 'og:image:width', content: '1920' },
                { property: 'og:image:height', content: '1080' },
                { property: 'og:title', content: title, hid: 'og:title' },
                { property: 'og:description', content: description, hid: 'og:description' },
                { property: 'og:url', content: 'https://funkhaus.us', hid: 'og:url' },
                { property: 'og:type', content: 'website' },
            ]
        }
    }
}
</script>

<style lang='scss' scoped>

.page-index {
    --vertical-space: 120px;
    margin-top: var(--vertical-space);
    padding-left: var(--gutter-sides);
    padding-right: var(--gutter-sides);
}

.page-title {
    position: absolute;
    top: 45px;
    left: 0;
    right: 0;
    text-align: center;
    font-weight: normal;
    font-size: 18px;
    line-height: 22px;
    margin: 0;
}

// Breakpoints 
// -----------------------------------------

@media #{$lt-phone} {
    .page-index {
        --vertical-space: 90px;
        margin-top: 0;
    }
    .page-title {
        position: relative;
        margin-bottom: var(--vertical-space);
        
    }
}

</style>
