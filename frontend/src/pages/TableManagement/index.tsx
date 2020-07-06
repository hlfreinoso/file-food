import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react'
import { Link } from 'react-router-dom'
import api from '../../services/api'
import { IoIosPeople } from 'react-icons/io'

import './styles.css'

interface LoginSessionResponse {
    idRestaurant: string
}

interface TableResponse {
    idTable: string
    name: string
    status: string
    maxPeople: string
}
interface htmlEvent {
    target: {
        id:string
    }
}


const TableManagement = () => {

    const [tables, setTables] = useState<TableResponse[]>([])
    const [loginSession, setLoginSession] = useState<LoginSessionResponse>()

    useEffect(() => {
        const loginSessionString:string = localStorage.getItem('loginSession') || '{}'
        setLoginSession(JSON.parse(loginSessionString))
    }, [])
    
    
    useEffect(() => {
        getAllTables()
    }, [loginSession])

    async function getAllTables(){
        const tables = await api.get<TableResponse[]>(`/tables?idRestaurant=${ loginSession?.idRestaurant }`)
        setTables(tables.data)
    }


    function handleSaveTableData(idTable:string){

    }

    return (
        <div id="content">
            <div id="tablesList">                
                {
                    tables.map(table => (
                        <div className="table" key={`key_${table.idTable}`}>
                            <label htmlFor={table.idTable} className="tableHeader">
                                {table.name}
                            </label>
                            <input 
                                type="checkbox"
                                name={table.idTable} 
                                id={table.idTable}
                            />
                            <div className="tableContent">
                                <label htmlFor={`name_{table.idTable}`}>Nome da Mesa</label>
                                <input type="text" name={`name_{table.idTable}`} id={`name_{table.idTable}`} value={table.name}/>
                                <label htmlFor={`maxQty{table.idTable}`}>Numero de Lugares</label>
                                <input type="text" name={`maxQty{table.idTable}`} id={`maxQty{table.idTable}`} value={table.maxPeople}/>
                                <button onClick={() => handleSaveTableData(table.idTable)} >
                                    Salvar
                                </button>
                            </div>


                        </div>
                    ))
                } 
            </div>
            
        </div>
    )
}

export default TableManagement;