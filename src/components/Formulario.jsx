import styled from 'styled-components';
import useSelectMonedas from '../hooks/useSelectMonedas';
import { monedas } from "../data/Monedas";
import { useEffect, useState } from 'react';
import Error from './Error';

const InputSubmit = styled.input`
    background-color: #9497FF;
    border: none;
    width: 100%;
    padding: 10px;
    color: #FFF;
    font-weight: 700;
    text-transform: uppercase;
    font-size: 20px;
    border-radius: 5px;
    transition: 300ms ease;
    cursor: pointer;
    margin-top: 30px;

    &:hover {
        background-color: #7A7BFE;
    }
`

const Formulario = ({ setMonedas }) => {

    const [criptos, setCriptos] = useState([])
    const [error, setError] = useState(false)

    const [moneda, SelectMonedas] = useSelectMonedas('Elije tu moneda', monedas);
    const [criptomoneda, SelectCriptoMoneda] = useSelectMonedas('Elije tu criptomoneda', criptos);

    useEffect(() => {
        const consultarAPI = async () => {
            const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=USD'
            const respuesta = await fetch(url)
            const resultado = await respuesta.json()

            const arrayCruptos = resultado.Data.map(cripto => {
                const nuevaMoneda = {
                    id: cripto.CoinInfo.Name,
                    nombre: cripto.CoinInfo.FullName
                };
                return nuevaMoneda;
            })

            setCriptos(arrayCruptos)
        }

        consultarAPI()
    }, [])

    const handleSubmit = e => {
        e.preventDefault()

        if ([moneda, criptomoneda].includes('')) {
            setError(true)
            return
        }

        setMonedas({ moneda, criptomoneda })
        setError(false)
    }

    return (
        <>
            {error && <Error>Todos los campos son obligatorios</Error>}
            <form onSubmit={handleSubmit}>

                <SelectMonedas />
                <SelectCriptoMoneda />

                <InputSubmit
                    value='Cotizar'
                    type='submit' />

            </form>
        </>
    );
}

export default Formulario;