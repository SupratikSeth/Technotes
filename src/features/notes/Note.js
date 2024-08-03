import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { memo } from "react";

import { useGetNotesQuery } from "./notesApiSlice";

const Note = ({ noteId }) => {
    //Here unlike useSelector() it will not make a seperate network request for notes and will get the notes from the already fetched notes hence is more optimized
    const { note } = useGetNotesQuery("notesList", {
        selectFromResult: ({ data }) => ({
            note: data?.entities[noteId]
        }),
    })

    const navigate = useNavigate();

    if(note){
        const handleEdit = () => navigate(`/dash/notes/${noteId}`);

        const created = new Date(note.createdAt).toLocaleString('en-US', { day: 'numeric', month: 'long' })

        const updated = new Date(note.updatedAt).toLocaleString('en-US', { day: 'numeric', month: 'long' })

        return (
            <tr>
                <td>
                    {
                        note.completed
                                    ? <span className="completed">Completed</span>
                                    : <span className="open">Open</span>
                    }
                </td>
                <td className="noteCreated">{created}</td>
                <td className="noteUpdated">{updated}</td>
                <td>{note.title}</td>
                <td className="noteUsername">{note.username}</td>
                <td>
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
        return null
}

const memoizedNote = memo(Note)
export default memoizedNote //this component will only rerender if there is change to the data