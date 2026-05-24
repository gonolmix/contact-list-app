import { useState } from 'react'
import ContactList from './components/ContactList/ContactList'

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

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1>Список Контактов</h1>
      <ContactList contacts={contacts} />
    </div>
  )
}

export default App