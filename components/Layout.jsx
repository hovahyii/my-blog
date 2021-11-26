import Header from "./Header"
import React from "react"
import Footer from "./Footer"

const Layout = ({children}) => {
	return (
		<>
			<Header />
			{children}
            <Footer />
		</>
	)
}

export default Layout
