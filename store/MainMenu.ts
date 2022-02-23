import { makeAutoObservable } from "mobx";
import {useRouter} from "next/router";

class MainMenuStore {
    list = [
        {
            id: 1,
            label: 'Тарифы',
            href: '/tariffs',
            active: true,
        },
        {
            id: 2,
            label: 'О проекте',
            href: '/about',
            active: false,
        },
        {
            id: 3,
            label: 'Поддержка',
            href: '/support',
            active: false,
        },
        {
            id: 4,
            label: 'Войти',
            href: '/login',
            active: false,
        }
    ]

    constructor() {
        makeAutoObservable(this)
    }

    //Метод устанавливающий активный пункт меню
    initActive(slug: string){
        //Сбрасываем со всех пунктов меню активное состояние
        this.list.forEach(item => item.active = false)

        //Находим в массиве нужный пункт меню и устанавливаем его активное состояние
        this.list.forEach(item => {
            if (slug === item.href) {
                console.log('Совпадление - ', slug, item.href)
                item.active = true
            }
        })
    }
}

export default new MainMenuStore()