import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'

import './style.css'

import logo from '../../assets/logo.svg'

interface LoginSessionResponse {
    idRestaurant: string
    thumbnail: string
    name: string
}


export default function Header() {

    
    const [loginSession, setLoginSession] = useState<LoginSessionResponse>()

    useEffect(() => {
        const loginSessionString:string = localStorage.getItem('loginSession') || '{}'
        setLoginSession(JSON.parse(loginSessionString))
    }, [])




    return (
        <header id="main-header">
            <Link to="/">
                <img id="filaFoodLogo" src={logo} alt=""></img>
            </Link>
            <Link to="/">
                <img id="customerThumbnail"  src={loginSession?.thumbnail || ''} alt={loginSession?.name}></img>
            </Link>
        </header>
    )
}
