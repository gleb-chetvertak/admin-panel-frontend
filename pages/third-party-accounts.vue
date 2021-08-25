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
    name: 'ThirdPartyAccountsRoute',
    created() {
        this.FETCH_ACCOUNTS()
    },
    methods: {
        ...mapActions('third-party-accounts', [
            'FETCH_ACCOUNTS',
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
