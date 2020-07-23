export const state = () => ({
    isMenuActive: false
})

export const mutations = {
    SET_IS_MENU_ACTIVE(state) {
        state.isMenuActive = !state.isMenuActive
    }
}

export const getters = {}

export const actions = {}