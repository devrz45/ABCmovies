import Layout from "../components/MyLayout"
import { withDataContext } from "../utils/dataContext"
import { withSearchContext } from "../utils/searchContext"
import SearchBox from "../components/SearchBox"
import MovieList from "../components/MovieList"

const Landing = (props) => {
	return (
		<Layout>
			<SearchBox {...props} />
			<MovieList />
		</Layout>
	)
}

// Landing.getInitialProps = async function (context) {
// 	const { s, page } = context.query
// 	console.log(context.query)
// 	if (s) {
// 		let backUrl = `/api/search?s=${s}`
// 		backUrl += context.query.type ? `&type=${context.query.type}` : ""
// 		backUrl += `&page=${page}`

// 		const res = await fetch(backUrl)
// 		const data = await res.json()

// 		console.log(`Fetched List: ${data.Search}`)

// 		return { data, queryData: context.query, backUrl }
// 	} else return { data: null, queryData: null, backUrl: null }
// }

export default withSearchContext(withDataContext(Landing))
