import { Input, Button, Title } from '../components/input'
import { useEffect, useState } from 'react'
import { regexCharNumber, regexSpace, regexSymbol } from '../utility/common'
import { login } from './actions'
import notification from '../components/notification'

const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [buttonClicked, setButtonClicked] = useState(false)
    const [togglePassword, setTogglePassword] = useState(false)
    
    const handleChangeUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        if (regexCharNumber.test(value)) {
            setUsername(value)
        }
        if (value === '') {
            setUsername('')
        }
    }

    const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        if (
            (regexCharNumber.test(value) || regexSymbol.test(value))
        ) {
            setPassword(value)
        }
        if (value === '') {
            setPassword('')
        }
    }

    const handleToggleShowPassword = () => {
        setTogglePassword(!togglePassword)
    }

    useEffect(() => {
        if (buttonClicked) {
            const loginAction = async () => {
                const res = await login({ username, password })
                notification({ code: res.status, msg: res.data.error })
                if (res.data.token) {
                    localStorage.setItem('token', res.data.token)
                    window.location.href = '/'
                }
            }
            loginAction()
            setButtonClicked(false)
        }
    }, [buttonClicked])

    return (
        <>
            <div className='w-screen h-screen flex justify-center items-center bg-gradient-to-br from-indigo-500 from-0% via-sky-500 via-40% to-emerald-500 to-90%'>
                <div className='flex flex-col gap-2 rounded-xl bg-white/20 shadow-lg shadow-black'>
                    <Title title='login' />
                    <div className='flex flex-col gap-8 mx-8 pb-8'>
                        <Input label='Username' onChange={handleChangeUsername} value={username} />
                        <div className='flex flex-col gap-2'>
                            <Input label='Password' onChange={handleChangePassword} type={togglePassword ? 'text' : 'password'} value={password} />
                            <div onClick={handleToggleShowPassword}>Show Password</div>
                            <div className='flex flex-row justify-between'>
                                <a href='' className='text-xs underline'>Register</a>
                                <a href='' className='text-xs underline'>Forgot Password ?</a>
                            </div>
                        </div>
                        <Button placeholder='Submit' onClick={() => setButtonClicked(true)} disabled={!username || !password}/>
                    </div>
                </div>
            </div>
        </>
        
    )
}

export default Login