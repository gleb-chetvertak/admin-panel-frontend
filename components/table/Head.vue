<template>
    <thead :class="$style['table-head']">
        <tr
            :class="$style.row"
        >
            <th
                v-if="hasRowActions"
                :class="[
                    $style.cell,
                    $style['cell--halign-center']
                ]"
            >
                Действия
            </th>
            <th
                v-for="column in columns"
                :key="column.name"
                :class="$style.cell"
            >
                <span>
                    {{ column.label }}
                </span>
            </th>
        </tr>
    </thead>
</template>

<script>

export default {
    props: {
        columns: {
            type: Array,
            required: true,
        },
        hasRowActions: {
            type: Boolean,
            required: true,
        },
    },
}
</script>

<style lang="scss" scoped module>

.table-head {
    display: contents;
}

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
