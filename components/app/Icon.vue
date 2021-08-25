<template>
    <div
        :class="[
            $style['icon-wrapper'],
            $style[`icon-wrapper--col-${iconColor}`]
        ]"
        :style="{
            width: `${iconSize}px`,
            height: `${iconSize}px`,
            pointerEvents: isClickable ? 'all' : 'none',
            cursor: isClickable ? 'pointer' : 'default',
        }"
        v-html="require(`@/assets/img/icons/${iconName}.svg?raw`)"
    />
</template>

<script>

export default {
    props: {
        iconName: {
            type: String,
            required: true,
        },
        iconColor: {
            type: String,
            default: 'blue',
            validator(value) {
                return [
                    'white',
                    // 'light',
                    // 'dark',
                    // 'grey',
                    'blue',
                    'green',
                    // 'red',
                    'orange',
                ].includes(value)
            },
        },
        iconSize: {
            type: Number,
            default: 18,
        },
        isClickable: {
            type: Boolean,
            default: true,
        },
    },
}
</script>

<style lang="scss" scoped module>

.icon-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;

    &--col {
        &-white {
            color: $col-white;
            fill: $col-white;

            &:hover {
                color: $col-gray-2;
                fill: $col-gray-2;
            }
        }

        &-orange {
            color: $col-orange-1;
            fill: $col-orange-1;

            &:hover {
                color: $col-blue-1;
                fill: $col-blue-1;
            }
        }

        &-green {
            color: $col-green-1;
            fill: $col-green-1;

            &:hover {
                color: $col-green-2;
                fill: $col-green-2;
            }
        }

        &-blue {
            color: $col-blue-1;
            fill: $col-blue-1;

            &:hover {
                color: $col-orange-1;
                fill: $col-orange-1;
            }
        }
    }
}
</style>
