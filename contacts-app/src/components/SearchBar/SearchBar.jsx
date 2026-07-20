import PropTypes from 'prop-types'
import styles from './SearchBar.module.css'

function SearchBar({ value, onChange }) {
  return (
    <div className={styles.container}>
      <label htmlFor="search-input" className={styles.visuallyHidden}>
        Поиск по имени или телефону
      </label>
      <input 
        id="search-input"
        type="text" 
        className={styles.input}
        placeholder="Поиск по имени или телефону..." 
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label="Поиск по имени или телефону"
      />
    </div>
  )
}

SearchBar.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default SearchBar