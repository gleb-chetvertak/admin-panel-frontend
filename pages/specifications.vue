<template>
    <div
        :class="[
            $style.container,
            $style['container--has-actions'],
        ]"
    >
        <NuxtChild />
    </div>
</template>

<script>

import { mapActions } from 'vuex'

export default {
    name: 'SpecificationsRoute',
    created() {
        this.FETCH_SPECIFICATIONS()
    },
    methods: {
        ...mapActions('specifications', [
            'FETCH_SPECIFICATIONS',
        ]),
    },
}
</script>

<style lang="scss" scoped module>
.container {
    &--has-actions {
        padding-right: 50px;
    }
}
</style>
