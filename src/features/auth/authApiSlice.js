import { apiSlice } from "../../app/api/apiSlice";
import { logOut, setCredentials } from "./authSlice";

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation({
            query: credentials => ({
                url: '/auth',
                method: 'POST',
                body: { ...credentials }
            })
        }),
        sendLogout: builder.mutation({
            query: () => ({
                url: '/auth/logout',
                method: 'POST'
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }){ //onQueryStarted prevents us from using useDispatch() in every component and dispatch this in every component
                try {
                    const result = await queryFulfilled //to execute logout method in backend
                    console.log(result);
                    dispatch(logOut()) //to clear the token in authSlice.js
                    //if we dont use setTimeout then component was not unsubscribing hence logout button was not working so we are waiting for 1s hence we will get enough time to unsubscribe
                    setTimeout(() => {
                        dispatch(apiSlice.util.resetApiState()) //to clear out the cache and all query subscription
                    }, 1000)

                } catch (err) {
                    console.log(err);
                }
            }
        }),
        refresh: builder.mutation({
            query: () => ({
                url: '/auth/refresh',
                method: 'GET'
            }),
            async onQueryStarted(args, { dispatch, queryFulfilled }){
                try {
                    const { data } = await queryFulfilled
                    console.log(data);
                    const {accessToken } = data
                    dispatch(setCredentials({ accessToken }))
                } catch (err) {
                    console.log(err);
                }
            }
        })
    })
})

export const {
    useLoginMutation,
    useSendLogoutMutation,
    useRefreshMutation
} = authApiSlice