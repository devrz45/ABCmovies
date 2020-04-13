import Link from "next/link"
import Pagination from "react-js-pagination"
import { useState, useContext, useEffect } from "react"
import { SearchContext } from "../utils/searchContext"
import { DataContext } from "../utils/dataContext"
import fetch from "isomorphic-unfetch"

const MovieList = () => {
	let [page, setPage] = useState(1)
	let { search } = useContext(SearchContext)
	let { data, setData } = useContext(DataContext)

	const handlePageChange = (pageNo) => {
		setPage(pageNo)
		const url = search.slice(0, -1) + pageNo
		setData(false)
		fetch(url)
			.then((res) => res.json())
			.then((data) => {
				if (data.Response == "True") {
					setData(data)
				}
			})
	}

	useEffect(() => {
		setPage(parseInt(search.slice(-1)))
	}, [search])

	const appendSearchParams = (url) => {
		if (search) {
			let searchParams = search.split("?")[1]
			searchParams = searchParams.slice(0, -1) + page
			url = url + "&" + searchParams
		}
		return url
	}

	if (data == null) return ""
	else if (data)
		return (
			<div className="container">
				<div>
					<Pagination
						activePage={page}
						totalItemsCount={parseInt(data.totalResults)}
						onChange={handlePageChange}
						itemClass="page-item"
						linkClass="page-link"
						innerClass="pagination justify-content-end"
					/>
				</div>
				<div className="row row-cols-1 row-cols-md-3">
					{data.Search.map((movie) => (
						<div className="col mb-4" key={movie.imdbID}>
							<Link
								href={appendSearchParams(
									`/movie?id=${movie.imdbID}`
								)}>
								<div
									className="card shadow-lg p-3 mb-5 bg-black rounded"
									style={{ cursor: "pointer" }}>
									<img
										src={movie.Poster}
										className="card-img-top"
										alt="..."
									/>
									<div className="card-body">
										<h5 className="card-title">
											{movie.Title}
										</h5>
										<p className="card-text">
											<small className="text-muted">
												{movie.Year}
											</small>
										</p>
									</div>
								</div>
							</Link>
						</div>
					))}
				</div>
			</div>
		)
	else
		return (
			<div className="container">
				<div className="text-center">
					<div className="spinner-border" role="status">
						<span className="sr-only">Loading...</span>
					</div>
				</div>
			</div>
		)
}
export default MovieList
