import NewNoteForm from "./NewNoteForm"
import { useGetUsersQuery } from "../users/usersApiSlice"
import { PulseLoader } from "react-spinners"
import useTitle from "../../hooks/useTitle"

const NewNote = () => {
    useTitle('New Note')
    const { users } = useGetUsersQuery("usersList", {
        selectFromResult: ({ data }) => ({
            users: data?.ids.map(id => data?.entities[id])
        }),
    })

    let content

    if (!users?.length)
        content =  <PulseLoader color={"#FFF"} />
    else
        content = <NewNoteForm users={users} />

    return (
        <div className="newNote">
            {content}
        </div>
    )
}

export default NewNote