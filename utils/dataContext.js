import React, { useState } from "react"

const DataContext = React.createContext()

function DataProvider({ children }) {
	const [data, setData] = useState(null)
	return (
		<DataContext.Provider value={{ data, setData }}>
			{children}
		</DataContext.Provider>
	)
}
/**
 * A context HOC that implements the functionality to store and access the movies data.
 * @param NestedComponent A component which needs to be injected with our context
 */
function withDataContext(NestedComponent) {
	return (props) => (
		<DataProvider>
			<NestedComponent {...props} />
		</DataProvider>
	)
}

export { withDataContext, DataContext }
