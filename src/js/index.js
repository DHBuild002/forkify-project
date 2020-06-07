import Search from './modules/Search';
import Recipe from './modules/Recipe';

import * as searchView from './view/searchView';
import * as recipeView from './view/recipeView';

import { elements, renderLoader, clearLoader } from './view/base';

/**Global State of the app
* - Search Object
* - Current Receipe Object
* Shopping List object
* - Liked Recipes

**/
const state = {};

const controlSearch = async() => {
	// 1) Get Query from View
	// const query = 'pizza';
	const query = searchView.getInput();

	if (query) {
		// 2) New Search Object + Add to State
		state.search = new Search(query);

		// 3)  Clear Previous Search, Show Loading Symbol (Prepare UI for results)
		searchView.clearInput();
		searchView.clearResults();
		renderLoader(elements.searchRes);
		try{
		// 4) Search for Receipes
		await state.search.getResults();

		// 5) Render results on UI
		clearLoader();
		searchView.renderResults(state.search.result);
	} catch {
		alert('Something went wrong in processing this search - ' + error);
	}


	}
}

elements.searchForm.addEventListener('submit', e => {
	e.preventDefault();
	controlSearch();
});

/*
// Testing
window.addEventListener('load', e => {
	e.preventDefault();
	controlSearch();
});
*/
elements.searchResPages.addEventListener('click', e => {
	const btn = e.target.closest('.btn-inline')
	if(btn){
		const goToPage = parseInt(btn.dataset.goto, 10);
		searchView.clearResults();
		searchView.renderResults(state.search.result, goToPage);
		console.log(goToPage);
	}
});

/*
Search Recipe

*/
const controlRecipe = async() => {
	// get id from URL
	const id = window.location.hash.replace('#', '');

	if (id) {
		// prepare UI for changes
		recipeView.clearRecipe();
		renderLoader(elements.recipe);

		if (state.search)
		console.log(id);
		searchView.highlightSelected(id);

		// create new recipe object
		state.recipe = new Recipe(id);

		//Testing
		// window.r = state.recipe;

try {
		//get recipe data
		await state.recipe.getRecipe();

		// parseIngredients: Tweak the ingredients in the Recipe to make them appear more uniform -
		// See  Recipe.js for more details
		state.recipe.parseIngredients();

		// calc servings + time to cook
		state.recipe.calcTime();
		state.recipe.calcServings();

		// Render Recipe
		clearLoader();
		recipeView.renderRecipe(state.recipe);

	}	catch (err) {
			alert('Something went wrong - Second Catch');
		}
	}
}

/*
window.addEventListener('hashchange', controlRecipe)
window.addEventListener('load', controlRecipe)
*/
// The above is the same as the below:
['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));

// Handle Recipe button clicks
elements.recipe.addEventListener('click', e => {
	if (e.target.matches('.btn-decrease, .btn-decrease *')) {
		// Decrease button is clicked
		if(state.recipe.servings > 1) {
			state.recipe.updateServings('dec');
			recipeView.updateServingsIngred(state.recipe)
		}
	} else if (e.target.matches('.btn-increase, .btn-increase *')) {
			state.recipe.updateServings('inc');
			recipeView.updateServingsIngred(state.recipe);
			}
	console.log(state.recipe)
	});
