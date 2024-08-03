import { useGetUsersQuery } from "./usersApiSlice"
import User from "./User";

const UsersList = () => {
    const {
        data: users,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetUsersQuery('usersList', {
        pollingInterval: 60000, //after every 60s it will query the data and show the current users list
        refetchOnFocus: true, //after coming from another window to our browser window it will refetch the current data
        refetchOnMountOrArgChange: true //if any argument change or it is mounted or unmounted then also it will refetch the data
    })

    let content;
    if(isLoading){
        content = <p>Loading...</p>
    }
    else if(isError){
        content = <p className="errMsg">{error?.data?.message}</p>
    }
    else if(isSuccess){
        const { ids } = users;

        const tableContent = ids?.length && ids.map(userId => <User key={userId} userId={userId} />)
        
        content = (
            <table>
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Roles</th>
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
        <div className="usersList">
            {content}
        </div>
    )
}

export default UsersList