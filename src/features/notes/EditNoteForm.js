import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useUpdateNoteMutation, useDeleteNoteMutation } from "./notesApiSlice"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSave, faTrashCan } from "@fortawesome/free-solid-svg-icons"
import useAuth from "../../hooks/useAuth"

const EditNoteForm = ({ note, users }) => {
    const { isManager, isAdmin } = useAuth()
    const navigate = useNavigate()

    const [updateNote, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useUpdateNoteMutation()

    const [deleteNote, {
        isSuccess: isDelSuccess,
        isError: isDelError,
        error: delError
    }] = useDeleteNoteMutation()

    const [title, setTitle] = useState(note.title);
    const [text, setText] = useState(note.text);
    const [userId, setUserId] = useState(note.user);
    const [completed, setCompleted] = useState(note.completed)

    useEffect(() => {
        if (isSuccess || isDelSuccess) {
            setTitle('')
            setText('')
            setUserId('');
            navigate('/dash/notes')
        }
    }, [isSuccess, isDelSuccess, navigate])

    const canSave = [title, text, userId].every(Boolean) && !isLoading

    const onSaveNoteClicked = async (e) => {
        if (canSave) {
            await updateNote({ id: note.id, user: userId, title, text, completed })
        }
    }

    const onDeleteNoteClicked = async (e) => {
        await deleteNote({ id: note.id })
    }

    const created = new Date(note.createdAt).toLocaleString('en-US', { day: "numeric", month: "long", year: "numeric", hour: "numeric", minute: "numeric", second: "numeric" })
    const updated = new Date(note.updatedAt).toLocaleString('en-US', { day: "numeric", month: "long", year: "numeric", hour: "numeric", minute: "numeric", second: "numeric" })

    const options = users.map(user => (
        <option
            key={user.id}
            value={user.id}
        >
            {user.username}
        </option>
    ))

    const errorClass = (isError || isDelError) ? 'errMsg' : 'offscreen'

    const errorContent = (error?.data?.message || delError?.data?.message) ?? ''

    let deleteButton = null
    if (isManager || isAdmin) {
        deleteButton = (
            <button
                title="Delete"
                onClick={onDeleteNoteClicked}
            >
                <FontAwesomeIcon icon={faTrashCan} />
            </button>
        )
    }

    let content = (
        <>
            <p className={errorClass}>{errorContent}</p>

            <form onSubmit={(e) => e.preventDefault()}>
                <div className="header">
                    <h2>Edit Note #{note.ticket}</h2>
                    <div>
                        <button
                            title="Save"
                            disabled={!canSave}
                            onClick={onSaveNoteClicked}
                        >
                            <FontAwesomeIcon icon={faSave} />
                        </button>
                        {deleteButton}
                    </div>
                </div>

                <label htmlFor="title">Title: </label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    autoComplete="off"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <label htmlFor="text">Text: </label>
                <textarea
                    id="text"
                    name="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />

                <label htmlFor="complete" className="completeLabel">Work Complete:  </label>
                <input
                    className="completeInput"
                    type="checkbox"
                    id="complete"
                    name="complete"
                    checked={completed}
                    onChange={(e) => setCompleted(prev => !prev)}
                />

                <label htmlFor="user">Assigned To: </label>
                <select
                    id="user"
                    name="user"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                >
                    {options}
                </select>

                <div>
                    <p>Created: <br />{created}</p>
                    <p>Updated: <br />{updated}</p>
                </div>
            </form>
        </>
    )

    return content
}

export default EditNoteForm