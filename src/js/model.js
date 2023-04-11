import { async } from 'regenerator-runtime';
import { API_URL } from './config.js';
import { getJson } from './helper.js';

export const state = {
    recipe: {},
    search: {
        query: {},
        results: [],
    },
};

export const loadRecipe = async function (idRecipe) {
    try {
        const data = await getJson(`${API_URL}${idRecipe}`);

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

export const loadSearchResults = async function (query) {
    try {
        state.search.query = query;
        const data = await getJson(`${API_URL}?search=${query}`);
        console.log(data);

        state.search.results = data.data.recipes.map(recipe => {
            return {
                id: recipe.id,
                title: recipe.title,
                publisher: recipe.publisher,
                image: recipe.image_url,
            };
        });
    } catch (error) {
        console.error(error);
        throw error;
    }
};
