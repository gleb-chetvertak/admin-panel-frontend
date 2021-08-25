<template>
    <div>
        <h1>
            Продукты - создание
        </h1>

        <div
            v-if="isDataLoaded"
            :class="$style['form-wrapper']"
        >
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
    name: 'ProductsCreateRoute',
    data() {
        return {
            isDataLoaded: false,
        }
    },
    computed: {
        ...mapGetters('products', [
            'CREATE_FORM_FIELDS',
            'CREATE_FORM_SIDEBAR_ACTIONS',
        ]),
    },
    // async created() {
    //     await this.SET_CREATE_FORM_VALUES()

    //     this.isDataLoaded = true
    // },
    methods: {
        ...mapActions('products', [
            // 'SET_CREATE_FORM_VALUES',
            'CREATE_FORM_UPDATE_FIELD_VALUE',
            'SAVE_NEW_PRODUCT',
            'CREATE_FORM_CLEAR',
        ]),
        handleSidebarAction({ actionHandler }) {
            const actionHandlersLibrary = {
                save: async () => {
                    await this.SAVE_NEW_PRODUCT()
                    await this.$router.push('/products')
                },
                cancel: () => this.$router.push('/products'),
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
