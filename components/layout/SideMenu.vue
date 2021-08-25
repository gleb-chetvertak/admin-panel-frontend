<template>
    <div :class="$style['side-menu']">
        <nav :class="$style.nav">
            <ol :class="$style['nav-list']">
                <template v-for="({ label, link, icon }, routeIndex) in routes">
                    <li
                        :key="`route-${routeIndex}`"
                    >
                        <NuxtLink
                            :to="`${link}`"
                            :class="[
                                'sidebar-nav-link',
                                $style['nav-link']
                            ]"
                        >
                            <AppIcon
                                v-if="isMinified"
                                :icon-name="icon.iconName"
                                :icon-color="icon.iconColor"
                                :icon-size="icon.iconSize"
                                :is-clickable="false"
                                @click.native="$emit('button-clicked', actionHandler)"
                            />
                            <span v-else>
                                {{ label }}
                            </span>
                        </NuxtLink>
                    </li>
                </template>
            </ol>
        </nav>
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
    data() {
        return {
            routes: [
                {
                    label: 'Главная',
                    link: '/',
                    icon: {
                        iconName: 'home',
                        iconSize: 18,
                        iconColor: 'white',
                    },
                },
                {
                    label: 'Товары',
                    link: '/products',
                    icon: {
                        iconName: 'tags',
                        iconSize: 18,
                        iconColor: 'white',
                    },
                },
                {
                    label: 'Товары',
                    link: '/categories',
                    icon: {
                        iconName: 'object-group',
                        iconSize: 18,
                        iconColor: 'white',
                    },
                },
                {
                    label: 'Характеристики',
                    link: '/specifications',
                    icon: {
                        iconName: 'sliders-h',
                        iconSize: 18,
                        iconColor: 'white',
                    },
                },
                {
                    label: 'Заявки',
                    link: '/requests',
                    icon: {
                        iconName: 'headset',
                        iconSize: 18,
                        iconColor: 'white',
                    },
                },
                {
                    label: 'Заказы',
                    link: '/orders',
                    icon: {
                        iconName: 'cash-register',
                        iconSize: 18,
                        iconColor: 'white',
                    },
                },
                {
                    label: 'Аккаунты',
                    link: '/third-party-accounts',
                    icon: {
                        iconName: 'globe',
                        iconSize: 18,
                        iconColor: 'white',
                    },
                },
            ],
            isMinified: true,
        }
    },
}
</script>

<style lang="scss">

.sidebar-nav-link {
    border-left: 4px solid transparent;

    &.nuxt-link-exact-active {
        border-color: $col-orange-1;
    }
}

</style>

<style lang="scss" scoped module>

.side-menu {
    display: flex;
    height: 100vh;
    padding: 30px 0;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
    flex-direction: column;
    align-items: center;
    background-color: $col-blue-1;
    box-shadow: $shadow-1;
}

.nav {
    height: 100%;
}

.nav-list {
    display: flex;
    padding: 0;
    margin: 0;
    flex-direction: column;
    gap: 2vh;
    list-style: none;
}

.nav-link {
    display: inline-block;
    width: 100%;
    padding: 10px 14px;
    font-family: $ffSec;
    font-size: 14px;
    font-weight: 300;
    letter-spacing: 0.12rem;
    color: $col-white;

    &:hover {
        color: $col-orange-1;
    }
}

.toggle-icon {
    margin-top: auto;
    will-change: transform;
    transition: $anim-1;

    &--active {
        transform: rotate(180deg);
    }
}
</style>
