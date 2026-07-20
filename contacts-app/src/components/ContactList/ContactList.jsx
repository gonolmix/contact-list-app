import PropTypes from 'prop-types'
import ContactCard from '../ContactCard/ContactCard'
import styles from './ContactList.module.css'

function ContactList({ contacts, allContacts, onEdit, onDelete }) {
  return (
    <div className={styles.list}>
      {contacts.map((contact) => (
        <ContactCard
          key={contact.id}
          contact={contact}
          allContacts={allContacts}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  )
}

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      phone: PropTypes.string.isRequired,
      avatar: PropTypes.string.isRequired,
    })
  ).isRequired,
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

export default ContactList