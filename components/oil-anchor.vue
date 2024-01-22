<script lang="ts" setup>
const props = defineProps({
    oil: {
        type: String,
        required: true
    }
});

const link = computed(
    () => `https://poe.ninja/economy/challenge/oils/${props.oil.toLocaleLowerCase()}-oil`
);
</script>

<style>
.oil-anchor {
    background: #2e2e2e;
    color: #fff;
    width: fit-content;
    padding: 1rem;
}
</style>

<template>
    <nuxt-link :to="link" target="_blank" class="oil-anchor" :class="oil.toLocaleLowerCase()">
        <span>{{ oil }}</span>
    </nuxt-link>
</template>