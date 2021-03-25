import './App.css';
import { useState } from 'react'

// Components
import ShowZip from './components/ShowZip'
import data from './data'


function App() {

  // useState
  const [ zip, setZip ] = useState('')
  const [ coincidencias, setCoincidencias ] = useState([])
  const [ selected, setSelected ] = useState(-1)
  const [ showData, setShowData ] = useState(undefined)

  // Funciones
  const handleChangeZip = e => {  
    if (e.target.value.length > 5 || isNaN(e.target.value)) {
      return
    }

    if ((showData !== null && showData !== undefined) && e.target.value.length < 5) {
      setShowData(null)
    }

    if (e.target.value.length > 4) {
      // Buscar el código y decir si no lo encontro
      const zipEncontrado = data.filter(d => d.PostalCode === e.target.value) 
      if (zipEncontrado.length > 0) {
        showZipDirecto(zipEncontrado[0])
        return
      } else {
        setShowData(null)
      }
    }

    if (e.target.value.length === 0) {
      setCoincidencias([])
      setZip('')
      setSelected(-1)
      setShowData(null)
      return
    }

    let filtro = data.filter(d => d.PostalCode.toString().startsWith(e.target.value))
    if (filtro.length > 8) filtro = filtro.splice(0, 8)

    setCoincidencias(filtro)

    if (filtro.length > 0) {
      setSelected(0)
    }

    setZip(e.target.value)
  }

  const handleKeyUp = e => {
    if (coincidencias.length === 0) return

    if (e.code === 'ArrowDown') {
      setSelected(selected === (coincidencias.length - 1) ? 0 : selected + 1)
    } else if (e.code === 'ArrowUp') {
      setSelected(selected === 0 ? (coincidencias.length - 1) : selected - 1)
    } else if (e.code === 'Enter') {
      showZip(selected)
    }
  }

  const handleMouseEnter = index => {
    setSelected(index)
  }

  const showZip = (index) => {
    handleSetShowZip(coincidencias[index])
  }

  const showZipDirecto = zip => {
    handleSetShowZip(zip)
  }

  const handleSetShowZip = zip => {
    setShowData(zip)
    setCoincidencias([])
    setZip(zip.PostalCode)
    setSelected(-1)
  }

  return (
    <>

    <div className='search-zip'>
      <h1>Zip code location finder</h1>
      <input 
        placeholder='Ingrese un código zip'
        value={ zip }
        onChange={ handleChangeZip }
        onKeyUp={ handleKeyUp }
        autoComplete='off'
      />
      <div className='coincidencias'>
        { coincidencias.map((c, index) => (
          <p 
            key={ index }
            className={ index === selected  ? 'selected' : ''}
            onMouseMove={ () => handleMouseEnter(index) }
            onClick={ () => showZip(index) }
          >{ c.PostalCode }, { c.Department }, { c.Municipality }, { c.Neighbourhood }</p>
        ))}
      </div>

    </div>
    
    <ShowZip
      data={ showData }
      zip={ zip }
      coincidencias={ coincidencias }
    ></ShowZip>
    </>
  );
}

export default App;
