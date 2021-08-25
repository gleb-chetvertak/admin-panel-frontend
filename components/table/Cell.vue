<template>
    <td
        v-if="type === 'actions'"
        :class="[
            $style.cell,
            $style['cell--actions']
        ]"
    >
        <AppIcon
            v-for="{ name, actionHandler, icon = {} } in value"
            :key="`action-${name}`"
            :icon-name="icon.iconName || defaultActionViews[name].iconName"
            :icon-color="icon.iconColor || defaultActionViews[name].iconColor"
            :icon-size="icon.iconSize || defaultActionViews[name].iconSize"
            @click.native="$emit('button-clicked', actionHandler)"
        />
    </td>

    <td
        v-else-if="type === 'specifications'"
        :class="[
            $style.cell,
            $style['cell--subtable'],
        ]"
    >
        <div
            :class="$style['subtable']"
        >
            <template
                v-for="{ _id, name, value: specsValue } in value"
            >
                <div
                    :key="`specification-${_id}-name`"
                    :class="$style['subtable__cell']"
                >
                    {{ name }}
                </div>
                <div
                    :key="`specification-${_id}-value`"
                    :class="$style['subtable__cell']"
                >
                    {{ specsValue }}
                </div>
            </template>
        </div>
    </td>

    <td
        v-else-if="type === 'images'"
        :class="[
            $style.cell,
            $style['cell--images'],
        ]"
    >
        <img
            :src="`data:image/jpg;base64, ${value[0]}`"
            alt="Img"
            :class="[
                $style.image,
            ]"
        >
    </td>

    <td
        v-else
        :class="$style.cell"
    >
        {{ value }}
    </td>
</template>

<script>

export default {
    props: {
        type: {
            type: String,
            default: 'text',
        },
        value: {
            type: [String, Array],
            default: 'Нет данных',
        },
    },
    data() {
        return {
            defaultActionViews: {
                edit: {
                    iconName: 'edit',
                    iconColor: 'blue',
                    iconSize: 18,
                },
                create: {
                    iconName: 'plus',
                    iconColor: 'green',
                    iconSize: 14,
                },
                delete: {
                    iconName: 'delete',
                    iconColor: 'orange',
                    iconSize: 20,
                },
            },
        }
    },
}
</script>

<style lang="scss" scoped module>

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

.subtable {
    display: grid;
    width: 100%;
    max-height: 200px;
    grid-template-columns: repeat(2, auto);
    justify-content: stretch;
    overflow-y: auto;

    &__cell {
        padding: 8px;
        border: 1px solid $col-border-grid-tab;
    }
}

.image {
    max-width: 200px;
    max-height: 200px;
}
</style>
