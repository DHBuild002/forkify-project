import uniqid from 'uniqid';

export default class List {
	constructor() {
		this.items = [];
	}

	addItem (count, unit, ingred){
		const item = {
			id: uniqid(),
			count,
			unit,
			ingred
		};
		this.items.push(item);
		return item;
	}
	deleteItem(id) {
		const index = this.items.findIndex(el => el.id === id);
		this.items.splice(index, 1)
	}
	updateCount(id, newCount){
		this.items.find(el => el.id === id).count = newCount;
	}
}
