import {createContext, FC, useContext, useEffect, useState} from "react";
import {
    getAuth,
    GoogleAuthProvider,
    EmailAuthProvider,
    User,
    signInWithPopup,
    signInWithRedirect,
    signOut,
    onAuthStateChanged,
    createUserWithEmailAndPassword,
    updateProfile,
    signInWithEmailAndPassword,
    sendPasswordResetEmail
} from "firebase/auth";
import app from "../backend/clientApp"

// Создаем контект авторизации для того что бы не прокидывать пропсами информацию  о пользователе
const AuthContext = createContext({
    user: null,
    login: () => {},
    logout: () => {}
})

// Возвращает экземпляр аутентификации,
// связанный с предоставленным приложением @backend/app#Firebase.
// Если экземпляр не существует, инициализирует экземпляр аутентификации с зависящими от платформы зависимостями по умолчанию.
const auth = getAuth(app)

// Создаем функциональный компонент реакт провайдер, что бы потом в него обернуть все наше приложение и создать в нем контекс
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)  // Создаем переменную стэйта пользователя
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    // Подвешиваем слушателя изменения пользователя при входе или выходе
    useEffect(()=> {
        setLoading(true)
        const unSubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user)
            } else {
                setUser(null)
            }
        })

        return unSubscribe
    }, [])


    const register = (email, name, password) => {
        setLoading(true)
        createUserWithEmailAndPassword(auth, email, password)
            .then((res) => {
                console.log(res)
                return updateProfile(auth.currentUser, {
                    displayName: name
                })
            })
            .then(res => console.log(res))
            .catch(er => setError(er.message))
            .finally(() => setLoading(false))
    }

    const forgotPass = (email) => {
        //
        return sendPasswordResetEmail(auth, email)
    }

    // Создаем метод входа в приложение
    const login = async () => {
        try {
            await signInWithRedirect(auth, new GoogleAuthProvider())
        } catch (e) {
            console.error(e)
        }
    }

    const loginEmail = async (email, password) => {
        setLoading(true)
        signInWithEmailAndPassword(auth, email, password)
            .then(res => console.log(res))
            .catch(er => setError(er.message))
            .finally(() => setLoading(false))
    }

    // Создаем метод выхода из приложения
    const logout = async () => {
        try {
            await signOut(auth)
        } catch (e) {
            console.error(e)
        }
    }

    const userContext = {
        user,
        loading,
        error,
        login,
        logout,
        loginEmail,
        forgotPass,
        register
    }

    // Возврашаем сам реакт компонент
    return (
        <AuthContext.Provider value={userContext}>
            { children }
        </AuthContext.Provider>
    )
}

// Создаем свой хук для получения контекста авторизации
const useAuth = () => useContext(AuthContext)

// экспортируем хук и компонент провайдера
export {useAuth, AuthProvider}