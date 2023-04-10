import * as model from './model.js';
import recipeView from './views/recipeView.js';

import 'core-js/stable';
import 'regenerator-runtime';

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
        recipeView.renderError();
    }
};

const init = function () {
    recipeView.addEventHandler(controlRecipe);
};

init();
