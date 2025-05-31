import { useState } from "react";
import { useAuth } from "../contexts/AuthContext.js";
import axios from "axios";
//? notification/alert
// import { useSnackbar } from "notistack";

const useSignup = () => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);
    //? destructure `dispatch`(a sort of setter method) from context
    const { dispatch } = useAuth();

    //? notification/alert
    // const { enqueueSnackbar }  = useSnackbar();

    const signup = async (name, email, password) => {
        setLoading(true);
        setError(null);

        // const response = await fetch("http://localhost:5001/books/signup", {
        //     method: 'POST',
        //     // seding data in JSON 
        //     headers: {'Context-Type': 'application/json'},
        //     // data(name, email, password) is in `body` prop as an object
        //     body: JSON.stringify({name, email, password})
        // })
        // const json = await response.json();
        // if(response.ok) {
        //     localStorage.setItem('user', JSON.stringify(json));
        // }
        // if(!response.ok) {
        //     setLoading(false);
        //     setError(json.error)
        // }

        const userData = {
            name,
            email,
            password
        }
        
        try {
            const resp = await axios.post("http://localhost:5001/user/signup", userData);
            // console.log("resp:", resp.data);
            //? userInfo == user & JWT
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
                // setError(`xhud gaye guru: ${error.response.data}`)
                setError(`${error.response.data}`);
            }
        }
        //
    }

    return { signup, loading, error};
}


export default useSignup;