<script lang="ts" setup>
import amulets from '../data/amulets';
import rings from '../data/rings';

class Item {
    readonly originalText: string;
    readonly name: string;
    readonly enchant: string;
    readonly enchantOils: string[];

    constructor(item: string) {
        this.originalText = item;
        this.name = '';
        this.enchant = '';
        this.enchantOils = [];

        const parts = item.split('\n');

        if('' === parts[parts.length -1]) {
            parts.pop();
        }

        if('Unidentified' === parts[parts.length -1]) {
            this.name = 'Unidentified ' + parts[2];
        } else {
            this.name = parts[2] + ' ' + parts[3];
        }

        while (parts.length) {
            const part = parts.shift() as string;
            if(part.endsWith('(enchant)')) {
                const amuletEnchant = part.slice(10, -10);
                const ringEnchant = part.slice(0, -10);
                if(amuletEnchant in amulets) {
                    this.enchant = amuletEnchant;
                    this.enchantOils = amulets[amuletEnchant];
                } else if(ringEnchant in rings) {
                    this.enchant = ringEnchant;
                    this.enchantOils = rings[ringEnchant];
                }
            }
        }
    }
}

const itemText = ref('');
const currentItem = ref<Item | undefined>();
const itemHistory = ref<Map<string, Item>>(new Map());

watch(itemText, () => {
    const history = unref(itemHistory);
    const text = unref(itemText);
    if(history.has(text)) {
        currentItem.value = history.get(text);
    } else {
        const item = new Item(text);
        if(!item.enchant) {
            return;
        }
        currentItem.value = new Item(text);
        history.set(text, currentItem.value);
        itemHistory.value = history;
    }
});

const computedHistory = computed(() => {
    return Array.from(itemHistory.value.values()).reverse();
});

function setCurrentItem(item: Item) {
    currentItem.value = item;
    itemText.value = item.originalText;
}
</script>

<style>
#page-index textarea {
    background: #ddd;
    border: 1px solid #a6a6a6;
    width: 50%;
    padding: 0.5rem;
}

#page-index .oil-list {
    display: flex;
    column-gap: 1rem;
}

#page-index .item-history {
    display: flex;
    gap: 0.5rem;
}

#page-index .item-history button {
    padding: 1rem;
    cursor: pointer;
    text-decoration: underline;
}
</style>

<template>
    <section id="page-index" class="grid">
        <h2>Item matching</h2>
        <p>Paste your item below</p>
        <textarea v-model="itemText"></textarea>
        <h3>Results</h3>
        <p>Enchant: {{ currentItem?.enchant || 'None' }}</p>
        <p>Oils:</p>
        <div class="oil-list">
            <oil-anchor v-for="oil in currentItem?.enchantOils" :oil="oil"></oil-anchor>
        </div>
        <h3>Item history</h3>
        <div class="item-history">
            <button v-for="item in computedHistory" @click="setCurrentItem(item)">{{ item.name }} ({{ item.enchant }})</button>
        </div>
    </section>
</template>