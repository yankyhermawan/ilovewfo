import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { useEffect, useState } from 'react'
import Main from './main/main'
import CreateMap from './createMap/CreateMap'
import Material from './material/material'
import Login from './login/login'
import Register from './register/Register'
import { checkToken } from './login/actions'

import includes from 'lodash/includes'

const App = () => {
	const [token, setToken] = useState<string | null>(localStorage.getItem('token'))
	const [isTokenValid, setIsTokenValid] = useState(false)
	const [isTokenChecked, setIsTokenChecked] = useState(false)
	const pathname = window.location.pathname
	const pathWithoutToken = ['/login', '/register']

	if (token && includes(pathWithoutToken, pathname) && isTokenValid && isTokenChecked) {
		window.location.href = '/'
	}

	if (!token && !includes(pathWithoutToken, pathname) && !isTokenValid && !isTokenChecked) {
		window.location.href = '/login'
	}

	useEffect(() => {
		const checkTokenValid = async () => {
			const res = await checkToken()
			if (res.status === 200) {
				setIsTokenValid(true)
			} else {
				setIsTokenValid(false)
			}
			setIsTokenChecked(true)
		}
		if (!isTokenChecked) {
			checkTokenValid()
		}
	}, [])

	useEffect(() => {
		if (isTokenChecked && !isTokenValid && !includes(pathWithoutToken, pathname)) {
			window.location.href = '/login'
		}
	}, [isTokenValid, isTokenChecked])

	useEffect(() => {
		setToken(token)
	}, [localStorage.getItem('token')])
	return (
		<>
			<Router>
				<Routes>
					<Route path='/' Component={Main}/>
					<Route path='/login' Component={Login}/>
					<Route path='/register' Component={Register} />
					<Route path='/create-map' Component={CreateMap} />
					<Route path='/material' Component={Material} />
				</Routes>
			</Router>
			<ToastContainer />
		</>
	)
}

export default App