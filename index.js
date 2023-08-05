// index.js
const argv = require('yargs').argv;

const { listContacts, getContactById, removeContact, addContact } = require('./contacts');

async function invokeAction({ action, id, name, email, phone }) {
	switch (action) {
		case 'list':
			const list = await listContacts();
			console.log(list);
			break;
		case 'get':
			// ... id
			const contact = await getContactById(id);
			console.log(contact);
			break;
		case 'add':
			// ... name email phone
			const newContact = await addContact(name, email, phone);
			console.log(newContact);
			break;
		case 'remove':
			// ... id
			const deleteContact = await removeContact(id);
			console.log(deleteContact);
			break;
		default:
			console.warn('\x1B[31m Unknown action type!');
	}
}

// invokeAction({ action: 'list' });
// invokeAction({ action: 'get', id: 'rsKkOQUi80UsgVPCcLZZW' });
// invokeAction({
// 	action: 'add',
// 	name: 'AAAAAAAAAAa',
// 	email: 'AAAAAAA@AAAAA',
// 	phone: '777777777',
// });
// invokeAction({ action: 'remove', id: 'dy_PkfgtBe_Swsdvvvw2cf_K' });

// const arr = hideBin(process.argv);
// const { argv } = yargs(arr);

invokeAction(argv);
