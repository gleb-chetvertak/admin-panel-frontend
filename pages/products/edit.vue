<template>
    <div>
        <h1>
            Продукты - редактирование
        </h1>

        <div
            v-if="isDataLoaded"
            :class="$style['form-wrapper']"
        >
            <template
                v-for="field in EDIT_FORM_FIELDS"
            >
                <div
                    v-if="field.name === 'specifications'"
                    :key="`field-${field.name}`"
                    :class="$style['field-wrapper']"
                >
                    <label :class="$style.label">
                        {{ `${field.label}:` }}
                    </label>

                    <table
                        :class="$style.specifications"
                    >
                        <TableHead
                            :columns="field.columns"
                            :has-row-actions="false"
                        />

                        <tbody :class="$style['table-body']">
                            <template
                                v-for="({ nameField, value, unit }, rowIndex) in field.rows"
                            >
                                <tr
                                    :key="`row-${rowIndex}`"
                                    :class="[
                                        $style.row
                                    ]"
                                >
                                    <td
                                        :class="[
                                            $style.cell,
                                        ]"
                                    >
                                        <FormField
                                            :field="nameField"
                                            :is-active="activeFormField === `specifications-${rowIndex}-field-name`"
                                            :is-in-table="true"
                                            @updated-value="(value) => handleSpecsUpdate({ value, rowIndex })"
                                            @activate-field="activeFormField = `specifications-${rowIndex}-field-name`"
                                            @deactivate-field="activeFormField = ''"
                                        />
                                    </td>

                                    <td
                                        :class="[
                                            $style.cell,
                                        ]"
                                    >
                                        <FormField
                                            :field="{
                                                name: `specifications-${rowIndex}-value`,
                                                value,
                                            }"
                                            :is-active="activeFormField === `specifications-${rowIndex}-value`"
                                            :is-in-table="true"
                                            @updated-value="(value) => handleSpecsUpdate({ value, rowIndex })"
                                            @activate-field="activeFormField = `specifications-${rowIndex}-value`"
                                            @deactivate-field="activeFormField = ''"
                                        />
                                    </td>

                                    <td
                                        :class="[
                                            $style.cell,
                                        ]"
                                    >
                                        {{ unit }}
                                    </td>
                                </tr>
                            </template>
                        </tbody>
                    </table>
                </div>

                <FormField
                    v-else
                    :key="`field-${field.name}`"
                    :field="field"
                    :is-active="activeFormField === field.name"
                    @updated-value="(value) => EDIT_FORM_UPDATE_FIELD_VALUE({ value, fieldName: field.name })"
                    @activate-field="activeFormField = field.name"
                    @deactivate-field="activeFormField = ''"
                />
            </template>

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
    name: 'ProductsEditRoute',
    data() {
        return {
            activeFormField: '',
            isDataLoaded: false,
        }
    },
    computed: {
        ...mapGetters('products', [
            'EDIT_FORM_FIELDS',
            'EDIT_FORM_SIDEBAR_ACTIONS',
        ]),
        ...mapGetters('common', [
            'CATEGORIES',
            'SPECIFICATIONS',
        ]),
    },
    async created() {
        await this.FETCH_PRODUCT(this.$route.query.id)

        if (!this.CATEGORIES.length) {
            await this.FETCH_CATEGORIES()
        }

        await this.SET_EDIT_FORM_VALUES()

        this.isDataLoaded = true
    },
    methods: {
        ...mapActions('products', [
            'EDIT_FORM_UPDATE_FIELD_VALUE',
            'SAVE_EDITED_PRODUCT',
            'FETCH_PRODUCT',
            'SET_EDIT_FORM_VALUES',
            'EDIT_FORM_CLEAR',
        ]),
        ...mapActions('common', [
            'FETCH_CATEGORIES',
        ]),
        handleSidebarAction({ actionHandler }) {
            const actionHandlersLibrary = {
                save: async () => {
                    await this.SAVE_EDITED_PRODUCT()
                    await this.$router.push('/products')
                },
                cancel: () => this.$router.push('/products'),
                clear: () => this.EDIT_FORM_CLEAR(),
            }

            actionHandlersLibrary[actionHandler]()
        },
        handleSpecsUpdate({ value, rowIndex }) {
            console.log(value, rowIndex)
        },
    },
}
</script>

<style lang="scss" scoped module>
.form-wrapper {
    position: relative;
}

.field-wrapper {
    @include form-field-wrapper;
}

.label {
    @include form-label;
}

.specifications {
    display: grid;
    border-radius: 4px 4px 0 0;
    grid-template-columns: repeat(3, auto);
    color: $col-blue-1;
    box-shadow: $shadow-2;
    outline: none;
}

.table-body,
.row {
    display: contents;
}

.cell {
    display: flex;
    padding: 6px 8px;
    border-right: 1px solid $col-border-grid-tab;
    border-bottom: 1px solid $col-border-grid-tab;
    align-items: center;

    &:last-of-type {
        border-right: none;
    }

    &--actions {
        justify-content: center;
        gap: 10px;
    }

    &--subtable {
        padding: 0;
    }

    &--images {
        justify-content: center;
        gap: 10px;
    }
}
</style>
