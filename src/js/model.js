import { async } from 'regenerator-runtime';

export const state = {
    recipe: {},
};

export const loadRecipe = async function (idRecipe) {
    try {
        const res = await fetch(
            `https://forkify-api.herokuapp.com/api/v2/recipes/${idRecipe}`
        );

        const data = await res.json();
        if (!res.ok) throw new Error(data.message);

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
        alert(err);
    }
};
