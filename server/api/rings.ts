import { readFileSync, writeFileSync } from 'node:fs';
import { parseFromString, Node } from 'dom-parser';

interface Recipes {
    [name: string]: string[];
}

interface Recipe {
    name: string;
    oils: string[];
}

const spaces = /\s\s+/;

function extractRow(nameRow: Node, oilNode: Node): Recipe {
    let name = (nameRow.childNodes[0].textContent as string);
    name = name.replace('\n', '').replace(spaces, ' ');
    const oils: string [] = [];
    oilNode.getElementsByTagName('img')?.forEach((img) => {
        oils.push(img.getAttribute('alt').slice(0, -4));
    });
    return {
        name,
        oils
    };
}

export default defineEventHandler(() => {
    const html = readFileSync('./data/table-rings.html', { encoding: 'utf-8' });
    const doc = parseFromString(html);
    const rows = doc.getElementsByClassName('oils');
    const recipes: Recipes = {};
    doc.getElementsByClassName('description')?.forEach((row, idx) => {
        const { name, oils } = extractRow(row as any, rows[idx] as any);
        recipes[name] = oils;
    });
    writeFileSync('./data/rings.json', JSON.stringify(recipes));
    return recipes;
});