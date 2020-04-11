import Link from "next/link"
import Layout from "../components/MyLayout"
import fetch from "isomorphic-unfetch"
import { server } from "../config"

const MovieLink = ({ movie }) => (
	<li>
		<Link href={`/movie?id=${movie.imdbID}`}>
			<a title={movie.Title}>{movie.Title}</a>
		</Link>
	</li>
)

function Movies(props) {
	return (
		<Layout>
			<h1>My Movies</h1>
			<ul>
				{props.shows.map((show) => (
					<MovieLink movie={show} key={show.imdbID} />
				))}
			</ul>
		</Layout>
	)
}

Movies.getInitialProps = async function () {
	const res = await fetch(`${server}/api/search?s=abc&page=1`)
	const data = await res.json()

	console.log(`Show data fetched. Count: ${data.Search.length}`)

	return {
		shows: data.Search || [],
	}
}

export default Movies
