import PropTypes from 'prop-types';
import styles from 'components/ContactList/ContactList.module.css';

export default function ContactList({ contacts, onDelete }) {
  return (
    <ol className={styles.list}>
      {contacts.map(e => (
        <li key={e.id}>
          <p className={styles.posBtn}>
            <span className={styles.text}>
              {e.name}: {e.number}
            </span>

            <button
              type="button"
              onClick={() => onDelete(e.id)}
              className={styles.btn}
            >
              Delete
            </button>
          </p>
        </li>
      ))}
    </ol>
  );
}

ContactList.propTypes = {
    contacts: PropTypes.array.isRequired,
    onDelete: PropTypes.func.isRequired
};
