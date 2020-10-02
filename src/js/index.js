import Search from './modules/Search';
import Recipe from './modules/Recipe';
import List from './modules/List';
import Like from './modules/Like';

import * as searchView from './view/searchView';
import * as recipeView from './view/recipeView';
import * as listView from './view/listView';
import * as likesView from './view/likesView';

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
List Section Controller
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

		// parseIngredients: Tweak the ingredients in the Recipe to make them appear more uniform - See  Recipe.js for more details
		state.recipe.parseIngredients();

		// calc servings + time to cook
		state.recipe.calcTime();
		state.recipe.calcServings();

		// Render Recipe
		clearLoader();
		recipeView.renderRecipe(
			state.recipe, 
			state.likes.isLiked(id)
			)

	}	catch (err) {
		console.log(err);
		alert('Something went wrong - Second Catch '+ err);
		}
	}
}

/*
Like Section Controller
*/

state.likes = new Like();

const controlLike = () => {
	if(!state.likes) state.likes = new Like();
	const currentID = state.recipe.id;

	// User has not yet liked current recipe
	if (!state.likes.isLiked(currentID)) {
		// Add like to the state
		const newLike = state.likes.addLike(
			currentID,
			state.recipe.title,
			state.recipe.author,
			state.recipe.img
		);
		//Toggle the like button	
		likesView.toggleLikeBtn(true);

		// Add like to the UI Like list
		likesView.renderLike(newLike);
		console.log(state.likes);
	// User has liked current recipe	
	} else {
		// Remove like from the state
		state.likes.deleteLike(currentID);

		//Toggle the like button
		likesView.toggleLikeBtn(false);

		// Remove like from the UI Like list
		likesView.deleteLike(currentID);
		console.log(state.likes);
	}
	likesView.toggleLikeMenu(state.likes.getNumLikes());
}



/*
window.addEventListener('hashchange', controlRecipe)
window.addEventListener('load', controlRecipe)
*/
['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));

const controlList = () => {
	if(!state.list) state.list = new List();

	//add Each item to list and UI
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
			// Delete from State
			state.list.deleteItem(id);

			// Delete from UI
			listView.deleteItem(id);
	} else if(e.target.matches('.shopping__count-value')) {
		const val = parseFloat(e.target.value, 10);
		state.list.updateCount(id, val);
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
				// Add ingredients to shopping list function
				controlList();
			} else if (e.target.matches('.recipe__love, .recipe__love *')) {
				// like controller
				controlLike();
			}
	});
//window.L = new List();
