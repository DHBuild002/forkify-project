import Search from './modules/Search';

/**Global State of the app
* - Search Object
* - Current Receipe Object
* Shopping List object
* - Liked Recipes
**/
const state = {};

const search = new Search('pizza')
console.log(search);

search.getResults();
