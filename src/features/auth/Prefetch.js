import { useEffect } from "react";
import { usersApiSlice } from "../users/usersApiSlice";
import { notesApiSlice } from "../notes/notesApiSlice";
import { Outlet } from "react-router-dom";
import { store } from "../../app/store";

const Prefetch = () => {
    useEffect(() => {
        //force true meaning whenever it comes to the Prefetch  component it has to fetch the data no matter it is present or not
        //in prefetch method 1st argument is the endpoint and 2nd argument is the label
        store.dispatch(usersApiSlice.util.prefetch('getUsers', 'usersList', { force: true }))
        store.dispatch(notesApiSlice.util.prefetch('getNotes', 'notesList', { force: true }))
    }, [])

    return <Outlet />
}

export default Prefetch