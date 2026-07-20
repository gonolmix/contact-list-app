import { useState } from 'react'
import PropTypes from 'prop-types'
import { normalizePhone } from '../../utils/normalizePhone'
import styles from './ContactForm.module.css'

const generateId = () => {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`
}

const isValidPhoneFormat = (phone) => {
  const digits = normalizePhone(phone)
  return digits.length >= 10 && digits.length <= 15
}

function ContactForm({ onAdd, existingContacts }) {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [error, setError] = useState('')

  const validate = () => {
    if (!name.trim() || !phone.trim()) {
      return 'Заполните все поля'
    }

    if (!isValidPhoneFormat(phone)) {
      return 'Введите корректный номер телефона (10–15 цифр)'
    }

    const normalizedName = name.trim().toLowerCase()
    const normalizedPhone = normalizePhone(phone)

    const isDuplicate = existingContacts.some(
      (contact) =>
        contact.name.toLowerCase().trim() === normalizedName &&
        normalizePhone(contact.phone) === normalizedPhone
    )

    if (isDuplicate) {
      return 'Контакт с таким именем и телефоном уже существует'
    }

    return ''
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const validationError = validate()

    if (validationError) {
      setError(validationError)
      return
    }

    const newContact = {
      id: generateId(),
      name: name.trim(),
      phone: phone.trim(),
    }

    onAdd(newContact)
    setName('')
    setPhone('')
    setError('')
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2 className={styles.title}>Добавить контакт</h2>
      {error && <p className={styles.error} role="alert">{error}</p>}
      <label htmlFor="name-input" className={styles.visuallyHidden}>
        Имя
      </label>
      <input
        id="name-input"
        type="text"
        placeholder="Имя"
        value={name}
        onChange={(e) => {
          setName(e.target.value)
          setError('')
        }}
        className={styles.input}
        aria-required="true"
        maxLength={50}
      />
      <label htmlFor="phone-input" className={styles.visuallyHidden}>
        Телефон
      </label>
      <input
        id="phone-input"
        type="tel"
        placeholder="Телефон"
        value={phone}
        onChange={(e) => {
          const value = e.target.value.replace(/[^\d+\s()-]/g, '')
          setPhone(value)
          setError('')
        }}
        className={styles.input}
        aria-required="true"
        maxLength={20}
        pattern="[\d+\s()-]{10,20}"
      />
      <button type="submit" className={styles.button}>
        Добавить
      </button>
    </form>
  )
}

ContactForm.propTypes = {
  onAdd: PropTypes.func.isRequired,
  existingContacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      phone: PropTypes.string.isRequired,
    })
  ).isRequired,
}

export default ContactForm