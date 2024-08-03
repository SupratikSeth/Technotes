import { Outlet } from "react-router-dom";
import DashHeader from "./DashHeader";
import DashFooter from "./DashFooter";
import useTitle from "../hooks/useTitle";

const DashLayout = () => {
    useTitle('Dashboard')
    return (
        <>
            <DashHeader />
            <Outlet />
            <DashFooter />
        </>
    )
}

export default DashLayout