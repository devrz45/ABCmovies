import fetch from "isomorphic-unfetch"
import { useRouter } from "next/router"
import { useState, useContext, useEffect } from "react"
import { DataContext } from "../utils/dataContext"
import { SearchContext } from "../utils/searchContext"

const SearchBox = (() => {
	let lastSearchTerm = ""
	let lastSearchType = ""
	return () => {
		let [searchTerm, setSearchTerm] = useState("")
		let [searchError, setSearchError] = useState("")
		let [searchType, setType] = useState("")
		let { setData } = useContext(DataContext)
		let { setSearch } = useContext(SearchContext)
		const router = useRouter()

		const handleSubmit = (event) => {
			event.preventDefault()
			if (
				lastSearchTerm === searchTerm &&
				lastSearchType === searchType
			) {
				return
			} else {
				lastSearchTerm = searchTerm
				lastSearchType = searchType
			}
			if (!searchTerm)
				return setSearchError("Please provide a search term.")
			let url = `/api/search?s=${searchTerm}`
			if (searchType) url = url + "&type=" + searchType
			url = url + "&page=1"
			setData(false)
			fetch(url)
				.then((res) => res.json())
				.then((data) => {
					if (data.Response === "True") {
						setSearch(url)
						setData(data)
					} else if (data.Response === "False") {
						setData(null)
						setSearchError(data.Error)
					}
				})
		}

		const handleToggle = (event) => {
			setType(event.target.value === searchType ? "" : event.target.value)
		}

		useEffect(() => {
			if (router.query.s) {
				let { s, page } = router.query
				let url = `/api/search?s=${s}`
				url += router.query.type ? `&type=${router.query.type}` : ""
				url += `&page=${page}`
				setData(false)
				fetch(url)
					.then((res) => res.json())
					.then((data) => {
						setSearchTerm(s)
						setType(router.query.type || "")
						if (data.Response === "True") {
							setSearch(url)
							setData(data)
						} else if (
							data.Response === "False" &&
							data.Error === "Too many results."
						) {
							setData(null)
							setSearchError(
								"Please provide a more specific search term."
							)
						}
					})
			}
			// if (data) {
			// 	setData(data)
			// 	setSearch(backUrl)
			// 	setSearchTerm(queryData.s)
			// 	setType(queryData.type || "")
			// }
		}, [router])

		return (
			<div className="container">
				<div className="card-body">
					<h2 className="text-center mb-4">Search for movies</h2>
					<form id="searchForm" onSubmit={handleSubmit}>
						<div className="row">
							<div className="col-10">
								<input
									type="text"
									className={
										"form-control form-control-lg" +
										(searchError ? " is-invalid" : "")
									}
									id="searchText"
									placeholder="Movie Name"
									value={searchTerm}
									onChange={(event) => {
										setSearchTerm(event.target.value)
										setSearchError("")
									}}
								/>
								<div className="invalid-feedback">
									{searchError}
								</div>
							</div>
							<div className="col-2">
								<input
									type="submit"
									className="btn btn-primary btn-lg"
									value="Search"
								/>
							</div>
						</div>
						<div className="row">
							<div className="col-10">
								<div
									className="btn-group btn-group-toggle"
									data-toggle="buttons">
									<label
										className={
											"btn btn-secondary mt-2" +
											(searchType === "movie"
												? " active"
												: "")
										}>
										<input
											type="checkbox"
											value="movie"
											onChange={handleToggle}
										/>
										Movie
									</label>
									<label
										className={
											"btn btn-secondary ml-2 mt-2" +
											(searchType === "series"
												? " active"
												: "")
										}>
										<input
											type="checkbox"
											value="series"
											onChange={handleToggle}
										/>
										Series
									</label>
									<label
										className={
											"btn btn-secondary ml-2 mt-2" +
											(searchType === "episode"
												? " active"
												: "")
										}>
										<input
											type="checkbox"
											value="episode"
											onChange={handleToggle}
										/>
										Episode
									</label>
								</div>
							</div>
						</div>
					</form>
				</div>
			</div>
		)
	}
})()

export default SearchBox
