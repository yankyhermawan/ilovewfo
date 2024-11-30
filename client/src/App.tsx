import { BrowserRouter as Router, Route, Routes } from 'react-router-dom' 
import Main from './main/main'
import CreateMap from './createMap/CreateMap'
import Material from './material/material'

const App = () => {
	return (
		<Router>
			<Routes>
				<Route path='/' Component={Main}/>
				<Route path='/create-map' Component={CreateMap} />
				<Route path='/material' Component={Material} />
			</Routes>
		</Router>
	)
}

export default App