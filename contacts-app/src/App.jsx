import { useState, useEffect } from 'react'
import ContactList from './components/ContactList/ContactList'
import ContactForm from './components/ContactForm/ContactForm'
import SearchBar from './components/SearchBar/SearchBar'
import { normalizePhone } from './utils/normalizePhone'
import styles from './App.module.css'

const STORAGE_KEY = 'contacts-app-data'

const defaultContacts = [
  { id: '1', name: 'Иванов Иван', phone: '+375 29 111 1111' },
  { id: '2', name: 'Владимир Ильич', phone: '+375 29 111 1112' },
  { id: '3', name: 'Артемий Дмитриевич', phone: '+375 29 111 1113' }
]

const loadContacts = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      return JSON.parse(stored)
    }
  } catch (e) {
    console.error('Failed to load contacts from localStorage:', e)
  }
  return defaultContacts
}

const saveContacts = (contacts) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(contacts))
  } catch (e) {
    console.error('Failed to save contacts to localStorage:', e)
  }
}

function App() {
  const [contacts, setContacts] = useState(loadContacts)

  useEffect(() => {
    saveContacts(contacts)
  }, [contacts])

  const [searchQuery, setSearchQuery] = useState('')

  const handleAddContact = (newContact) => {
    setContacts(prevContacts => [...prevContacts, newContact])
  }

  const handleEditContact = (id, updatedData) => {
    setContacts(prevContacts =>
      prevContacts.map(contact =>
        contact.id === id ? { ...contact, ...updatedData } : contact
      )
    )
  }

  const handleDeleteContact = (id) => {
    setContacts(prevContacts => prevContacts.filter(contact => contact.id !== id))
  }

  const normalizedQuery = searchQuery.toLowerCase()
  const normalizedQueryDigits = normalizePhone(searchQuery)

  const filteredContacts = contacts.filter(contact => {
    const matchesName = contact.name.toLowerCase().includes(normalizedQuery)
    const matchesPhone =
      contact.phone.includes(searchQuery) ||
      normalizePhone(contact.phone).includes(normalizedQueryDigits)
    return matchesName || matchesPhone
  })

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Список контактов</h1>

      <SearchBar value={searchQuery} onChange={setSearchQuery} />

      <ContactForm onAdd={handleAddContact} existingContacts={contacts} />

      {filteredContacts.length > 0 ? (
        <ContactList
          contacts={filteredContacts}
          allContacts={contacts}
          onEdit={handleEditContact}
          onDelete={handleDeleteContact}
        />
      ) : searchQuery ? (
        <p className={styles.noResults}>Контакты не найдены: {searchQuery}</p>
      ) : (
        <p className={styles.empty}>Список контактов пуст. Добавьте первый контакт.</p>
      )}
    </div>
  )
}

export default App