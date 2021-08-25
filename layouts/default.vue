<template>
    <div :class="$style['template-container']">
        <LayoutSideMenu />

        <main :class="$style.main">
            <Nuxt />
        </main>

        <!-- <slot name="actions-side-panel"/> -->
    </div>
</template>

<style lang="scss" scoped module>
.template-container {
    display: flex;
    min-height: 100vh;
    padding-left: 50px;
}

.main {
    width: 100%;
    padding: 15px 10px 30px 10px;
    overflow: hidden;
}
</style>
