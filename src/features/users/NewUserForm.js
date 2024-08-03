import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAddNewUserMutation } from "./usersApiSlice"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSave } from "@fortawesome/free-solid-svg-icons"
import { ROLES } from "../../config/roles"
import useTitle from "../../hooks/useTitle"

const USER_REGEX = /^[A-z]{3,20}$/
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/

const NewUserForm = () => {
    useTitle('New User')
    const [addNewUser, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useAddNewUserMutation()

    const navigate = useNavigate()

    const [username, setUsername] = useState('');
    const [validUsername, setValidUsername] = useState(false);
    const [password, setPassword] = useState('');
    const [validPassword, setValidPassword] = useState(false);
    const [roles, setRoles] = useState(["Employee"])

    useEffect(() => {
        setValidUsername(USER_REGEX.test(username))
    }, [username])

    useEffect(() => {
        setValidPassword(PWD_REGEX.test(password))
    }, [password])

    useEffect(() => {
        if(isSuccess){
            setUsername('')
            setPassword('')
            setRoles([])
            navigate('/dash/users')
        }
    }, [isSuccess, navigate])

    const onRolesChange = (e) => {
        const values = Array.from(
            e.target.selectedOptions,
            (option) => option.value
        )

        setRoles(values)
    }

    const canSave = [roles.length, validUsername, validPassword].every(Boolean) && !isLoading

    const onSaveUserClicked = async (e) => {
        e.preventDefault()

        if(canSave){
            await addNewUser({ username, password, roles })
        }
    }

    const options = Object.values(ROLES).map(role => (
        <option 
            key={role} 
            value={role}
        >
            {role}
        </option>
    ))

    const errorClass = isError ? 'errMsg' : 'offscreen'
    const validUserClass = !username || validUsername ? '' : 'invalidInput'
    const validPwdClass = !password || validPassword ? '' : 'invalidInput'
    const validRolesClass = Boolean(roles.length) ? '' : 'invalidInput'

    const content = (
        <>
            <p className={errorClass}>{error?.data?.message}</p>

            <form onSubmit={onSaveUserClicked}>
                <div className="header">
                    <h2>New User</h2>
                    <div>
                        <button
                            title="Save"
                            disabled={!canSave}
                        >
                            <FontAwesomeIcon icon={faSave} />
                        </button>
                    </div>
                </div>

                <label htmlFor="username">Username: <span className="nowrap">[3-20 letters]</span></label>
                <input 
                    className={validUserClass}
                    id="username"
                    name="username"
                    type="text"
                    autoComplete="off"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />

                <label htmlFor="password">Password: <span className="nowrap">[4-12 chars incl. !@#$%]</span></label>
                <input 
                    className={validPwdClass}
                    id="password"
                    name="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <label htmlFor="roles">Assigned Roles:</label>
                <select
                    className={validRolesClass}
                    id="roles"
                    name="roles"
                    multiple={true}
                    size="3"
                    value={roles}
                    onChange={onRolesChange}
                >
                    {options}
                </select>
            </form>
        </>
    )
    
    return (
        <div className="newUserForm">
            {content}
        </div>
    )
}

export default NewUserForm