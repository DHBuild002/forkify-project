import Search from './modules/Search';
import Recipe from './modules/Recipe';
import List from './modules/List';

import * as searchView from './view/searchView';
import * as recipeView from './view/recipeView';
import * as listView from './view/listView';

import { elements, renderLoader, clearLoader } from './view/base';

/**Global State of the app
* - Search Object
* - Current Receipe Object
* Shopping List object
* - Liked Recipes

**/

// Search Controller
const state = {};
window.state = state;

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
		// 4) Search for Recipes
		await state.search.getResults();

		// 5) Render results on UI
		clearLoader();
		searchView.renderResults(state.search.result);
	} catch (err){
		alert('Something went wrong in processing this search - ' + err);
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
Recipe Section Controller

*/
const controlRecipe = async() => {
	// get id from URL
	const id = window.location.hash.replace('#', '');

	if (id) {
		// prepare UI for changes
		recipeView.clearRecipe();
		renderLoader(elements.recipe);

		if (state.search) searchView.highlightSelected(id);

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
		console.log(err);
			alert('Something went wrong - Second Catch '+ err);
		}
	}
}

/*
window.addEventListener('hashchange', controlRecipe)
window.addEventListener('load', controlRecipe)
*/
// The above is the same as the below:
['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));

const controlList = () => {
	if(!state.list) state.list = new List();

	state.recipe.ingred.forEach(el => {
		const item = state.list.addItem(el.count, el.unit, el.ingredient);
		listView.renderItem(item);
	});
}
// Handle Delete and Update list item events
elements.shopping.addEventListener('click', e => {
	const id = e.target.closest('.shopping__item').dataset.itemid;

	// Handle delete event
	if(e.target.matches('.shopping__delete, .shopping__delete *')){
			state.list.deleteItem(id);

			// Delete from UI
			listView.deleteItem(id);
	}
});

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
			else if (e.target.matches('.recipe__btn--add, .recipe__btn *')) {
				controlList();
			}
	});
//window.L = new List();
