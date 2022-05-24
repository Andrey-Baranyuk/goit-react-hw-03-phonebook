import styles from 'components/App/App.module.css';
import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import Section from 'components/Section/Section';
import Filter from 'components/Filter/Filter';
import ContactForm from 'components/ContactForm/ContactForm';
import ContactList from 'components/ContactList/ContactList';


export default class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],

    filter: '',
    name: '',
    number: '',
  };

  formSubmitHandler = data => {
    if (this.state.contacts.some(contact => contact.name === data.name)) {
      alert(`${data.name} is already in contacts!`)
    } else {
      const contact = {
        id: nanoid(10),
        name: data.name,
        number: data.number,
      };
      this.setState(prevState => ({
        contacts: [contact, ...prevState.contacts],
      }));
    }
  };

  deleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  changeFilter = e => {
    this.setState({ filter: e.currentTarget.value })
  };


  componentDidMount() {
    const contactStorage = JSON.parse(localStorage.getItem('contacts'));
    if (contactStorage) {
      this.setState({contacts: contactStorage})
    }
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts))
    }
  };

  render() {
    const { filter } = this.state;

    const normalizeFilter = this.state.filter.toLowerCase();
    const filterContacts = this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizeFilter),
    );
    
    return (
      <div className={styles.wrapper}>
        <Section title='Phone book'>
          < ContactForm onSubmit={this.formSubmitHandler} />
        </Section>

        <Section title='Contacts'>
          < Filter value={filter} onChange={this.changeFilter} />
          
          < ContactList
            contacts={filterContacts}
            onDelete={this.deleteContact}
          />
        </Section>
      </div>
    );
  }
  

}