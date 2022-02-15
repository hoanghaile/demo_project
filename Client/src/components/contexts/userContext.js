import { createContext, useReducer } from 'react'
import { UserReducer } from '../reducers/userReducer';
import UserApi from '../../api/User/userApi';
export const UserContext = createContext()

const UserContextProvider = ({ children }) => {

    const [userState, dispatch] = useReducer(UserReducer, {
        user: [],
        userLoading: true
    })
    // console.log(userState.user,9999);

    const getUser = async () => {
        try {
            const res = await UserApi.getAll()
            console.log(res,'res');
            if (res.data) {
                dispatch({type:'USER_GET_ALL', payload: res.data.user})
            }
        } catch (err) {
            return err.res.data ? err.res.data : {success: false, message: "server error"}
        }
    }
    
    const UserContextData = {userState, getUser}

    return (
        <UserContext.Provider value={UserContextData}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContextProvider