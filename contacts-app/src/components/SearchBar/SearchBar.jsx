import styles from './SearchBar.module.css'

function SearchBar({ value, onChange }) {
  return (
    <div className={styles.container}>
      <input 
        type="text" 
        className={styles.input}
        placeholder="Поиск по имени или телефону..." 
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  )
}

export default SearchBar