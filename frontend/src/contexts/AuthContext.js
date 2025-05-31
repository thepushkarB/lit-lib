import React, { createContext, useContext, useReducer } from "react";

//? create context
export const AuthContext = createContext();

//? provide context
export const AuthProvider = AuthContext.Provider;

// export const authReducer = (currState, action) => {
//     // cases
//     switch(action.type) {
//         case "LOGIN":
//             return { user: action.payload }
//         case "LOGOUT":
//             return { user: null }
//         default:
//             return currState
//     }
// }
// export const AuthProvider = ({children}) => {
//     const [state, dispatch] = useReducer(authReducer, { user: null });

//     console.log("AuthContext state: ", state);

//     return (
//         <AuthContext.Provider value={{...state, dispatch}}>
//             { children }
//         </AuthContext.Provider>
//     )
// }


//? custom hook to consume context -> will comsume the context and `useAuth` will have value(s)/data of the consumed context
// export const useAuthContext = () => {
//     const context = useContext(AuthContext);
//     if (!context) {
//         throw Error('useAuthContext must be used inside an AuthContextProvider')
//     }
//     return context
// }
export const useAuth = () => {
    return useContext(AuthContext);
}