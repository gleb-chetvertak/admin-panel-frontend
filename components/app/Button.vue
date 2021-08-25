<template>
    <button
        v-bind="{ type, disabled }"
        :class="[
            $style.button,
            $style[`button--variant-${variant}`],
            $style[`button--palette-${palette}`],
        ]"
        :style="buttonStyle"
    >
        <slot />
    </button>
</template>

<script>

export default {
    props: {
        size: {
            type: [Number, String],
            default: 30,
        },
        variant: {
            type: String,
            default: 'raised',
            validator(value) {
                return [
                    'raised',
                ].includes(value)
            },
        },
        palette: {
            type: String,
            default: 'orange',
            validator(value) {
                return [
                    // 'light',
                    // 'dark',
                    'gray',
                    // 'blue',
                    'green',
                    // 'red',
                    'orange',
                ].includes(value)
            },
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        type: {
            type: String,
            default: 'button',
        },
    },
    computed: {
        buttonStyle() {
            const paddingY = Math.round(this.size / 4)
            const paddingX = Math.round(this.size / 3)

            return {
                padding: `${paddingY}px ${paddingX}px`,
                fontSize: Math.round(this.size / 2.5) + 'px',
            }
        },
    },
}
</script>

<style lang="scss" scoped module>

.button {
    border: none;
    font-weight: 500;
    // letter-spacing: 0.12rem;
    cursor: pointer;

    &--variant {
        &-raised {
            border-width: 1px;
            border-style: solid;
            border-radius: 4px;
        }
    }

    &--palette {
        &-orange {
            border-color: $col-orange-1;
            color: $col-white;
            background-color: $col-orange-1;
            will-change: border-color, color, background-color;

            &:hover {
                // border-color: $col-gray-2;
                // color: $col-orange-1;
                // background-color: $col-white;
                opacity: 0.7;
            }
        }

        &-green {
            border-color: $col-green-1;
            color: $col-white;
            background-color: $col-green-1;
            will-change: border-color, color, background-color;

            &:hover {
                // border-color: $col-gray-2;
                // color: $col-green-1;
                // background-color: $col-white;
                opacity: 0.7;
            }
        }

        &-gray {
            border-color: $col-gray-1;
            color: $col-white;
            background-color: $col-gray-1;
            will-change: border-color, color, background-color;

            &:hover {
                // border-color: $col-gray-2;
                // color: $col-gray-1;
                // background-color: $col-white;
                opacity: 0.7;
            }
        }
    }
}
</style>
