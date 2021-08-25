export const state = () => ({
    products: [],
    specifications: [],
    categories: [],
})

export const mutations = {
    SET_PRODUCTS: (state, products) => {
        state.products = products
    },
    SET_SPECIFICATIONS: (state, specifications) => {
        state.specifications = specifications
    },
    SET_CATEGORIES: (state, categories) => {
        state.categories = categories
    },
}

export const actions = {
    async FETCH_PRODUCTS({ commit, getters }) {
        try {
            const data = await this.$axios.$get('products')

            if (!getters.SPECIFICATIONS.length) {
                const specifications = await this.$axios.$get('specifications')

                await commit('SET_SPECIFICATIONS', specifications)
            }

            await commit('SET_PRODUCTS', data)
        } catch (err) {
            commit('SET_ERROR', err)
        }
    },
    async FETCH_CATEGORIES({ commit, getters }) {
        try {
            const data = await this.$axios.$get('categories')

            await commit('SET_CATEGORIES', data)
        } catch (err) {
            commit('SET_ERROR', err)
        }
    },
}

export const getters = {
    PRODUCTS: ({ products }) => products,
    SPECIFICATIONS: ({ specifications }) => specifications,
    CATEGORIES: ({ categories }) => categories,
}
