import { useState } from 'react';
import styled from 'styled-components';

const Label = styled.label`
    color: #FFF;
    display: block;
    font-family: 'lato', sans-serif;
    font-size: 24px;
    font-weight: 700;
    margin: 15px 0;
`

const Select = styled.select`
    width: 100%;
    font-size: 18px;
    padding: 12px;
    border-radius: 10px;
    margin-bottom: 20px;
`;

const useSelectMonedas = (label, opciones) => {

    const [state, setState] = useState('')

    const SelectMonedas = () => (
        <>
            <Label>{label}</Label>
            <Select
                onChange={e => setState(e.target.value)}
                value={state}>
                <option value=''>-- Seleccione --</option>
                {opciones.map(opcion => <option key={opcion.id} value={opcion.id}>{opcion.nombre}</option>)}
            </Select>
        </>
    )

    return [state, SelectMonedas]
}

export default useSelectMonedas;