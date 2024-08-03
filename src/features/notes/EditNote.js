import { useParams } from "react-router-dom"
import EditNoteForm from "./EditNoteForm"
import { useGetNotesQuery } from "./notesApiSlice"
import { useGetUsersQuery } from "../users/usersApiSlice"
import useAuth from "../../hooks/useAuth"
import { PulseLoader } from "react-spinners"
import useTitle from "../../hooks/useTitle"

const EditNote = () => {
    useTitle('Edit Note')
    const { id } = useParams()
    const { username, isManager, isAdmin } = useAuth()

    const { users } = useGetUsersQuery("usersList", {
        selectFromResult: ({ data }) => ({
            users: data?.ids.map(id => data?.entities[id])
        }),
    })
    const { note } = useGetNotesQuery("notesList", {
        selectFromResult: ({ data }) => ({
            note: data?.entities[id]
        }),
    })

    let content
    if (!note || !users?.length) {
        content = <PulseLoader color={"#FFF"} />
    }
    else {

        if (!isManager && !isAdmin) {
            if (note.username !== username) {
                return(
                    <section className="editNote">
                        <p className="errMsg">No access</p>
                    </section>
                ) 
            }
        }
        content = <EditNoteForm note={note} users={users} />
    }

    return (
        <div className="editNote">
            {content}
        </div>
    )
}

export default EditNote