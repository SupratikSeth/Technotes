import { useGetNotesQuery } from "./notesApiSlice"
import Note from "./Note";
import useAuth from "../../hooks/useAuth";
import { PulseLoader } from "react-spinners";
import useTitle from "../../hooks/useTitle";

const NotesList = () => {
    useTitle('Notes List')
    const { username, isManager, isAdmin } = useAuth()
    const {
        data: notes,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetNotesQuery('notesList', {
        pollingInterval: 15000, //after every 15s it will query the data and show the current users list because notes can change frequently
        refetchOnFocus: true, //after coming from another window to our browser window it will refetch the current data
        refetchOnMountOrArgChange: true //if any argument change or it is mounted or unmounted then also it will refetch the data
    });

    let content;
    if(isLoading){
        content = <PulseLoader color={"#FFF"} />
    }
    else if(isError){
        content = <p className="errMsg">{error?.data?.message}</p>
    }
    else if(isSuccess){
        const { ids, entities } = notes;

        let filterIds
        if(isManager || isAdmin){
            filterIds = [...ids]
        }
        else{
            filterIds = ids.filter(id => entities[id].username === username)
        }

        const tableContent = ids?.length && filterIds.map(noteId => <Note key={noteId} noteId={noteId} />)

        content = (
            <table className="notesTable">
                <thead>
                    <tr>
                        <th>Username</th>
                        <th className="noteCreated">Created</th>
                        <th className="noteUpdated">Updated</th>
                        <th>Title</th>
                        <th className="noteUsername">Owner</th>
                        <th>Edit</th>
                    </tr>
                </thead>

                <tbody>
                    {tableContent}
                </tbody>
            </table>
        )
    }

    return (
        <div className="notesList">
            {content}
        </div>
    )
}

export default NotesList