import React, { useState, useEffect } from 'react';

const AuthContext = React.createContext({
    isLoggedIn: false,
    handleLogin: () => { },
    handleLogout: () => { }
})

export const AuthContextProvider = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const handleLogin = (token, userId) => {
        localStorage.setItem('todo-token', token);
        localStorage.setItem('todo-user', userId);
        setIsLoggedIn(true);

    }
    const handleLogout = () => {
        localStorage.setItem('todo-token', 'null');
        localStorage.setItem('todo-user', 'null');
        setIsLoggedIn(false);
    }

    useEffect(() => {

        if (localStorage.getItem('todo-token') !== 'null') {
            handleLogin(localStorage.getItem('todo-token'), localStorage.getItem('todo-user'))
        }
    }, [])

    return <AuthContext.Provider value={{ isLoggedIn: isLoggedIn, handleLogout: handleLogout, handleLogin: handleLogin }}>
        {props.children}
    </AuthContext.Provider>
}

export default AuthContext;