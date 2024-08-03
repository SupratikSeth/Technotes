import { useState, useEffect, useRef } from "react"
import { useNavigate, Link } from "react-router-dom"

import { useLoginMutation } from "./authApiSlice"
import { setCredentials } from "./authSlice"
import { useDispatch } from "react-redux"

import usePersist from "../../hooks/usePersist"

const Login = () => {
    const userRef = useRef();
    const errRef = useRef();

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [errMsg, setErrMsg] = useState('')
    const [persist, setPersist] = usePersist()

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [login, { isLoading }] = useLoginMutation()

    useEffect(() => {
        userRef.current.focus()
    }, [])

    useEffect(() => {
        setErrMsg('')
    }, [username, password])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const { accessToken } = await login({ username, password }).unwrap() //since we are not using any RTK Query state like isError so we need to perform handling manually using unwrap()
            dispatch(setCredentials({ accessToken }))
            setUsername('')
            setPassword('')
            navigate('/dash')
        } catch (err) {
            if(!err.status){
                setErrMsg('No Server Response')
            }
            else if(err.status === 400){
                setErrMsg('Missing username or password')
            }
            else if(err.status === 401){
                setErrMsg('Unauthorized')
            }
            else{
                setErrMsg(err.data?.message)
            }
            errRef?.current?.focus()
        }
    }

    const errorClass = errMsg ? 'errMsg' : 'offscreen'

    if (isLoading) {
        return <p>Loading...</p>
    }

    const content = (
        <section className="login">
            <header>
                <h1>Employee Login</h1>
            </header>

            <main>
                <p ref={errRef} className={errorClass}>{errMsg}</p>

                <form onSubmit={handleSubmit}>
                    <label htmlFor="username">Username: </label>
                    <input
                        id="username"
                        type="text"
                        autoComplete="off"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        ref={userRef}
                    />

                    <label htmlFor="password">Password: </label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <button className="login-btn">Sign In</button>

                    <label htmlFor="persist" className="trustLabel">
                        <input 
                            className="trustInput"
                            type="checkbox"
                            id="persist"
                            checked={persist}
                            onChange={() => setPersist(prev => !prev)}
                        />
                        <span>Trust This Device</span>
                    </label>
                </form>
            </main>

            <footer>
                <Link to="/">Back to Home</Link>
            </footer>
        </section>
    )

    return content
}

export default Login