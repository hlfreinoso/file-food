import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
import { Map, TileLayer, Marker } from 'react-leaflet';
import { LeafletMouseEvent } from 'leaflet';
import api from '../../services/api';
import axios from 'axios';

import './styles.css';

import logo from '../../assets/logo.svg';

interface IBGEUFResponse {
    sigla: string
}

interface IBGECityResponse {
    nome: string
}

const CreateRestaurant = () => {
    const [ufs, setUfs] = useState<string[]>([]);
    const [cities, setCities] = useState<string[]>([]);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        whatsapp: '',
        adress: '',
        password: '',
        thumbnail: ''
    });
    const [initialPosition, setInitialPosition] = useState<[number, number]>([0, 0]);
    const [selectedUf, setSelectedUf] = useState('0');
    const [selectedCity, setSelectedCity] = useState('0');
    const [selectedPosition, setSelectedPosition] = useState<[number, number]>([0, 0]);
    const [selectedTime, setSelectedTime] = useState<string>('5');

    const history = useHistory();

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;
            setInitialPosition([latitude, longitude]);
        });
    }, []);

    useEffect(() => {
        axios.get<IBGEUFResponse[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome').then(response => {
            const ufInitials = response.data.map(uf => uf.sigla);
            setUfs(ufInitials);
        });
    }, []);

    useEffect(() => {
        if (selectedUf === '0')
        {
            return;
        }
        axios.get<IBGECityResponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`).then(response => {
            const cityNames = response.data.map(city => city.nome);
            setCities(cityNames);
        });
    }, [selectedUf]);

    function handleSelectUf(event: ChangeEvent<HTMLSelectElement>) {
        const uf = event.target.value;
        setSelectedUf(uf);
    }

    function handleSelectCity(event: ChangeEvent<HTMLSelectElement>) {
        const city = event.target.value;
        setSelectedCity(city);
    }

    function handleSelectTime(event: ChangeEvent<HTMLSelectElement>) {
        const time = event.target.value;
        setSelectedTime(time);
    }

    function handleMapClick(event: LeafletMouseEvent) {
        setSelectedPosition([
            event.latlng.lat,
            event.latlng.lng
        ])
    }

    function handleImputChange(event: ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value })
    }

    async function handleSubmit(event: FormEvent) {
        event.preventDefault();
        const { name, email, whatsapp, adress, password, thumbnail } = formData;
        const uf = selectedUf;
        const city = selectedCity;
        const maxWaitTime = selectedTime;
        const [latitude, longitude] = selectedPosition;
        const data = {
            name,
            email,
            whatsapp,
            uf,
            city,
            latitude,
            longitude,
            maxWaitTime,
            adress,
            password,
            thumbnail,
        };
        console.log(data);
        if (data.name === ''){ return alert('O campo Nome é obrigatório!') };
        if (data.email === ''){ return alert('O campo E-mail é obrigatório!') };
        if (data.whatsapp === ''){ return alert('O campo Whatsapp é obrigatório!') };
        if (data.uf === '0'){ return alert('O campo Estado(UF) é obrigatório!') };
        if (data.city === '0'){ return alert('O campo cidade é obrigatório!') };
        if (data.latitude === 0){ return alert('É necessário selecionar um ponto no mapa!') };
        if (data.longitude === 0){ return alert('É necessário selecionar um ponto no mapa!') };
        if (data.adress === ''){ return alert('O campo Endereço é obrigatório!') };
        if (data.password === ''){ return alert('O campo Senha é obrigatório!') };
        await api.post('restaurants', data);
        alert('Restaurante cadastrado');
        history.push('/');
    }

    return (
        <div id="page-create-point">
            <header>
                <img src={logo} alt="Fila Food" />
                <Link to="/">
                    <FiArrowLeft />
                    Voltar para home
                </Link>
            </header>
            <form onSubmit={handleSubmit}>
                <h1>Cadastro do Restaurante</h1>
                <fieldset>
                    <legend>
                        <h2>Contato</h2>
                    </legend>
                    <div className="field">
                        <label htmlFor="name">Nome do Restaurante</label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            onChange={handleImputChange}
                        />
                    </div>
                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="email">E-mail</label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                onChange={handleImputChange}
                            />
                        </div>
                        <div className="field">
                            <label htmlFor="whatsapp">Whatsapp</label>
                            <input
                                type="text"
                                name="whatsapp"
                                id="whatsapp"
                                onChange={handleImputChange}
                            />
                        </div>
                    </div>
                </fieldset>

                <fieldset>
                    <legend>
                        <h2>Endereço</h2>
                        <span>Selecione o endereço no mapa</span>
                    </legend>
                    <Map center={initialPosition} zoom={15} onClick={handleMapClick} >
                    <TileLayer
                        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={selectedPosition}/>
                    </Map>
                    <div className="field">
                        <label htmlFor="adress">Endereço</label>
                        <input
                            type="text"
                            name="adress"
                            id="adress"
                            onChange={handleImputChange}
                        />
                    </div>
                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="uf">Estado (UF)</label>
                            <select name="uf" id="uf" value={selectedUf} onChange={handleSelectUf}>
                                <option value="0">Selecione uma UF</option>
                                {ufs.map(uf => (
                                    <option key={uf} value={uf}>{uf}</option>
                                ))}
                            </select>
                        </div>
                        <div className="field">
                            <label htmlFor="city">Cidade</label>
                            <select name="city" id="city" value={selectedCity} onChange={handleSelectCity}>
                                <option value="0">Selecione uma Cidade</option>
                                {cities.map(city => (
                                    <option key={city} value={city}>{city}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="field">
                        <label htmlFor="thumbnail">URL da Imagem</label>
                        <input
                            type="text"
                            name="thumbnail"
                            id="thumbnail"
                            onChange={handleImputChange}
                        />
                    </div>
                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="time">Tempo Máximo de espera</label>
                            <select name="time" id="time" value={selectedTime} onChange={handleSelectTime}>
                                <option value="5">5 minutos</option>
                                <option value="10">10 minutos</option>
                                <option value="15">15 minutos</option>
                                <option value="20">20 minutos</option>
                                <option value="25">25 minutos</option>
                                <option value="30">30 minutos</option>
                            </select>
                        </div>
                        <div className="field">
                            <label htmlFor="password">Digite a senha</label>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                onChange={handleImputChange}
                            />
                        </div>
                    </div>
                </fieldset>
                <button type="submit">Cadastrar Restaurante</button>
            </form>
        </div>
    )
}

export default CreateRestaurant;