import { useState } from 'react'
import ContactForm from './components/ContactForm/ContactForm'
import ContactList from './components/ContactList/ContactList'
import SearchBar from './components/SearchBar/SearchBar'

function App() {
  const [contacts, setContacts] = useState([
    { 
      id: '1', 
      name: 'Иванов Иван', 
      phone: '+375 29 111 1111', 
      avatar: 'https://i.pravatar.cc/150?u=1' 
    },
    { 
      id: '2', 
      name: 'Владимир Ильич', 
      phone: '+375 29 111 1112', 
      avatar: 'https://i.pravatar.cc/150?u=2' 
    },
    { 
      id: '3', 
      name: 'Артемий Дмитриевич', 
      phone: '+375 29 111 1113', 
      avatar: 'https://i.pravatar.cc/150?u=3' 
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

  const filteredContacts = contacts.filter(contact => {
    const query = searchQuery.toLowerCase()
    const matchesName = contact.name.toLowerCase().includes(query)
    const matchesPhone = contact.phone.includes(query)
    return matchesName || matchesPhone
  })

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1>Список Контактов</h1>
      
      <SearchBar value={searchQuery} onChange={setSearchQuery} />
      
      <ContactForm onAdd={handleAddContact} existingContacts={contacts} />
      
      {filteredContacts.length > 0 ? (
        <ContactList 
          contacts={filteredContacts} 
          onEdit={handleEditContact}
          onDelete={handleDeleteContact}
        />
      ) : (
        <p style={{ textAlign: 'center', color: '#888' }}>Контакты не найдены</p>
      )}
    </div>
  )
}

export default App