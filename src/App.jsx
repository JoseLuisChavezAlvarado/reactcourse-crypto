import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Formulario from './components/Formulario';
import Resultado from './components/Resultado';
import Spinner from './components/Spinner';
import ImgCriptos from './img/imagen-criptos.png'

const Heading = styled.h1`
  font-family: 'Lato', sans-serif;
  color: #FFF;
  text-align: center;
  font-weight: 700;
  margin-top: 80px;
  margin-bottom: 50px;
  font-size: 34px;

  &::after {
    content: '';
    width: 100px;
    height: 6px;
    background-color: #66A2FE;
    display: block;
    margin: 10px auto 0  auto;
  }
`

const Contenedor = styled.div`
  max-width: 900px;
  margin: 0 auto;
  width: 90%;

  @media (min-width: 992px){
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`

const Imagen = styled.img`
  max-width: 400px;
  width: 80%;
  margin: 100px auto 0 auto;
  display: block;
`

function App() {

  const [resultado, setResultado] = useState({})
  const [monedas, setMonedas] = useState({})
  const [cargando, setCargando] = useState(false)

  useEffect(() => {
    if (Object.keys(monedas).length) {

      const { moneda, criptomoneda } = monedas

      const cotizarCripto = async () => {
        setCargando(true)
        setResultado({})

        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`
        const respuesta = await fetch(url)
        const resultado = await respuesta.json()

        setResultado(resultado.DISPLAY[criptomoneda][moneda])
        setCargando(false)
      }

      cotizarCripto()

    }
  }, [monedas])


  return (
    <Contenedor>
      <Imagen
        alt='Imagen Criptomonedas'
        src={ImgCriptos} />

      <div>
        <Heading>Cotiza criptomonedas al instante</Heading>
        <Formulario setMonedas={setMonedas} />

        {cargando && <Spinner/>}
        {resultado.PRICE && <Resultado resultado={resultado} />}

      </div>

    </Contenedor>
  )
}

export default App
