import Layout from "../components/MyLayout"
import fetch from "isomorphic-unfetch"
import { server } from "../config"

const Movie = ({ movie, backUrl }) => (
	<Layout>
		<div className="container">
			<div className="row mt-4">
				<div className="col-md-10">
					<h4 className="mb-0">
						{movie.Title}
						<small className="text-muted ml-3">
							({movie.Year})
						</small>
					</h4>
				</div>
				<div className="col-xs-12 col-md-2">
					<p className="mb-0 h-auto">
						{movie.imdbRating}
						<small className="text-muted">/10</small>
					</p>
					<p className="font-weight-lighter text-muted mb-0 h-auto">
						<small className="m-0">{movie.imdbVotes}</small>
					</p>
				</div>
			</div>
			<div className="row">
				<div className="col-xs-12">
					{/* prettier-ignore */}
					<p className="font-weight-lighter text-muted">
						<small className="mx-3">{movie.Rated}</small>|<small className="mx-3">{movie.Runtime}</small>|<small className="mx-3">{movie.Genre}</small>|<small className="mx-3">{movie.Released}</small>
					</p>
				</div>
			</div>
			<div className="row">
				<div className="col-md-4">
					<img src={movie.Poster} alt="..." />
				</div>
				<div className="col-xs-12 col-md-8 font-weight-light">
					<div className="row">
						<div className="col-xs-12">
							<p>{movie.Plot}</p>
						</div>
					</div>
					<div className="row">
						<div className="col-xs-12">
							<p>
								<span className="font-weight-bold mr-3">
									Directors:
								</span>
								{movie.Director}
							</p>
						</div>
					</div>
					<div className="row">
						<div className="col-xs-12">
							<p>
								<span className="font-weight-bold mr-3">
									Writers:
								</span>
								{movie.Writer}
							</p>
						</div>
					</div>
					<div className="row">
						<div className="col-xs-12">
							<p>
								<span className="font-weight-bold mr-3">
									Actors:
								</span>
								{movie.Actors}
							</p>
						</div>
					</div>
				</div>
			</div>
			<div className="row justify-content-end">
				<div className="col-xs-12">
					<a
						href={backUrl}
						className="btn btn-primary"
						role="button"
						aria-pressed="true">
						Back
					</a>
				</div>
			</div>
		</div>
	</Layout>
)

Movie.getInitialProps = async function (context) {
	const { id, s, page } = context.query
	let backUrl = `/?s=${s}`
	backUrl += context.query.type ? `&type=${context.query.type}` : ""
	backUrl += `&page=${page}`

	const res = await fetch(`${server}/api/search?i=${id}`)
	const movie = await res.json()

	// console.log(`Fetched movie: ${movie.Title}`)

	return { movie, backUrl }
}

export default Movie
