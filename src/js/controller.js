import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';

import 'core-js/stable';
import 'regenerator-runtime';

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

if (module.hot) {
    module.hot.accept();
}

const controlRecipe = async function () {
    try {
        recipeView.renderSpinner();
        const idRecipe = window.location.hash.slice(1);
        if (!idRecipe) return;

        // 1. Loading recipe
        await model.loadRecipe(idRecipe);

        // 2. Render recipe
        recipeView.render(model.state.recipe);
    } catch (error) {
        recipeView.renderError();
    }
};

const controlSearch = async function () {
    try {
        resultsView.renderSpinner();
        // get search query
        const query = searchView.getQuery();
        if (!query) return;

        // load search results
        await model.loadSearchResults(query);

        // render search results
        resultsView.render(model.state.search.results);
    } catch (error) {
        recipeView.renderError();
    }
};

const init = function () {
    recipeView.addEventHandler(controlRecipe);
    searchView.addHandlerSearch(controlSearch);
};

init();
