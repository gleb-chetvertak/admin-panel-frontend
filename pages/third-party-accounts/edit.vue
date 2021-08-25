<template>
    <div>
        <h1>
            Аккаунты - редактирование
        </h1>

        <div :class="$style['form-wrapper']">
            <FormField
                v-for="field in EDIT_FORM_FIELDS"
                :key="`field-${field.name}`"
                :field="field"
                @updated-value="(value) => EDIT_FORM_UPDATE_FIELD_VALUE({ value, fieldName: field.name })"
            />

            <LayoutActionsSidePanel
                :actions="EDIT_FORM_SIDEBAR_ACTIONS"
                @button-clicked="handleSidebarAction"
            />
        </div>
    </div>
</template>

<script>

import { mapGetters, mapActions } from 'vuex'

export default {
    name: 'ThirdPartyAccountsEditRoute',
    computed: {
        ...mapGetters('third-party-accounts', [
            'EDIT_FORM_FIELDS',
            'EDIT_FORM_SIDEBAR_ACTIONS',
        ]),
    },
    async created() {
        await this.FETCH_ACCOUNT(this.$route.query.id)
        await this.SET_EDIT_FORM_VALUES()
    },
    methods: {
        ...mapActions('third-party-accounts', [
            'EDIT_FORM_UPDATE_FIELD_VALUE',
            'SAVE_EDITED_ACCOUNT',
            'FETCH_ACCOUNT',
            'SET_EDIT_FORM_VALUES',
            'EDIT_FORM_CLEAR',
        ]),
        handleSidebarAction({ actionHandler }) {
            const actionHandlersLibrary = {
                save: async () => {
                    await this.SAVE_EDITED_ACCOUNT()
                    await this.$router.push('/third-party-accounts')
                },
                cancel: () => this.$router.push('/third-party-accounts'),
                clear: () => this.EDIT_FORM_CLEAR(),
            }

            actionHandlersLibrary[actionHandler]()
        },
    },
}
</script>

<style lang="scss" scoped module>
.form-wrapper {
    position: relative;
}
</style>
