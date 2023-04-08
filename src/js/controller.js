import * as model from './model.js';
import recipeView from './views/recipeView.js';

import 'core-js/stable';
import 'regenerator-runtime';

const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
    return new Promise(function (_, reject) {
        setTimeout(function () {
            reject(
                new Error(`Request took too long! Timeout after ${s} second`)
            );
        }, s * 1000);
    });
};

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipe = async function () {
    try {
        const idRecipe = window.location.hash.slice(1);
        if (!idRecipe) return;

        recipeView.renderSpinner();
        // 1. Loading recipe
        await model.loadRecipe(idRecipe);

        // 2. Render recipe
        recipeView.render(model.state.recipe);
    } catch (error) {
        alert(error);
    }
};

['hashchange', 'load'].forEach(ev =>
    window.addEventListener(ev, controlRecipe)
);
