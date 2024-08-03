import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileCirclePlus, faFilePen, faUserGear, faUserPlus, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";

import { useSendLogoutMutation } from "../features/auth/authApiSlice";
import useAuth from "../hooks/useAuth";

const DASH_REGEX = /^\/dash(\/)?$/
const NOTES_REGEX = /^\/dash\/notes(\/)?$/
const USERS_REGEX = /^\/dash\/users(\/)?$/

const DashHeader = () => {
    const navigate = useNavigate()
    const { pathname } = useLocation()
    const { isManager, isAdmin } = useAuth()

    const [sendLogout, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useSendLogoutMutation()

    /* useEffect(() => {
        if(isSuccess){
            navigate('/')
        }
    }, [isSuccess, navigate]) */

    const onLogoutClicked = () => {
        sendLogout()
        navigate('/')
    }

    let dashClass = null
    if (!DASH_REGEX.test(pathname) && !NOTES_REGEX.test(pathname) && !USERS_REGEX.test(pathname)) {
        dashClass = 'dashClass'
    }

    let newNoteButton = null
    if (NOTES_REGEX.test(pathname)) {
        newNoteButton = (
            <button
                className="header-btn"
                title="New Note"
                onClick={() => navigate('/dash/notes/new')}
            >
                <FontAwesomeIcon icon={faFileCirclePlus} />
            </button>
        )
    }

    let newUserButton = null
    if (USERS_REGEX.test(pathname)) {
        newUserButton = (
            <button
                className="header-btn"
                title="New User"
                onClick={() => navigate('/dash/users/new')}
            >
                <FontAwesomeIcon icon={faUserPlus} />
            </button>
        )
    }

    let usersButton = null
    if (isManager || isAdmin) {
        if (!USERS_REGEX.test(pathname) && pathname.includes('/dash')) {
            usersButton = (
                <button
                    className="header-btn"
                    title="Users"
                    onClick={() => navigate('/dash/users')}
                >
                    <FontAwesomeIcon icon={faUserGear} />
                </button>
            )
        }
    }

    let notesButton = null
    if (!NOTES_REGEX.test(pathname) && pathname.includes('/dash')) {
        notesButton = (
            <button
                className="header-btn"
                title="Notes"
                onClick={() => navigate('/dash/notes')}
            >
                <FontAwesomeIcon icon={faFilePen} />
            </button>
        )
    }

    const logoutButton = (
        <button
            className="logout-btn"
            title="logout"
            onClick={onLogoutClicked}
        >
            <FontAwesomeIcon icon={faRightFromBracket} />
        </button>
    )

    const errorClass = isError ? 'errMsg' : 'offscreen'

    let buttonContent
    if(isLoading){
        buttonContent = <p>Logging Out...</p>
    }
    else {
        buttonContent = (
            <>
                {newNoteButton}
                {newUserButton}
                {notesButton}
                {usersButton}
                {logoutButton}
            </>
        )
    }

    const content = (
        <>
            <p className={errorClass}>{error?.data?.message}</p>

            <header className={`dashHeader ${dashClass}`}>
                <h1>
                    <Link to="/dash">TechNotes</Link>
                </h1>

                <nav>

                    {buttonContent}
                </nav>
            </header>
        </>
    )

    return content
}

export default DashHeader