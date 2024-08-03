import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useUpdateUserMutation, useDeleteUserMutation } from "./usersApiSlice"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSave, faTrashCan } from "@fortawesome/free-solid-svg-icons"
import { ROLES } from "../../config/roles"

const USER_REGEX = /^[A-z]{3,20}$/
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/

const EditUserForm = ({ user }) => {
    const [updateUser, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useUpdateUserMutation()

    const [deleteUser, {
        isSuccess: isDelSuccess,
        isError: isDelError,
        error: delError
    }] = useDeleteUserMutation()

    const navigate = useNavigate()

    const [username, setUsername] = useState(user.username);
    const [validUsername, setValidUsername] = useState(false);
    const [password, setPassword] = useState('');
    const [validPassword, setValidPassword] = useState(false);
    const [roles, setRoles] = useState(user.roles)
    const [active, setActive] = useState(user.active)

    useEffect(() => {
        setValidUsername(USER_REGEX.test(username))
    }, [username])

    useEffect(() => {
        setValidPassword(PWD_REGEX.test(password))
    }, [password])

    useEffect(() => {
        if(isSuccess || isDelSuccess){
            setUsername('')
            setPassword('')
            setRoles([])
            navigate('/dash/users')
        }
    }, [isSuccess, isDelSuccess, navigate])

    const onRolesChange = (e) => {
        const values = Array.from(
            e.target.selectedOptions,
            (options) => options.value
        )

        setRoles(values)
    }

    const onSaveUserClicked = async () => {
        if(password){
            await updateUser({ id: user.id, username, password, roles, active })
        }
        else{
            await updateUser({ id: user.id, username, roles, active })
        }
    }
    const onDeleteUserClicked = async () => {
        await deleteUser({ id: user.id })
    }

    const options = Object.values(ROLES).map(role => (
        <option 
            key={role} 
            value={role}
        >
            {role}
        </option>
    ))

    let canSave
    if(password)
        canSave = [roles.length, validUsername, validPassword].every(Boolean) && !isLoading
    else
        canSave = [roles.length, validUsername].every(Boolean) && !isLoading

    const errorClass = (isError || isDelError) ? 'errMsg' : 'offscreen'
    const validUserClass = !username || validUsername ? '' : 'invalidInput'
    const validPwdClass = !password || validPassword ? '' : 'invalidInput'
    const validRolesClass = Boolean(roles.length) ? '' : 'invalidInput'

    const errorContent = (error?.data?.message || delError?.data?.message) ?? ''

    const content = (
        <>
            <p className={errorClass}>{errorContent}</p>

            <form onSubmit={(e) => e.preventDefault()}>
                <div className="header">
                    <h2>Edit User</h2>
                    <div>
                        <button
                            title="Save"
                            onClick={onSaveUserClicked}
                            disabled={!canSave}
                        >
                            <FontAwesomeIcon icon={faSave} />
                        </button>
                        <button
                            title="Delete"
                            onClick={onDeleteUserClicked}
                        >
                            <FontAwesomeIcon icon={faTrashCan} />
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

                <label htmlFor="password">Password: <span className="nowrap">[empty = no change] [4-12 chars incl. !@#$%]</span></label>
                <input 
                    className={validPwdClass}
                    id="password"
                    name="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <label htmlFor="active" className="activeLabel">Active: </label>
                <input 
                    className="activeInput"
                    id="active"
                    name="active"
                    type="checkbox"
                    checked={active}
                    onChange={(e) => setActive(prev => !prev)}
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
    
    return content
}

export default EditUserForm