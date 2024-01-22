import { readFileSync, writeFileSync } from 'node:fs';

interface Recipes {
    [name: string]: string[];
}

export default defineEventHandler(() => {
    // I picked the official GGG skilltree as data source
    const data = readFileSync('./data/skilltree.json', { encoding: 'utf-8' });
    const json = JSON.parse(data);
    const recipes: Recipes = {};
    for(const id in json.nodes) {
        if(json.nodes[id].recipe) {
            const recipe = (json.nodes[id].recipe as string[]).map(oil => oil.slice(0, -3));
            recipes[json.nodes[id].name] = recipe;
        }
    }
    writeFileSync('./data/amulets.json', JSON.stringify(recipes));
    return recipes;
});