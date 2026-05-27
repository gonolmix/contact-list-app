import { useState } from 'react'
import styles from './ContactCard.module.css'

function ContactCard({ contact, onEdit, onDelete }) {
  const [isEditing, setIsEditing] = useState(false)
  const [editName, setEditName] = useState(contact.name)
  const [editPhone, setEditPhone] = useState(contact.phone)

  const handleSave = () => {
    if (editName.trim() && editPhone.trim()) {
      onEdit(contact.id, {
        name: editName.trim(),
        phone: editPhone.trim()
      })
      setIsEditing(false)
    }
  }

  const handleCancel = () => {
    setEditName(contact.name)
    setEditPhone(contact.phone)
    setIsEditing(false)
  }

  const handleDelete = () => {
    if (window.confirm(`Вы уверены, что хотите удалить контакт "${contact.name}"?`)) {
      onDelete(contact.id)
    }
  }

  if (isEditing) {
    return (
      <div className={styles.card}>
        <img src={contact.avatar} alt={contact.name} className={styles.avatar} />
        <div className={styles.info}>
          <input
            type="text"
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
            className={styles.input}
          />
          <input
            type="text"
            value={editPhone}
            onChange={(e) => setEditPhone(e.target.value)}
            className={styles.input}
          />
          <div className={styles.actions}>
            <button onClick={handleSave} className={`${styles.button} ${styles.save}`}>Сохранить</button>
            <button onClick={handleCancel} className={`${styles.button} ${styles.cancel}`}>Отмена</button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.card}>
      <img src={contact.avatar} alt={contact.name} className={styles.avatar} />
      <div className={styles.info}>
        <h3 className={styles.name}>{contact.name}</h3>
        <p className={styles.phone}>{contact.phone}</p>
        <div className={styles.actions}>
          <button onClick={() => setIsEditing(true)} className={`${styles.button} ${styles.edit}`}>Редактировать</button>
          <button onClick={handleDelete} className={`${styles.button} ${styles.delete}`}>Удалить</button>
        </div>
      </div>
    </div>
  )
}

export default ContactCard