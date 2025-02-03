import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./ContactsApp.css";

const ContactsApp = () => {
    const [contacts, setContacts] = useState([]);
    const [newContact, setNewContact] = useState({ name: '', email: '', phone: '', address: '' });
    const [searchTerm, setSearchTerm] = useState('');

    // Fetch contacts from the backend
    useEffect(() => {
        axios.get('http://localhost:5000/contacts')
            .then(response => setContacts(response.data));
    }, []);

    // Handle adding a new contact
    const handleAddContact = () => {
        axios.post('http://localhost:5000/contacts', newContact)
            .then(response => {
                setContacts([...contacts, response.data]);
                setNewContact({ name: '', email: '', phone: '', address: '' });
            });
    };

    // Handle deleting a contact
    const handleDeleteContact = (id) => {
        axios.delete(`http://localhost:5000/contacts/${id}`)
            .then(() => setContacts(contacts.filter(contact => contact._id !== id)));
    };

    // Handle editing a contact
    const handleEditContact = (id) => {
        const contactToEdit = contacts.find(contact => contact._id === id);
        setNewContact(contactToEdit);
    };

    // Filter contacts based on the search term
    const filteredContacts = contacts.filter(contact =>
        contact.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Sort contacts alphabetically by name
    const sortedContacts = filteredContacts.sort((a, b) => a.name.localeCompare(b.name));

    return (
      <div className="container">  {/* Add this container */}
          <h1>Contact Manager</h1>
          
          {/* Search Bar */}
          <input 
              type="text" 
              placeholder="Search by name" 
              value={searchTerm} 
              onChange={e => setSearchTerm(e.target.value)} 
          />
  
          {/* New Contact Form */}
          <div>
              <input 
                  type="text" 
                  placeholder="Name" 
                  value={newContact.name} 
                  onChange={e => setNewContact({ ...newContact, name: e.target.value })} 
              />
              <input 
                  type="email" 
                  placeholder="Email" 
                  value={newContact.email} 
                  onChange={e => setNewContact({ ...newContact, email: e.target.value })} 
              />
              <input 
                  type="text" 
                  placeholder="Phone" 
                  value={newContact.phone} 
                  onChange={e => setNewContact({ ...newContact, phone: e.target.value })} 
              />
              <input 
                  type="text" 
                  placeholder="Address" 
                  value={newContact.address} 
                  onChange={e => setNewContact({ ...newContact, address: e.target.value })} 
              />
              <button onClick={handleAddContact}>Add Contact</button>
          </div>
  
          {/* Contact List */}
          <ul>
              {sortedContacts.map(contact => (
                  <li key={contact._id}>
                      <span>{contact.name} - {contact.email} - {contact.phone} - {contact.address}</span>
                      <button onClick={() => handleEditContact(contact._id)}>Edit</button>
                      <button onClick={() => handleDeleteContact(contact._id)}>Delete</button>
                  </li>
              ))}
          </ul>
      </div>
  );
  
};

export default ContactsApp;
