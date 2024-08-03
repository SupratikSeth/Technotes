import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";
import { selectNoteById } from "./notesApiSlice";

const Note = ({ noteId }) => {
    const note = useSelector(state => selectNoteById(state, noteId));
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

export default Note