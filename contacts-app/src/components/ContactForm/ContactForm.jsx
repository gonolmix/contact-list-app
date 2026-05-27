import { useState } from 'react'
import styles from './ContactForm.module.css'

function ContactForm({ onAdd, existingContacts }) {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [error, setError] = useState('')

  const validate = () => {
    if (!name.trim() || !phone.trim()) {
      setError('Заполните все поля')
      return false
    }
    
    const isDuplicate = existingContacts.some(
      contact => 
        contact.name.toLowerCase() === name.trim().toLowerCase() &&
        contact.phone.trim() === contact.phone
    )
    
    if (isDuplicate) {
      setError('Контакт с таким именем и телефоном уже существует')
      return false
    }
    
    setError('')
    return true
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return

    const newContact = {
      id: Date.now().toString(),
      name: name.trim(),
      phone: phone.trim(),
      avatar: `https://i.pravatar.cc/150?u=${Date.now()}`
    }

    onAdd(newContact)
    setName('')
    setPhone('')
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2 className={styles.title}>Добавить контакт</h2>
      {error && <p className={styles.error}>{error}</p>}
      <input
        type="text"
        placeholder="Имя"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className={styles.input}
      />
      <input
        type="text"
        placeholder="Телефон"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className={styles.input}
      />
      <button type="submit" className={styles.button}>Добавить</button>
    </form>
  )
}

export default ContactForm