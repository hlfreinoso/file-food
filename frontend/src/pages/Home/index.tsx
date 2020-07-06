import React, { useEffect, useState, FormEvent } from 'react'
import { FiLogIn } from 'react-icons/fi'
import { Link, useHistory } from 'react-router-dom'
import api from '../../services/api'

import logo from '../../assets/logo.svg';
import initImage from '../../assets/home-background.svg';

import './styles.css'


const Home = () => {

    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')  
    const [showMsg, setShowMsg] =  useState<boolean>(false)
    const history = useHistory()

    async function handleSubmit(event: FormEvent) {
        event.preventDefault()

        const restaurant = {
            type: 'R',
            email,
            password
        }

        try {
            setShowMsg(false)
            const login = await api.post('/sessions', restaurant)
            
            localStorage.setItem('loginSession', JSON.stringify(login.data))
            history.push('/restaurant')            
        } catch {
            setShowMsg(true)
        }
    }



    return (
        <div id="content">
            <main>
                <img src={logo} alt="Fila Food" />
                <h1>Fila digital,</h1>
                <h1>sem aglomerações</h1>

                <form onSubmit={handleSubmit}>
                    <div className="field">
                        <label htmlFor="email">E-mail</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="field">
                        <label htmlFor="password">Senha</label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div>

                    {
                        showMsg && (
                            <p>
                                Login e/ou senha não está correto
                            </p>
                        )
                    }
                    
                    <button type="submit">
                        Entrar
                        <span>
                            <FiLogIn />
                        </span>
                    </button>                    
                </form>
                
                <p>Crie uma conta <Link to="/create-restaurant">aqui</Link></p>
            </main>

            <aside>
                    <img src={initImage} alt=""/>
            </aside>
            
        </div>
    )
}

export default Home;