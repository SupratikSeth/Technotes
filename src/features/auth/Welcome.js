import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Welcome = () => {
    const { username, isAdmin, isManager } = useAuth()
    const date = new Date();
    const today = new Intl.DateTimeFormat("en-US", { dateStyle: 'full', timeStyle: 'long' }).format(date);
    const content = (
        <section className="welcome">
            <p>{today}</p>

            <p>Welcome {username}!</p>

            <p>
                <Link to="/dash/notes">View TechNotes</Link>
            </p>

            <p>
                <Link to="/dash/notes/new">Add New TechNote</Link>
            </p>

            {(isManager || isAdmin) && <p>
                <Link to="/dash/users">View Users Settings</Link>
            </p>}

            {(isManager || isAdmin) && <p>
                <Link to="/dash/users/new">Add New User</Link>
            </p>}
        </section>
    )

    return content
}

export default Welcome