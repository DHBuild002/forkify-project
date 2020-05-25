import Search from './modules/Search';
import * as searchView from './view/searchView';
import { elements } from './view/base';

/**Global State of the app
* - Search Object
* - Current Receipe Object
* Shopping List object
* - Liked Recipes

**/
const state = {};

const controlSearch = async() => {
	// 1) Get Query from View
	const query = searchView.getInput();
	console.log(query);

	if (query) {
		// 2) New Search Object + Add to State
		state.search = new Search(query);

		// 3)  Clear Previous Search, Show Loading Symbol (Prepare UI for results)
		searchView.clearInput();
		searchView.clearResults();
		// 4) Search for Receipes
		await state.search.getResults();

		// 5) Render results on UI
		searchView.renderResults(state.search.result);
	}
}


elements.searchForm.addEventListener('submit', e => {
	e.preventDefault();
	controlSearch();
});

// search.getResults();
