import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';

import 'core-js/stable';
import 'regenerator-runtime';

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

// if (module.hot) {
//     module.hot.accept();
// }

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

const controlSearchResults = async function () {
    try {
        resultsView.renderSpinner();
        // get search query
        const query = searchView.getQuery();
        if (!query) return;

        // load search results
        await model.loadSearchResults(query);

        // render search results
        resultsView.render(model.getSearchResultsPage());

        // render initial pagination button
        paginationView.render(model.state.search);
    } catch (error) {
        recipeView.renderError();
    }
};

const controlPagination = function (goToPage) {
    // render NEW search results
    resultsView.render(model.getSearchResultsPage(goToPage));

    // render NEW pagination button
    paginationView.render(model.state.search);
};

const init = function () {
    recipeView.addEventHandler(controlRecipe);
    searchView.addHandlerSearch(controlSearchResults);
    paginationView.addHandlerClick(controlPagination);
};

init();
