import { useNavigate, useLocation } from "react-router-dom";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useAuth from "../hooks/useAuth";

const DashFooter = () => {
    const { username, status } = useAuth()
    const navigate = useNavigate();

    const { pathname } = useLocation();

    const onGoHomeClicked = () => navigate('/dash')

    let goHomeButton = null

    if(pathname !== '/dash'){
        goHomeButton = (
            <button
                title="Home"
                onClick={onGoHomeClicked}
            >
                <FontAwesomeIcon icon={faHouse} />
            </button>
        )
    }
    const content = (
        <footer className="dashFooter">
            {goHomeButton}
            <p>Current User: {username}</p>
            <p>Status: {status}</p>
        </footer>
    )

    return content
}

export default DashFooter