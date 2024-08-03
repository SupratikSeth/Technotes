import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";
import { selectUserById } from "./usersApiSlice";

const User = ({ userId }) => {
    const user = useSelector(state => selectUserById(state, userId));
    const navigate = useNavigate();

    if(user){
        const handleEdit = () => navigate(`/dash/users/${userId}`)

        const userRolesString = user.roles.toString().replaceAll(',', ', ');

        const cellStatus = user.active ? '' : 'inactive';

        return (
            <tr>
                <td className={cellStatus}>{user.username}</td>
                <td className={cellStatus}>{userRolesString}</td>
                <td className={cellStatus}>
                    <button
                        onClick={handleEdit}
                    >
                        <FontAwesomeIcon icon={faPenToSquare} />
                    </button>
                </td>
            </tr>
        )
    }
    else
        return null;
}

export default User