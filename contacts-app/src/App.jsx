import { useState } from 'react'
import ContactList from './components/ContactList/ContactList'
import ContactForm from './components/ContactForm/ContactForm'
import SearchBar from './components/SearchBar/SearchBar'
import styles from './App.module.css'

const normalizePhone = (phone) => {
  return phone.replace(/\D/g, '')
}

function App() {
  const [contacts, setContacts] = useState([
    { 
      id: '1', 
      name: 'Иванов Иван', 
      phone: '+375 29 111 1111', 
      avatar: 'avatar-1' 
    },
    { 
      id: '2', 
      name: 'Владимир Ильич', 
      phone: '+375 29 111 1112', 
      avatar: 'avatar-2' 
    },
    { 
      id: '3', 
      name: 'Артемий Дмитриевич', 
      phone: '+375 29 111 1113', 
      avatar: 'avatar-3' 
    }
  ])

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
      ) : (
        <p className={styles.noContacts}>Контакты не найдены</p>
      )}
    </div>
  )
}

export default App