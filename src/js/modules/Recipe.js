import axios from 'axios';

export default class recipe {
	constructor(id){
		this.id = id;
	}
	async getRecipe() = {
	try {
		const res = await axios(`https://forkify-api.herokuapp.com/api/get?rId=${this.id}`);
	} catch (error){
		console.log(err)
	}
}
