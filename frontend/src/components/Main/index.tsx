import React from 'react'
import { Link } from 'react-router-dom'
import Header from '../Header'

import Routes from '../../routes'

import './style.css'


export default function Main() {  
    return (
        <>
            <Header />
            <Routes />
        </>
    )
}
