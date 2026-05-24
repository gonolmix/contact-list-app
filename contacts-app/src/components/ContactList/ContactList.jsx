import ContactCard from '../ContactCard/ContactCard'
import styles from './ContactList.module.css'

function ContactList({ contacts }) {
  return (
    <div className={styles.list}>
      {contacts.map((contact) => (
        <ContactCard 
          key={contact.id} 
          contact={contact} 
        />
      ))}
    </div>
  )
}

export default ContactList