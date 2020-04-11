const dev = process.env.NODE_ENV !== "production"

export const server = dev
	? "http://localhost:3000"
	: "https://abcmovies.herokuapp.com"
