import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAddNewNoteMutation } from "./notesApiSlice"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSave } from "@fortawesome/free-solid-svg-icons"

const NewNoteForm = ({ users }) => {
    const navigate = useNavigate()

    const [addNewNote, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useAddNewNoteMutation()

    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [userId, setUserId] = useState(users[0].id);

    useEffect(() => {
        if(isSuccess){
            setTitle('')
            setText('')
            setUserId('')
            navigate('/dash/notes')
        }
    }, [isSuccess, navigate])

    const canSave = [title, text, userId].every(Boolean) && !isLoading

    const onSaveNoteClicked = async (e) => {
        e.preventDefault()

        if(canSave){
            await addNewNote({ user: userId, title, text })
        }
    }

    const options = users.map(user => (
        <option
            key={user.id}
            value={user.id}
        >
            {user.username}
        </option>
    ))

    const errorClass = isError ? 'errMsg' : 'offscreen'

    const content = (
        <>
            <p className={errorClass}>{error?.data?.message}</p>

            <form onSubmit={onSaveNoteClicked}>
                <div className="header">
                    <h2>New Note</h2>
                    <div>
                        <button
                            title="Save"
                            disabled={!canSave}
                        >
                            <FontAwesomeIcon icon={faSave} />
                        </button>
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

                <label htmlFor="user">Assigned To: </label>
                <select
                    id="user"
                    name="user"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                >
                    {options}
                </select>
            </form>
        </>
    )

    return content
}

export default NewNoteForm