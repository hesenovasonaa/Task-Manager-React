import { createContext, useContext, useReducer } from "react";

const AuthContext = createContext();
const initialState = {
    token: localStorage.getItem("token"),
};
function authReducer(state, action) {
    switch (action.type) {
    case "LOGIN":
        localStorage.setItem("token", action.payload);
        return {
        token: action.payload,
        };
    case "LOGOUT":
        localStorage.removeItem("token");
        return {
        token: null,
        };
    default:
        return state;
    }
}
export function AuthProvider({ children }) {
    const [state, dispatch] = useReducer(authReducer, initialState);
    const login = (token) => {
    dispatch({
        type: "LOGIN",
        payload: token,
    });
};
    const logout = () => {
    dispatch({
        type: "LOGOUT",
    });
};
    return (
    <AuthContext.Provider
    value={{
        token: state.token,
        login,
        logout,
    }}
    >
    {children}
    </AuthContext.Provider>
    );
}
export function useAuth() {
    return useContext(AuthContext);
}