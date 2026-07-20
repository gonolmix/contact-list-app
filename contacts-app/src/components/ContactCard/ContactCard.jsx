import { useState } from 'react'
import PropTypes from 'prop-types'
import { normalizePhone } from '../../utils/normalizePhone'
import styles from './ContactCard.module.css'

function ContactCard({ contact, allContacts, onEdit, onDelete }) {
  const [isEditing, setIsEditing] = useState(false)
  const [editName, setEditName] = useState('')
  const [editPhone, setEditPhone] = useState('')
  const [error, setError] = useState('')

  const startEditing = () => {
    setEditName(contact.name)
    setEditPhone(contact.phone)
    setIsEditing(true)
    setError('')
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleSave()
    } else if (e.key === 'Escape') {
      handleCancel()
    }
  }

  const validateEdit = (name, phone, currentId, allContactsList) => {
    if (!name.trim() || !phone.trim()) {
      return 'Заполните все поля'
    }

    const normalizedName = name.trim().toLowerCase()
    const normalizedPhone = normalizePhone(phone)

    const isDuplicate = allContactsList.some(
      (c) =>
        c.id !== currentId &&
        c.name.toLowerCase().trim() === normalizedName &&
        normalizePhone(c.phone) === normalizedPhone
    )

    if (isDuplicate) {
      return 'Контакт с таким именем и телефоном уже существует'
    }

    return ''
  }

  const handleSave = () => {
    const validationError = validateEdit(editName, editPhone, contact.id, allContacts)
    if (validationError) {
      setError(validationError)
      return
    }

    onEdit(contact.id, {
      name: editName.trim(),
      phone: editPhone.trim(),
    })
    setIsEditing(false)
    setError('')
  }

  const handleCancel = () => {
    setIsEditing(false)
    setError('')
  }

  const handleDelete = () => {
    if (window.confirm(`Вы уверены, что хотите удалить контакт "${contact.name}"?`)) {
      onDelete(contact.id)
    }
  }

  const errorId = `error-${contact.id}`

  if (isEditing) {
    return (
      <div className={styles.card} onKeyDown={handleKeyDown}>
        <div className={styles.avatarPlaceholder} aria-hidden="true">
          {contact.name.charAt(0).toUpperCase()}
        </div>
        <div className={styles.info}>
          <label htmlFor={`name-${contact.id}`} className={styles.visuallyHidden}>
            Имя
          </label>
          <input
            id={`name-${contact.id}`}
            type="text"
            value={editName}
            onChange={(e) => {
              setEditName(e.target.value)
              setError('')
            }}
            onKeyDown={handleKeyDown}
            className={styles.input}
            aria-label="Имя контакта"
            aria-describedby={error ? errorId : undefined}
            maxLength={50}
          />
          <label htmlFor={`phone-${contact.id}`} className={styles.visuallyHidden}>
            Телефон
          </label>
          <input
            id={`phone-${contact.id}`}
            type="tel"
            value={editPhone}
            onChange={(e) => {
              const value = e.target.value.replace(/[^\d+\s()-]/g, '')
              setEditPhone(value)
              setError('')
            }}
            onKeyDown={handleKeyDown}
            className={styles.input}
            aria-label="Телефон контакта"
            aria-describedby={error ? errorId : undefined}
            maxLength={20}
            pattern="[\d+\s()-]{10,20}"
          />
          {error && (
            <p id={errorId} className={styles.error} role="alert">
              {error}
            </p>
          )}
          <div className={styles.actions}>
            <button
              type="button"
              onClick={handleSave}
              className={`${styles.button} ${styles.save}`}
              aria-label="Сохранить изменения"
            >
              Сохранить
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className={`${styles.button} ${styles.cancel}`}
              aria-label="Отменить редактирование"
            >
              Отмена
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.card}>
      <div className={styles.avatarPlaceholder} aria-hidden="true">
        {contact.name.charAt(0).toUpperCase()}
      </div>
      <div className={styles.info}>
        <h3 className={styles.name}>{contact.name}</h3>
        <p className={styles.phone}>{contact.phone}</p>
        <div className={styles.actions}>
          <button
            type="button"
            onClick={startEditing}
            className={`${styles.button} ${styles.edit}`}
            aria-label={`Редактировать контакт ${contact.name}`}
          >
            Редактировать
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className={`${styles.button} ${styles.delete}`}
            aria-label={`Удалить контакт ${contact.name}`}
          >
            Удалить
          </button>
        </div>
      </div>
    </div>
  )
}

ContactCard.propTypes = {
  contact: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
  }).isRequired,
  allContacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      phone: PropTypes.string.isRequired,
    })
  ).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
}

export default ContactCard