import fetch from "isomorphic-unfetch"
import { searchData, SearchData2, ErrorResponse, movieData } from "./mock/data"
import Cors from "cors"

const API_KEY = "ce90f7c6"

// Initializing the cors middleware
const whitelist = [
	"https://abcmovies.herokuapp.com",
	"http://abcmovies.herokuapp.com",
	"http://localhost:3000",
]
const corsOptions = {
	origin: function (origin, callback) {
		if (whitelist.indexOf(origin) !== -1 || !origin) {
			callback(null, true)
		} else {
			callback(new Error("Not allowed by CORS"))
		}
	},
	optionsSuccessStatus: 200,
}
const cors = Cors(corsOptions)

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(req, res, fn) {
	return new Promise((resolve, reject) => {
		fn(req, res, (result) => {
			if (result instanceof Error) {
				return reject(result)
			}

			return resolve(result)
		})
	})
}

export default async (req, res) => {
	// Run the middleware
	await runMiddleware(req, res, cors)

	let params = req.query
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
	// let data = null
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
