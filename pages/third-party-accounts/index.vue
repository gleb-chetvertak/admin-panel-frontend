<template>
    <div>
        <h1>
            Аккаунты
        </h1>

        <div
            v-if="ACCOUNTS.length"
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
                        v-for="(row, rowIndex) in ACCOUNTS"
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
                                :type="type"
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
    name: 'ThirdPartyAccountsTableRoute',
    computed: {
        ...mapGetters('third-party-accounts', [
            'ACCOUNTS',
            'TABLE_COLUMNS',
            'TABLE_SIDEBAR_ACTIONS',
            'TABLE_ROW_ACTIONS',
        ]),
    },
    methods: {
        ...mapActions('third-party-accounts', [
            'DELETE_ACCOUNT',
        ]),
        handleRowAction({ actionHandler, rowId }) {
            const actionHandlersLibrary = {
                edit: () => this.$router.push(`/third-party-accounts/edit?id=${rowId}`),
                delete: () => this.DELETE_ACCOUNT(rowId),
            }

            actionHandlersLibrary[actionHandler]()
        },
        handleSidebarAction({ actionHandler }) {
            const actionHandlersLibrary = {
                create: () => this.$router.push('/third-party-accounts/create'),
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
    grid-template-columns: repeat(5, auto);
    color: $col-blue-1;
    box-shadow: $shadow-2;
    overflow-y: auto;
    outline: none;
}

.table-body,
.row {
    display: contents;
}

.cell {
    display: flex;
    padding: 8px;
    border-right: 1px solid $col-border-grid-tab;
    border-bottom: 1px solid $col-border-grid-tab;
    font-weight: 600;
    background-color: $col-gray-2;

    &:last-of-type {
        border-right: none;
    }

    &--halign {
        &-center {
            justify-content: center;
        }
    }
}
</style>
