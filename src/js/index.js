import axios from 'axios';

// https://forkify-api.herokuapp.com/api/search
async function getResults(query) {
	const res = await axios(`https://forkify-api.herokuapp.com/api/search?q=${query}`)
		console.log(res)
}
getResults('Pizza');
