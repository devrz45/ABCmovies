import React, { useState } from "react"

const SearchContext = React.createContext()

function SearchProvider({ children }) {
	const [search, setSearch] = useState("")
	return (
		<SearchContext.Provider value={{ search, setSearch }}>
			{children}
		</SearchContext.Provider>
	)
}
/**
 * A context HOC that implements the functionality to store and access the search
 * term.
 * @param NestedComponent A component which needs to be injected with our context
 */
function withSearchContext(NestedComponent) {
	return (props) => (
		<SearchProvider>
			<NestedComponent {...props} />
		</SearchProvider>
	)
}

export { withSearchContext, SearchContext }
