import { Input, Button, Title } from '../components/input'
import { useEffect, useState } from 'react'
import { regexCharNumber, regexSymbol } from '../utility/common'
import { register } from '../login/actions'

const Register = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [buttonClicked, setButtonClicked] = useState(false)
    const [togglePassword, setTogglePassword] = useState(false)
    const [toggleConfirmPassword, setToggleConfirmPassword] = useState(false)
    const [isConfirmPasswordError, setIsConfirmPasswordError] = useState(false)
    
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

    const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setName(value)
    }

    const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setEmail(value)
    }

    const handleChangeRetypePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setConfirmPassword(value)
    }

    const handleToggleShowConfirmPassword = () => {
        setToggleConfirmPassword(prev => !prev)
    }

    useEffect(() => {
        if (buttonClicked) {
            const registerAction = async () => {
                const res = await register({ username, password, email, name })
                if (res.status === 201) {
                    setTimeout(() => {
                        window.location.href = '/login'
                    }, 1000)
                }
            }
            registerAction()
            setButtonClicked(false)
        }
    }, [buttonClicked])

    useEffect(() => {
        setIsConfirmPasswordError(password !== confirmPassword)
    }, [password, confirmPassword])

    return (
        <>
            <div className='w-screen h-screen flex justify-center items-center bg-gradient-to-br from-indigo-500 from-0% via-sky-500 via-40% to-emerald-500 to-90%'>
                <div className='flex flex-col gap-2 rounded-xl bg-white/20 shadow-lg shadow-black'>
                    <Title title='register' />
                    <div className='flex flex-col gap-4 mx-8 pb-8'>
                        <Input
                            label='Name'
                            onChange={handleChangeName}
                            value={name}
                            required
                        />
                        <Input
                            label='Email'
                            onChange={handleChangeEmail}
                            value={email}
                            required
                        />
                        <Input
                            label='Username'
                            onChange={handleChangeUsername}
                            value={username}
                            required
                        />
                        <Input
                            label='Password'
                            onChange={handleChangePassword}
                            showIcon={true}
                            type={togglePassword? 'text' : 'password'}
                            handleToggleShowHide={handleToggleShowPassword}
                            required
                            showPassword={togglePassword}
                            value={password}
                        />
                        <Input
                            label='Re-Type Password'
                            onChange={handleChangeRetypePassword}
                            showIcon={true}
                            type={toggleConfirmPassword? 'text' : 'password'}
                            required
                            handleToggleShowHide={handleToggleShowConfirmPassword}
                            showPassword={toggleConfirmPassword}
                            value={confirmPassword}
                        />
                        {isConfirmPasswordError ? <span className='error'>Password didn't match</span> : <></>  }
                        <a href='/login' className='text-xs underline'>Login</a>
                        <Button placeholder='Submit' onClick={() => setButtonClicked(true)} disabled={!username || !password || !name || !email || isConfirmPasswordError}/>
                    </div>
                </div>
            </div>
        </>
        
    )
}

export default Register