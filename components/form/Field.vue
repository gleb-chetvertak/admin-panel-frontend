<template>
    <div
        :class="[
            $style['field-wrapper'],
            {[$style['field-wrapper--table']]: isInTable },
        ]"
    >
        <label
            v-if="field.label"
            :class="$style.label"
        >
            {{ `${field.label}:` }}
        </label>

        <textarea
            v-if="field.type === 'textarea'"
            cols="30"
            rows="4"
            :value="field.value"
            :class="[
                $style.input,
                { [$style['input--table']]: isInTable },
            ]"
            @input="$emit('updated-value', $event.target.value)"
            @focus="$emit('activate-field')"
            @focusout="$emit('deactivate-field')"
        />

        <div
            v-else-if="field.type === 'dropdown'"
            :class="$style['dropdown__wrapper']"
        >
            <input
                v-model="dropdownValue"
                type="text"
                :class="[
                    $style.input,
                    { [$style['input--table']]: isInTable },
                ]"
                @focus="$emit('activate-field')"
                @focusout="$emit('deactivate-field')"
            >

            <div
                v-show="isActive"
                :class="$style['dropdown__list']"
            >
                <div
                    v-for="{ _id, label } in getFilteredOptions"
                    :key="`option-${_id}`"
                    :class="[
                        $style['dropdown__item'],
                        { [$style['dropdown__item--selected']]: _id === field.value },
                    ]"
                    @click="handleDropdownSelect(_id, label)"
                >
                    {{ label }}
                </div>
            </div>
        </div>

        <input
            v-else
            :type="field.type"
            :class="[
                $style.input,
                { [$style['input--table']]: isInTable },
            ]"
            :value="field.value"
            @input="$emit('updated-value', $event.target.value)"
            @focus="$emit('activate-field')"
            @focusout="$emit('deactivate-field')"
        >
    </div>
</template>

<script>

export default {
    props: {
        field: {
            type: Object,
            required: true,
        },
        isActive: {
            type: Boolean,
            required: true,
        },
        isInTable: {
            type: Boolean,
            required: true,
        },
    },
    data() {
        return {
            dropdownValue: '',
        }
    },
    computed: {
        getFilteredOptions() {
            if (this.field.options.some(({ label }) => label.toLowerCase() === this.dropdownValue.toLowerCase())) {
                const result = [...this.field.options]

                return result.sort(({ label }) => label.toLowerCase() === this.dropdownValue.toLowerCase()
                    ? -1
                    : 1)
            }

            return this.field.options.filter(({ label }) => label.toLowerCase().includes(this.dropdownValue.toLowerCase()))
        },
    },
    created() {
        this.dropdownValue = this.field.valueLabel
    },
    methods: {
        handleDropdownSelect(id, label) {
            this.$emit('updated-value', id)

            this.$emit('deactivate-field')

            this.dropdownValue = label
        },
    },
}
</script>

<style lang="scss" scoped module>

.field-wrapper {
    @include form-field-wrapper;

    &--table {
        width: 100%;
        margin-bottom: 0;
    }
}

.label {
    @include form-label;
}

.input {
    @include form-input($w: 50%);

    &--table {
        width: 100%;
    }
}

.dropdown {
    &__wrapper {
        position: relative;
    }

    &__list {
        @include form-dropdown($w: 50%);
    }

    &__item {
        @include form-dropdown-item;
    }
}
</style>
