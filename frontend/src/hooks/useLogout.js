import { useAuth } from "../contexts/AuthContext";

const useLogout = () => {
    //? destructure `dispatch`(a sort of setter method) from context
    const { dispatch } = useAuth();
    
    const logout = () => {
        //? remove token 
        localStorage.removeItem('user');

        //? change/update the state to "LOGOUT"
        //? no payload coz -> `return { user: null }` in useReducer()
        dispatch({ type: "LOGOUT"});
    }

    return { logout };
}

export default useLogout;