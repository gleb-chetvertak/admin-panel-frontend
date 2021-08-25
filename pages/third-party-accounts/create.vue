<template>
    <div>
        <h1>
            Аккаунты - создание
        </h1>

        <div :class="$style['form-wrapper']">
            <FormField
                v-for="field in CREATE_FORM_FIELDS"
                :key="`field-${field.name}`"
                :field="field"
                @updated-value="(value) => CREATE_FORM_UPDATE_FIELD_VALUE({ value, fieldName: field.name })"
            />

            <LayoutActionsSidePanel
                :actions="CREATE_FORM_SIDEBAR_ACTIONS"
                @button-clicked="handleSidebarAction"
            />
        </div>
    </div>
</template>

<script>

import { mapGetters, mapActions } from 'vuex'

export default {
    name: 'ThirdPartyAccountsCreateRoute',
    computed: {
        ...mapGetters('third-party-accounts', [
            'CREATE_FORM_FIELDS',
            'CREATE_FORM_SIDEBAR_ACTIONS',
        ]),
    },
    methods: {
        ...mapActions('third-party-accounts', [
            'CREATE_FORM_UPDATE_FIELD_VALUE',
            'SAVE_NEW_ACCOUNT',
            'CREATE_FORM_CLEAR',
        ]),
        handleSidebarAction({ actionHandler }) {
            const actionHandlersLibrary = {
                save: async () => {
                    await this.SAVE_NEW_ACCOUNT()
                    await this.$router.push('/third-party-accounts')
                },
                cancel: () => this.$router.push('/third-party-accounts'),
                clear: () => this.CREATE_FORM_CLEAR(),
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
