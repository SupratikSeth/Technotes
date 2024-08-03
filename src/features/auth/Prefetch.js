import { useEffect } from "react";
import { usersApiSlice } from "../users/usersApiSlice";
import { notesApiSlice } from "../notes/notesApiSlice";
import { Outlet } from "react-router-dom";
import { store } from "../../app/store";

const Prefetch = () => {
    useEffect(() => {
        console.log("Subscribing");
        const users = store.dispatch(usersApiSlice.endpoints.getUsers.initiate())
        const notes = store.dispatch(notesApiSlice.endpoints.getNotes.initiate())

        return () => {
            console.log("Unsubscribing");
            users.unsubscribe()
            notes.unsubscribe()
        }
    }, [])

    return <Outlet />
}

export default Prefetch