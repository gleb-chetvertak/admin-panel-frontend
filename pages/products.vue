<template>
    <div
        :class="[
            $style.container,
            $style['container--has-actions'],
        ]"
    >
        <NuxtChild v-if="PRODUCTS.length" />
    </div>
</template>

<script>

import { mapActions, mapGetters } from 'vuex'

export default {
    name: 'ProductsRoute',
    computed: {
        ...mapGetters('common', [
            'PRODUCTS',
        ]),
    },
    async created() {
        await this.FETCH_PRODUCTS()
    },
    methods: {
        ...mapActions('common', [
            'FETCH_PRODUCTS',
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
