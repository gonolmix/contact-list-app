import ContactCard from '../ContactCard/ContactCard'
import styles from './ContactList.module.css'

function ContactList({ contacts, onEdit, onDelete }) {
  return (
    <div className={styles.list}>
      {contacts.map((contact) => (
        <ContactCard 
          key={contact.id} 
          contact={contact}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  )
}

export default ContactList