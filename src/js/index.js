import Search from './modules/Search';

/**Global State of the app
* - Search Object
* - Current Receipe Object
* Shopping List object
* - Liked Recipes

**/
const state = {};

const controlSearch = async() => {
	// 1) Get Query from View
	const query = 'pizza'

	if (query) {
		// 2) New Search Object + Add to State
		state.search = new Search(query);

		// 3)  Clear Previous Search, Show Loading Symbol (Prepare UI for results)

		// 4) Search for Receipes
		await state.search.getResults();

		// 5) Render results on UI
		console.log(state.search.result)
	}
}


document.querySelector('.search').addEventListener('submit', e => {
	e.preventDefault();
	controlSearch();
})

const search = new Search('pizza');

search.getResults();
