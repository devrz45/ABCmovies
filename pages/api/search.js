import fetch from "isomorphic-unfetch"
import { searchData, SearchData2, ErrorResponse, movieData } from "./mock/data"

const API_KEY = "ce90f7c6"

export default async (req, res) => {
	let params = req.query
	// let data = null
	if (!params)
		return res.status(400).json({
			Response: "False",
			Error: "Please send search Params",
		})
	if (params.s && params.s.length < 3)
		return res.status(200).json(ErrorResponse)

	let url = getURL(params)
	const data = await fetch(url).then((response) => response.json())
	/* Using mocks */
	// if (params.i) data = movieData
	// else data = params.page % 2 == 0 ? searchData : SearchData2
	res.status(200).json(data)
}

const getURL = (params) => {
	let baseURL = `http://www.omdbapi.com/?apikey=${API_KEY}`
	let paramsAppendURL = Object.keys(params).reduce(
		(url, param) => url + `&${param}=${params[param]}`,
		""
	)
	return baseURL + paramsAppendURL
}
