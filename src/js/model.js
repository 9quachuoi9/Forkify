import { async } from 'regenerator-runtime';
import { API_URL } from './config.js';
import { getJson } from './helper.js';

export const state = {
    recipe: {},
};

export const loadRecipe = async function (idRecipe) {
    try {
        const data = await getJson(`${API_URL}/${idRecipe}`);

        const {
            id,
            title,
            publisher,
            ingredients,
            servings,
            image_url: image,
            source_url: sourceUrl,
            cooking_time: cookingTime,
        } = data.data.recipe;

        state.recipe = {
            id,
            title,
            publisher,
            ingredients,
            servings,
            cookingTime,
            image,
            sourceUrl,
        };
    } catch (err) {
        console.error(err);
        throw err;
    }
};
