<script lang="ts" setup>
import amulets from '../data/amulets';
import rings from '../data/rings';
import oils from '../data/oils';

const slectedOils = ref(oils);
</script>

<template>
    <section id="page-oil-matching" class="grid">
        <h2>Oil matching</h2>
        <p>Select an oil below to filter enchants</p>
        <div class="oils"></div>
    </section>
</template>