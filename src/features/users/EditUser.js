import { useParams } from "react-router-dom"
import EditUserForm from "./EditUserForm"

import { useGetUsersQuery } from "./usersApiSlice"
import { PulseLoader } from "react-spinners"
import useTitle from "../../hooks/useTitle"

const EditUser = () => {
    useTitle('Edit User')
    const  { id } = useParams();

    const { user } = useGetUsersQuery("usersList", {
        selectFromResult: ({ data }) => ({
            user: data?.entities[id]
        }),
    })

    let content
    if(!user){
        content =  <PulseLoader color={"#FFF"} />
    }
    else{
        content = <EditUserForm user={user} />
    }

    return (
        <div className="editUser">
            {content}
        </div>
    )
}

export default EditUser