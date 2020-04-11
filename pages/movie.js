import Layout from "../components/MyLayout"
import fetch from "isomorphic-unfetch"
import { server } from "../config"

const Movie = ({ movie }) => (
	<Layout>
		<h1>{movie.Title}</h1>
		<p>{movie.Plot}</p>
		{movie.Poster ? <img src={movie.Poster} /> : null}
	</Layout>
)

Movie.getInitialProps = async function (context) {
	const { id } = context.query
	const res = await fetch(`${server}/api/search?i=${id}`)
	const movie = await res.json()

	console.log(`Fetched movie: ${movie.Title}`)

	return { movie }
}

export default Movie
