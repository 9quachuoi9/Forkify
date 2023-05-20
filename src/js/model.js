import { async } from 'regenerator-runtime';
import { API_URL, RESULT_PER_PAGE } from './config.js';
import { getJson } from './helper.js';

export const state = {
    recipe: {},
    search: {
        query: {},
        results: [],
        page: 1,
        resultPerPage: RESULT_PER_PAGE,
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

export const getSearchResultsPage = function (page = state.search.page) {
    state.search.page = page;
    const start = (page - 1) * state.search.resultPerPage;
    const end = page * state.search.resultPerPage;

    return state.search.results.slice(start, end);
};
