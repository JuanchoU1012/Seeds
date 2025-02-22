import React, { useState } from 'react'
import '../estilos/buscador.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'


const InputSearch = ({placeholder = 'Buscar...', onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('')

  // Manejar cambios en el input
  const handleChange = (event) => {
    setSearchQuery(event.target.value)
  }

  const handleSearch = () => {
    if (onSearch) {
      onSearch(searchQuery)
    }
  }

  return (
    <div className="input-search-container">
      <input
        type="text"
        value={searchQuery}
        onChange={handleChange}
        placeholder={placeholder}
        className="input-search"
      />
      <button onClick={handleSearch} className="search-button">
      <FontAwesomeIcon icon={faMagnifyingGlass} />
      </button>
    </div>
  )
}

export default InputSearch
