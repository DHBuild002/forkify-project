import { elements } from './base';

export const getInput = () => elements.searchInput.value;

export  const clearInput = () => {
	elements.searchInput.value = ' ';
}
export const clearResults = () => {
	elements.searchList.innerHTML = ' ';
}

const abbrTitle = (title, limit = 17) => {
	const newTitle = [];
	if (title.length > limit) {
		title.split(' ').reduce((acc, cur) => {
			if (acc + cur.length <= limit) {
				newTitle.push(cur);
			}
			return acc + cur.length;
		}, 0);
		return `${newTitle.join(' ')} ...`;
	}
	return title;
}
const renderRecipe = recipe => {
	const markup =
	 `<li>
			<a class="results__link results__link--active" href="#${recipe.recipe_id}">
					<figure class="results__fig">
							<img src="${recipe.image_url}" alt="Test">
					</figure>
					<div class="results__data">
							<h4 class="results__name">${abbrTitle(recipe.title)}.</h4>
							<p class="results__author">${recipe.publisher}</p>
					</div>
			</a>
	</li>`;
	elements.searchList.insertAdjacentHTML('beforeend', markup);
};

const createButton = (page, type)
const renderButtons = (page, numResults, resultsPerPage) => {
	const pages = numResults / resPerPage;

	if (page === 1 && pages > 1) {
		// button to go to next page


	}else if (page < pages){
		// we want both next and previous buttons

	} else if (page === pages && pages > 1) {
		// show only last button but one
	}
};
export const renderResults = (recipes, page = 1 , resPerPage = 3) => {
	const start = (page - 1) * resPerPage;
	const end = page * resPerPage;

	recipes.slice(start, end).forEach(renderRecipe);

};
