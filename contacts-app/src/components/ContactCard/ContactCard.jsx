import styles from './ContactCard.module.css'

function ContactCard({ contact }) {
  return (
    <div className={styles.card}>
      <img 
        src={contact.avatar} 
        alt={contact.name} 
        className={styles.avatar} 
      />
      <div className={styles.info}>
        <h3 className={styles.name}>{contact.name}</h3>
        <p className={styles.phone}>{contact.phone}</p>
      </div>
    </div>
  )
}

export default ContactCard