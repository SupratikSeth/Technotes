import { selectAllUsers } from "../users/usersApiSlice"
import { useSelector } from "react-redux"
import NewNoteForm from "./NewNoteForm"

const NewNote = () => {
    const users = useSelector(selectAllUsers)

    let content

    if (!users?.length)
        content = <p>Not Currently Available</p>
    else {

        /* const content = users ? <NewNoteForm users={users} /> : <p>Loading...</p> */
        content = <NewNoteForm users={users} />
    }

    return (
        <div className="newNote">
            {content}
        </div>
    )
}

export default NewNote