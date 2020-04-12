import Header from "./Header"
import Head from "next/head"

const Layout = (props) => (
	<div>
		<Head>
			<title>ABCmovies.com</title>
			<link
				rel="stylesheet"
				href="https://bootswatch.com/4/superhero/bootstrap.min.css"
			/>
		</Head>
		<Header />
		{props.children}
	</div>
)

export default Layout
