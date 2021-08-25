export const state = () => ({
    accounts: [],
    account: {},
    pageConstructor: {
        table: {
            columns: [
                {
                    name: 'title',
                    label: 'Название',
                },
                {
                    name: 'username',
                    label: 'Логин',
                },
                {
                    name: 'link',
                    label: 'Ссылка',
                },
                {
                    name: 'comment',
                    label: 'Комментарий',
                },
            ],
            sidebarActions: [
                {
                    name: 'create',
                    label: 'Добавить аккаунт',
                    actionHandler: 'create',
                },
            ],
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
        },
        createForm: {
            fields: [
                {
                    name: 'title',
                    label: 'Название',
                },
                {
                    name: 'username',
                    label: 'Логин',
                },
                {
                    name: 'link',
                    label: 'Ссылка',
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
        editForm: {
            fields: [
                {
                    name: 'title',
                    label: 'Название',
                },
                {
                    name: 'username',
                    label: 'Логин',
                },
                {
                    name: 'link',
                    label: 'Ссылка',
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
    SET_ACCOUNTS: (state, accounts) => {
        state.accounts = accounts
    },
    SET_ACCOUNT: (state, account) => {
        state.account = account
    },
    SET_EDIT_FORM_VALUES: (state) => {
        state.pageConstructor.editForm.fields = state.pageConstructor.editForm.fields.map(({ name, ...props }) => {
            return {
                name,
                ...props,
                value: state.account[name],
            }
        })
    },
    SET_ERROR: (state, err) => {
        state.error = err
    },
    CREATE_FORM_UPDATE_FIELD_VALUE: (state, { value, fieldName }) => {
        const field = state.pageConstructor.createForm.fields.find(({ name }) => name === fieldName)

        field.value = value
    },
    EDIT_FORM_UPDATE_FIELD_VALUE: (state, { value, fieldName }) => {
        const field = state.pageConstructor.editForm.fields.find(({ name }) => name === fieldName)

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
    async FETCH_ACCOUNTS({ commit }) {
        try {
            const data = await this.$axios.$get('third-party-accounts')

            commit('SET_ACCOUNTS', data)
        } catch (err) {
            commit('SET_ERROR', err)
        }
    },
    async FETCH_ACCOUNT({ commit }, id) {
        try {
            const data = await this.$axios.$get(`third-party-accounts/${id}`)

            commit('SET_ACCOUNT', data)
        } catch (err) {
            commit('SET_ERROR', err)
        }
    },
    SET_EDIT_FORM_VALUES: async ({ commit }) => await commit('SET_EDIT_FORM_VALUES'),
    async DELETE_ACCOUNT({ commit }, id) {
        try {
            const data = await this.$axios.$delete(`third-party-accounts/${id}`)

            commit('SET_ACCOUNTS', data)
        } catch (err) {
            commit('SET_ERROR', err)
        }
    },
    async SAVE_NEW_ACCOUNT({ commit, getters }) {
        try {
            const parsedFormFields = getters.CREATE_FORM_FIELDS.reduce((acc, { name, value }) => {
                if (value) {
                    acc[name] = value
                }

                return acc
            }, {})

            const data = await this.$axios.$post('third-party-accounts', parsedFormFields)

            commit('SET_ACCOUNTS', data)
        } catch (err) {
            commit('SET_ERROR', err)
        }
    },
    async SAVE_EDITED_ACCOUNT({ commit, getters }) {
        try {
            const parsedFormFields = getters.EDIT_FORM_FIELDS.reduce((acc, { name, value }) => {
                if (value) {
                    acc[name] = value
                }

                return acc
            }, {})

            const id = getters.ACCOUNT._id

            const data = await this.$axios.$put(`third-party-accounts/${id}`, parsedFormFields)

            commit('SET_ACCOUNTS', data)
        } catch (err) {
            commit('SET_ERROR', err)
        }
    },
    SET_ACCOUNTS: ({ commit }, payload) => commit('SET_ACCOUNTS', payload),
    CREATE_FORM_UPDATE_FIELD_VALUE: ({ commit }, payload) => commit('CREATE_FORM_UPDATE_FIELD_VALUE', payload),
    EDIT_FORM_UPDATE_FIELD_VALUE: ({ commit }, payload) => commit('EDIT_FORM_UPDATE_FIELD_VALUE', payload),
    CREATE_FORM_CLEAR: ({ commit }) => commit('CREATE_FORM_CLEAR'),
    EDIT_FORM_CLEAR: ({ commit }) => commit('EDIT_FORM_CLEAR'),
}

export const getters = {
    ACCOUNTS: ({ accounts }) => accounts,
    ACCOUNT: ({ account }) => account,

    // Table
    TABLE_COLUMNS: ({ pageConstructor: { table } }) => table.columns,
    TABLE_SIDEBAR_ACTIONS: ({ pageConstructor: { table } }) => table.sidebarActions,
    TABLE_ROW_ACTIONS: ({ pageConstructor: { table } }) => table.rowActions,

    // Create form
    CREATE_FORM_FIELDS: ({ pageConstructor: { createForm } }) => createForm.fields,
    CREATE_FORM_SIDEBAR_ACTIONS: ({ pageConstructor: { createForm } }) => createForm.sidebarActions,

    // Create form
    EDIT_FORM_FIELDS: ({ pageConstructor: { editForm } }) => editForm.fields,
    EDIT_FORM_SIDEBAR_ACTIONS: ({ pageConstructor: { editForm } }) => editForm.sidebarActions,
}
