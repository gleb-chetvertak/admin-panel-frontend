<template>
    <div>
        <h1>
            Продукты
        </h1>

        <div
            v-if="isDataLoaded"
        >
            <table
                :class="$style.table"
            >
                <TableHead
                    :columns="TABLE_COLUMNS"
                    :has-row-actions="!!TABLE_ROW_ACTIONS.length"
                />

                <tbody :class="$style['table-body']">
                    <template
                        v-for="(row, rowIndex) in TABLE_ROWS"
                    >
                        <tr
                            :key="`row-${rowIndex}`"
                            :class="[
                                $style.row
                            ]"
                        >
                            <TableCell
                                type="actions"
                                :value="TABLE_ROW_ACTIONS"
                                @button-clicked="handleRowAction({ actionHandler: $event, rowId: row['_id'] })"
                            />

                            <TableCell
                                v-for="({ name: columnName, type }) in TABLE_COLUMNS"
                                :key="`body-row-${rowIndex}-cell-${columnName}`"
                                :value="row[columnName]"
                                :type="type || columnName"
                            />
                        </tr>
                    </template>
                </tbody>
            </table>
        </div>

        <LayoutActionsSidePanel
            :actions="TABLE_SIDEBAR_ACTIONS"
            @button-clicked="handleSidebarAction"
        />
    </div>
</template>

<script>

import { mapGetters, mapActions } from 'vuex'

export default {
    name: 'ProductsTableRoute',
    data() {
        return {
            isDataLoaded: false,
        }
    },
    computed: {
        ...mapGetters('products', [
            'TABLE_ROWS',
            'TABLE_COLUMNS',
            'TABLE_SIDEBAR_ACTIONS',
            'TABLE_ROW_ACTIONS',
        ]),
    },
    async created() {
        await this.SET_TABLE()

        this.isDataLoaded = true
    },
    methods: {
        ...mapActions('products', [
            'SET_TABLE',
            'DELETE_PRODUCT',
        ]),
        handleRowAction({ actionHandler, rowId }) {
            const actionHandlersLibrary = {
                edit: () => this.$router.push(`/products/edit?id=${rowId}`),
                delete: () => this.DELETE_PRODUCT(rowId),
            }

            actionHandlersLibrary[actionHandler]()
        },
        handleSidebarAction({ actionHandler }) {
            const actionHandlersLibrary = {
                create: () => this.$router.push('/products/create'),
            }

            actionHandlersLibrary[actionHandler]()
        },
    },
}
</script>

<style lang="scss" scoped module>
.table {
    display: grid;
    border-radius: 4px 4px 0 0;
    grid-template-columns: repeat(6, auto);
    color: $col-blue-1;
    box-shadow: $shadow-2;
    overflow-y: auto;
    outline: none;
}

.table-body,
.row {
    display: contents;
}
</style>
