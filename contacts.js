const fs = require('fs/promises');
const path = require('path');
const contactsPath = path.join(__dirname, '/db/contacts.json');
const { nanoid } = require('nanoid');

async function listContacts() {
	// Повертає масив контактів.
	const data = await fs.readFile(contactsPath);
	return JSON.parse(data);
}

async function getContactById(contactId) {
	// Повертає об'єкт контакту з таким id. Повертає null, якщо контакт з таким id не знайдений.
	const idToString = String(contactId);
	const contactList = await listContacts();
	const contact = contactList.find((contact) => idToString === contact.id);
	return contact || null;
}

async function removeContact(contactId) {
	// Видаляє контакт. Повертає об'єкт видаленого контакту. Повертає null, якщо контакт з таким id не знайдений.
	const idToString = String(contactId);
	const contactList = await listContacts();
	const deletedContact = getContactById(contactId);
	const arr = contactList.filter((contact) => idToString !== contact.id);

	await fs.writeFile(contactsPath, JSON.stringify(arr, null, 2));

	return deletedContact;
}

async function addContact(name, email, phone) {
	// Додає контакт. Повертає об'єкт доданого контакту.
	const contacts = await listContacts();
	const phoneToSting = String(phone);
	const newContact = {
		id: nanoid(),
		name,
		email,
		phoneToSting,
	};
	contacts.push(newContact);
	await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
	return newContact;
}

module.exports = {
	listContacts,
	getContactById,
	removeContact,
	addContact,
};
