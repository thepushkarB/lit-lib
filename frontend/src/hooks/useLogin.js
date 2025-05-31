import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";
//? notification/alert
// import { useSnackbar } from "notistack";
import { PiSelectionAllFill } from "react-icons/pi";

const useLogin = () => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);
    //? destructure `dispatch`(a sort of setter method) from context
    const { dispatch } = useAuth();

    //? notification / snackbar
    // const { enqueueSnackbar } = useSnackbar();

    const login = async (email, password) => {
        setLoading(true);
        setError(null);

        const loginCredentials = {
            email, 
            password
        }

        try {
            const resp = await axios.post("http://localhost:5001/user/login", loginCredentials);
            console.log("resp:", resp.data);
            //? userInfo = user & JWT
            const userInfo = resp.data;
            //? since received data/token is saved in localStorage we gotta convert it JSON string type w/ key: `user`
            localStorage.setItem('user', JSON.stringify(userInfo));

            //? update the context: `dispatch(action)`
            dispatch({ type: "LOGIN", payload: userInfo });

            setLoading(false);
            return userInfo;
        } catch (error) {
            setLoading(false);
            if (error.response && error.response.data && error.response.data.error) {
                setError(`${error.response.data.error}`);
            }
            else {
                setError(`${error.response.data}`);
            }
        }
        //
    }

    return { login, loading, error };

}

export default useLogin;