import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import { selectNoteById } from "./notesApiSlice"
import { selectAllUsers } from "../users/usersApiSlice"
import EditNoteForm from "./EditNoteForm"

const EditNote = () => {
    const { id } = useParams()

    const users = useSelector(selectAllUsers)
    const note = useSelector(state => selectNoteById(state, id))

    const content = users && note ? <EditNoteForm note={note} users={users} /> : <p>Loading...</p>
    
    return (
        <div className="editNote">
            {content}
        </div>
    )
}

export default EditNote