import Search from './modules/Search';
import * as searchView from './view/searchView';
import Recipe from './modules/Recipe';
import { elements, renderLoader, clearLoader } from './view/base'

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
	const id = window.location.hash.replace('#', ' ');
	console.log(id);

	if (id) {
		// prepare UI for changes

		// create new recipe object
		state.recipe = new Recipe(id);

		//Testing
		// window.r = state.recipe;


try {
		//get recipe data an dparse the returned result to apply abbrevs and other data manipulations

		await state.recipe.getRecipe();
		state.recipe.parseIngredients();
		// calc servings + time to cook
		state.recipe.calcTime();
		state.recipe.calcServings();
		// Render Recipe
		console.log(state.recipe);
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
