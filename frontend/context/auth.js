import {createContext, useContext, useEffect, useState} from "react";
import {
    createUserWithEmailAndPassword,
    getAuth,
    GoogleAuthProvider,
    onAuthStateChanged,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signInWithRedirect,
    signInWithPopup,
    onIdTokenChanged,
    signOut,
    updateProfile
} from "firebase/auth";
import app from "../backend/clientApp"
import nookies from 'nookies';


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
        return onIdTokenChanged(auth, async (user) => {
            if (user) {
                const token = await user.getIdToken();
                setUser(user)
                nookies.set(undefined, 'token', token, { path: '/' });
            } else {
                setUser(null)
                nookies.set(undefined, 'token', '', { path: '/' });
            }
        })
    }, [])

    useEffect(() => {
        const handle = setInterval(async () => {
            const user = auth.currentUser;
            if (user) await user.getIdToken(true);
        }, 10 * 60 * 1000);

        // clean up setInterval
        return () => clearInterval(handle);
    }, []);


    const register = (email, name, password) => {
        setLoading(true)
        createUserWithEmailAndPassword(auth, email, password)
            .then((res) => {
                return updateProfile(auth.currentUser, {
                    displayName: name
                })
            })
            .then()
            .catch(er => setError(er))
            .finally(() => setLoading(false))
    }

    const forgotPass = (email) => {
        return sendPasswordResetEmail(auth, email)
    }

    // Создаем метод входа в приложение
    const login = async () => {
        try {
            await signInWithPopup(auth, new GoogleAuthProvider())
                .finally(() => setLoading(false))
        } catch (e) {
            console.error(e)
        }
    }

    const loginEmail = async (email, password) => {
        setLoading(true)
        console.log(email, password)
        signInWithEmailAndPassword(auth, email, password)
            // .then(res => console.log(res))
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
export {useAuth, AuthProvider, auth}