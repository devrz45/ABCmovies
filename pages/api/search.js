import fetch from "isomorphic-unfetch"

const API_KEY = "ce90f7c6"

export default async (req, res) => {
	let params = req.query
	if (!params)
		return res.status(400).json({
			Response: "False",
			Error: "Please send search Params",
		})

	let url = getURL(params)
	const data = await fetch(url).then((response) => response.json())
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
