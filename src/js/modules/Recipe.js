import axios from 'axios';

export default class Recipe{
	constructor(id){
		this.id = id;
	}
	async getRecipe() {
	try {
		const res = await axios(`https://forkify-api.herokuapp.com/api/get?rId=${this.id}`);
			this.result = res.data.recipes;
			this.title = res.data.recipe.title;
			this.author = res.data.recipe.publisher;
			this.image = res.data.recipe.image_url;
			this.source = res.data.recipe.source_url;
			this.ingred = res.data.recipe.ingredients
		} catch (error){
			alert(error);
			alert(' :( Looks like something went wrong! ');
		}
	}
	calcTime() {
		// 3 ingred we need 50 minutes
		const numImg = this.ingred.length;
		const period50 = Math.ceil(numImg / 3);
		this.time = periods * 15;
	}
	calcServings() {
		this.servings = 4;
	}
};
