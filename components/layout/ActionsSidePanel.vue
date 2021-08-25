<template>
    <div :class="$style['actions-side-panel']">
        <AppButton
            v-for="({ name, label, actionHandler, button = {} }, actionIndex) in actions"
            :key="`table-action-${actionIndex}`"
            :size="button.size || defaultActionViews[name].size"
            :palette="button.palette || defaultActionViews[name].palette"
            :variant="button.variant || defaultActionViews[name].variant"
            @click.native="$emit('button-clicked', { actionHandler })"
        >
            <AppIcon
                v-if="isMinified"
                :icon-name="defaultActionViews[name].iconName"
                :icon-color="defaultActionViews[name].iconColor"
                :icon-size="defaultActionViews[name].iconSize"
                :is-clickable="false"
                @click.native="$emit('button-clicked', actionHandler)"
            />
            <span v-else>
                {{ label || defaultActionViews[name].label }}
            </span>
        </AppButton>
        <AppIcon
            icon-name="arrow-circle-right"
            :icon-size="30"
            icon-color="white"
            :class="[
                $style['toggle-icon'],
                {[$style['toggle-icon--active']]: !isMinified}
            ]"
            @click.native="isMinified = !isMinified"
        />
    </div>
</template>

<script>

export default {
    props: {
        actions: {
            type: Array,
            required: true,
        },
    },
    data() {
        return {
            defaultActionViews: {
                create: {
                    size: 30,
                    palette: 'green',
                    variant: 'raised',
                    label: 'Создать',
                    iconName: 'plus',
                    iconSize: 18,
                    iconColor: 'white',
                },
                save: {
                    size: 30,
                    palette: 'green',
                    variant: 'raised',
                    label: 'Сохранить',
                    iconName: 'save',
                    iconSize: 18,
                    iconColor: 'white',
                },
                cancel: {
                    size: 30,
                    palette: 'orange',
                    variant: 'raised',
                    label: 'Отменить',
                    iconName: 'close',
                    iconSize: 18,
                    iconColor: 'white',
                },
                clear: {
                    size: 30,
                    palette: 'gray',
                    variant: 'raised',
                    label: 'Очистить',
                    iconName: 'backspace',
                    iconSize: 18,
                    iconColor: 'white',
                },
            },
            isMinified: true,
        }
    },
}
</script>

<style lang="scss" scoped module>

.actions-side-panel {
    display: flex;
    height: 100vh;
    padding: 30px 5px;
    position: fixed;
    top: 0;
    right: 0;
    z-index: 100;
    flex-direction: column;
    align-items: center;
    gap: 2vh;
    background-color: $col-blue-1;
    box-shadow: $shadow-3;
}

.toggle-icon {
    margin-top: auto;
    transform: rotate(180deg);
    will-change: transform;
    transition: $anim-1;

    &--active {
        transform: rotate(0);
    }
}
</style>
