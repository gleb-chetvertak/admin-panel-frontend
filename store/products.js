export const state = () => ({
    product: {},
    categories: [],
    pageConstructor: {
        table: {
            columns: [
                {
                    name: 'title',
                    label: 'Название',
                },
                {
                    name: 'category',
                    label: 'Категория',
                },
                {
                    name: 'images',
                    label: 'Фотографии',
                },
                {
                    name: 'specifications',
                    label: 'Характеристики',
                },
                {
                    name: 'comment',
                    label: 'Комментарий',
                },
            ],
            rows: [],
            rowActions: [
                {
                    name: 'edit',
                    type: 'form',
                    actionHandler: 'edit',
                },
                {
                    name: 'delete',
                    type: 'httpRequest',
                    actionHandler: 'delete',
                },
            ],
            sidebarActions: [
                {
                    name: 'create',
                    label: 'Добавить товар',
                    actionHandler: 'create',
                },
            ],
        },
        createForm: {
            fields: [
                {
                    name: 'title',
                    label: 'Название',
                },
                // {
                //     name: 'category',
                //     label: 'Категория',
                //     type: 'dropdown',
                //     options: [],
                // },
                // {
                //     name: 'images',
                //     label: 'Фотографии',
                // },
                // {
                //     name: 'specifications',
                //     label: 'Характеристики',
                // },
                {
                    name: 'comment',
                    label: 'Комментарий',
                    type: 'textarea',
                },
            ],
            sidebarActions: [
                {
                    name: 'save',
                    label: 'Сохранить',
                    actionHandler: 'save',
                },
                {
                    name: 'cancel',
                    actionHandler: 'cancel',
                },
                {
                    name: 'clear',
                    actionHandler: 'clear',
                },
            ],
        },
        editForm: {
            fields: [
                {
                    name: 'title',
                    label: 'Название',
                },
                {
                    name: 'category',
                    label: 'Категория',
                    type: 'dropdown',
                    options: [],
                },
                // {
                //     name: 'images',
                //     label: 'Фотографии',
                // },
                {
                    name: 'specifications',
                    label: 'Характеристики',
                    type: 'table',
                    columns: [
                        {
                            name: 'name',
                            label: 'Название',
                        },
                        {
                            name: 'value',
                            label: 'Значение',
                        },
                        {
                            name: 'unit',
                            label: 'Ед. изм.',
                        },
                    ],
                },
                {
                    name: 'comment',
                    label: 'Комментарий',
                    type: 'textarea',
                },
            ],
            sidebarActions: [
                {
                    name: 'save',
                    label: 'Сохранить',
                    actionHandler: 'save',
                },
                {
                    name: 'cancel',
                    actionHandler: 'cancel',
                },
                {
                    name: 'clear',
                    actionHandler: 'clear',
                },
            ],
        },
    },
    error: null,
})

export const mutations = {
    SET_TABLE: (state, { products, specifications }) => {
        state.pageConstructor.table.rows = products.map(({ specifications: productSpecifications, category: { title }, ...props }) => {
            const parsedSpecs = productSpecifications.map(({ specs_id: specId, value }) => {
                const specification = specifications.find(({ _id }) => _id === specId)

                return {
                    specId,
                    value,
                    ...specification,
                }
            })

            return {
                specifications: parsedSpecs,
                category: title,
                ...props,
            }
        })
    },
    SET_PRODUCT: (state, product) => {
        state.product = product
    },
    SET_EDIT_FORM_VALUES: (state, { categories, specifications }) => {
        state.pageConstructor.editForm.fields = state.pageConstructor.editForm.fields.map(({ name, type = 'input', ...props }) => {
            if (name === 'category') {
                return {
                    name,
                    type,
                    ...props,
                    options: categories.map(({ title: label, _id }) => ({
                        label,
                        _id,
                    })),
                    value: state.product.category._id,
                    valueLabel: categories.find(({ _id }) => _id === state.product.category._id).title,
                }
            }

            if (name === 'specifications') {
                return {
                    name,
                    type,
                    ...props,
                    rows: state.product.specifications.map(({ value, specs_id: specsId }) => {
                        const specification = specifications.find(({ _id }) => _id === specsId)

                        return {
                            nameField: {
                                name: 'specificationName',
                                type: 'dropdown',
                                options: specifications.map(({ _id, name: label, unit }) => ({
                                    _id,
                                    label,
                                    unit,
                                })),
                                value: specsId,
                                valueLabel: specifications.find(({ _id }) => _id === specsId).name,
                            },
                            value,
                            unit: specification.unit,
                        }
                    }),
                }
            }

            return {
                name,
                type,
                ...props,
                value: state.product[name],
            }
        })
    },
    EDIT_FORM_UPDATE_FIELD_VALUE: (state, { value, fieldName }) => {
        const field = state.pageConstructor.editForm.fields.find(({ name }) => name === fieldName)

        field.value = value
    },
    SET_ERROR: (state, err) => {
        state.error = err
    },
    CREATE_FORM_UPDATE_FIELD_VALUE: (state, { value, fieldName }) => {
        const field = state.pageConstructor.createForm.fields.find(({ name }) => name === fieldName)

        field.value = value
    },
    CREATE_FORM_CLEAR: (state) => {
        state.pageConstructor.createForm.fields = state.pageConstructor.createForm.fields.map(({ name, value = null, ...props }) => {
            return {
                name,
                ...props,
            }
        })
    },
    EDIT_FORM_CLEAR: (state) => {
        state.pageConstructor.editForm.fields = state.pageConstructor.editForm.fields.map(({ name, value = null, ...props }) => {
            return {
                name,
                ...props,
            }
        })
    },
}

export const actions = {
    async SET_TABLE({ commit, rootState }) {
        await commit('SET_TABLE', {
            products: rootState.common.products,
            specifications: rootState.common.specifications,
        })
    },
    async DELETE_PRODUCT({ commit, rootState }, id) {
        try {
            const data = await this.$axios.$delete(`products/${id}`)

            await commit('common/SET_PRODUCTS', data, { root: true })

            await commit('SET_TABLE', rootState.common.products)
        } catch (err) {
            commit('SET_ERROR', err)
        }
    },
    async FETCH_PRODUCT({ commit, getters }, id) {
        try {
            const data = await this.$axios.$get(`products/${id}`)

            commit('SET_PRODUCT', data)
        } catch (err) {
            commit('SET_ERROR', err)
        }
    },
    async SET_EDIT_FORM_VALUES({ commit, rootState }) {
        await commit('SET_EDIT_FORM_VALUES', {
            categories: rootState.common.categories,
            specifications: rootState.common.specifications,
        })
    },
    async SAVE_NEW_PRODUCT({ commit, getters }) {
        try {
            const parsedFormFields = getters.CREATE_FORM_FIELDS.reduce((acc, { name, value }) => {
                if (value) {
                    acc[name] = value
                }

                return acc
            }, {})

            const data = await this.$axios.$post('products', parsedFormFields)

            commit('SET_PRODUCTS', data)
        } catch (err) {
            commit('SET_ERROR', err)
        }
    },
    async SAVE_EDITED_PRODUCT({ commit, getters }) {
        try {
            const parsedFormFields = getters.EDIT_FORM_FIELDS.reduce((acc, { name, value }) => {
                if (value) {
                    acc[name] = value
                }

                return acc
            }, {})

            const id = getters.PRODUCT._id

            const data = await this.$axios.$put(`products/${id}`, parsedFormFields)

            commit('SET_PRODUCTS', data)
        } catch (err) {
            commit('SET_ERROR', err)
        }
    },
    SET_PRODUCTS: ({ commit }, payload) => commit('SET_PRODUCTS', payload),
    CREATE_FORM_UPDATE_FIELD_VALUE: ({ commit }, payload) => commit('CREATE_FORM_UPDATE_FIELD_VALUE', payload),
    EDIT_FORM_UPDATE_FIELD_VALUE: ({ commit }, payload) => commit('EDIT_FORM_UPDATE_FIELD_VALUE', payload),
    CREATE_FORM_CLEAR: ({ commit }) => commit('CREATE_FORM_CLEAR'),
    EDIT_FORM_CLEAR: ({ commit }) => commit('EDIT_FORM_CLEAR'),
}

export const getters = {
    PRODUCTS: ({ products }) => products,
    PRODUCT: ({ product }) => product,

    // Table
    TABLE_COLUMNS: ({ pageConstructor: { table } }) => table.columns,
    TABLE_ROWS: ({ pageConstructor: { table } }) => table.rows,
    TABLE_SIDEBAR_ACTIONS: ({ pageConstructor: { table } }) => table.sidebarActions,
    TABLE_ROW_ACTIONS: ({ pageConstructor: { table } }) => table.rowActions,

    // Create form
    CREATE_FORM_FIELDS: ({ pageConstructor: { createForm } }) => createForm.fields,
    CREATE_FORM_SIDEBAR_ACTIONS: ({ pageConstructor: { createForm } }) => createForm.sidebarActions,

    // Create form
    EDIT_FORM_FIELDS: ({ pageConstructor: { editForm } }) => editForm.fields,
    EDIT_FORM_SIDEBAR_ACTIONS: ({ pageConstructor: { editForm } }) => editForm.sidebarActions,
}
