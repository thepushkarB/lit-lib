import { useReducer, useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom';
import Home from "./pages/Home.jsx";
import CreateBook from "./pages/CreateBook";
import ShowBook from "./pages/ShowBook";
import EditBook from "./pages/EditBook";
import DeleteBook from "./pages/DeleteBook";
import SignUp from "./pages/SignUp";
import LogIn from './pages/Login.jsx';
import { AuthProvider } from "./contexts/AuthContext.js";


function App() {

  const authReducer = (currState, action) => {
    // cases
    switch(action.type) {
      case "LOGIN":
        return { user: action.payload }
      case "LOGOUT":
        return { user: null }
      default:
        return currState;
    }
  }
  const [state, dispatch] = useReducer(authReducer, { user: null });
  
  //? update `state` by localStorage for `userInfo`(user.name+user.emial & token) 
  useEffect(() => {
    //? localStorage stores data in JSON string, what we want is in JSON object so that we can use it in JS hence parse it to JSON object using `JSON.parse()`
    const user = JSON.parse(localStorage.getItem('user'))

    if(user) {
      dispatch({type: "LOGIN", payload: user});
    }

    //? since depnedency array is empty, this will only run once when the page loads
  }, []);
  console.log("AuthContext state: ", state);

  /*
  ? The `user` property is inside the `state` object, not a standalone variable. You need to access it as `state.user`:
    * `<AuthProvider value={{...state, dispatch}}>`
    ! Or if you specifically want to spread the user object:
    * `<AuthProvider value={{ user: state.user, dispatch }}>`
  */
  
  return (
    <AuthProvider value={{...state, dispatch}}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/books" element={<Home />} />
        <Route path="/books/create" element={<CreateBook />} />
        <Route path="/books/details/:id" element={<ShowBook />} />
        <Route path="/books/edit/:id" element={<EditBook />} />
        <Route path="/books/delete/:id" element={<DeleteBook />} />
        <Route path="/user/signup" element={<SignUp />}/>
        <Route path="/user/login" element={<LogIn />}/>
      </Routes>
    </AuthProvider>
  );
}

export default App
