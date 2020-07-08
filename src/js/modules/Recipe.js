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
			alert(' Something went wrong in finding your Recipe -  ' + error);
		}
	}
	calcTime() {
		// 3 ingred we need 50 minutes
		const numImg = this.ingred.length;
		const period50 = Math.ceil(numImg / 3);
		this.time = period50 * 15;
	}
	calcServings() {
		this.servings = 4;
	}
	parseIngredients() {
			const unitsLong = ['tablespoons', 'tablespoon', 'ounces', 'ounce', 'teaspoons', 'teaspoon', 'cups', 'pounds', 'pound'];
			const unitsShort = ['tbsp', 'tbsp', 'oz', 'oz', 'tsp', 'tsp', 'cup', 'lbs', 'lb'];
			const units = [...unitsShort, 'kg', 'g']

			const newIngredients = this.ingred.map(el => {
			//Uniform units
				let ingredient = el.toLowerCase();
				unitsLong.forEach((unit, i) => {
					ingredient = ingredient.replace(unit, unitsShort[i]);
				});
			// Remove Parentheses
			ingredient = ingredient.replace(/ *\([^)]*\) */g, ' ');
			// My method from StackExchange: /[' ']/g

			// Parse Ingredients into count, unit and ingredient
			const arrIng =  ingredient.split(' ');
			const unitIndex = arrIng.indexOf(el2 => units.includes(el2));

			let objIng;
			if (unitIndex > -1){
				// there is a unit
				const arrCount = arrIng.slice(0, unitIndex);

				let count;
				if(arrCount.length === 1) {
					count = eval(arrIng[0].replace('-', '+'));
				} else {
					count = eval(arrIng[0].slice(0, unitIndex).join('+'));
				};

				objIng = {
					count,
					unit: arrIng[unitIndex],
					ingredient: arrIng.slice(unitIndex + 1).join(' ')
				};
			}
			// This is the evaluation that is being outputted for all ingredients in the Units section of listView:
			else if (parseInt(arrIng[0], 10)) {
				objIng = {
					count: parseInt(arrIng[0], 10),
					unit: '',
					ingredient: arrIng.slice(1).join(' ')
				}
			} else if (unitIndex === -1) {
				// There is NO Unit and No Number in 1st position
				objIng = {
					count: 1,
					unit: '',
					ingredient
				}
			}
			return objIng;
		});
		this.ingred = newIngredients;
	}
	updateServings (type) {
			//servings
			const newServings = type === 'dec' ? this.servings -1 : this.servings + 1;

			//Ingredients
			this.ingred.forEach(ing => {
				ing.count *= (newServings / this.servings);
			});
			this.servings = newServings;
	}
};
