import {createContext, FC, useContext, useEffect, useState} from "react";
import {getAuth, GoogleAuthProvider, User, signInWithPopup, signOut, onAuthStateChanged} from "firebase/auth";
import app from "../../firebase/clientApp"
import mainMenu from '../../store/MainMenu'

// Описываем типы данных обьекта MyAuth
interface MyAuth {
    user: User | null,
    login: () => void,
    logout: () => void
}

// Создаем контект авторизации для того что бы не прокидывать пропсами информацию  о пользователе
const AuthContext = createContext<MyAuth>({
    user: null,
    login: () => {},
    logout: () => {}
})

// Возвращает экземпляр аутентификации,
// связанный с предоставленным приложением @firebase/app#Firebase.
// Если экземпляр не существует, инициализирует экземпляр аутентификации с зависящими от платформы зависимостями по умолчанию.
const auth = getAuth(app)

// Создаем функциональный компонент реакт провайдер, что бы потом в него обернуть все наше приложение и создать в нем контекс
const AuthProvider: FC = ({ children }) => {
    const [user, setUser] = useState<User | null>(null)  // Создаем переменную стэйта пользователя

    // Подвешиваем слушателя изменения пользователя при входе или выходе
    useEffect(()=> {
        const unSubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user)
            } else {
                setUser(null)
            }
        })

        return unSubscribe
    }, [])


    // Создаем метод входа в приложение
    const login = async () => {
        try {
            await signInWithPopup(auth, new GoogleAuthProvider())
        } catch (e) {
            console.error(e)
        }
    }

    // Создаем метод выхода из приложения
    const logout = async () => {
        try {
            await signOut(auth)
        } catch (e) {
            console.error(e)
        }
    }

    // Возврашаем сам реакт компонент
    return (
        <AuthContext.Provider value={{user, login, logout}}>
            { children }
        </AuthContext.Provider>
    )
}

// Создаем свой хук для получения контекста авторизации
const useAuth = () => useContext(AuthContext)

// экспортируем хук и компонент провайдера
export {useAuth, AuthProvider}