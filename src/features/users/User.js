import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { memo } from "react";

import { useGetUsersQuery } from "./usersApiSlice";

const User = ({ userId }) => {
    //Here unlike useSelector() it will not make a seperate network request for notes and will get the notes from the already fetched notes hence is more optimized
    const { user } = useGetUsersQuery("usersList", {
        selectFromResult: ({ data }) => ({
            user: data?.entities[userId]
        }),
    })

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

const memoizedUser = memo(User)
export default memoizedUser //this component will only rerender if there is change to the data