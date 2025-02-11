const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost/contacts', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});


const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    address: String
});

const Contact = mongoose.model('Contact', contactSchema);


app.post('/contacts', async (req, res) => {
    const contact = new Contact(req.body);
    await contact.save();
    res.json(contact);
});


app.get('/contacts', async (req, res) => {
    const contacts = await Contact.find();
    res.json(contacts);
});


app.put('/contacts/:id', async (req, res) => {
    const contact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(contact);
});


app.delete('/contacts/:id', async (req, res) => {
    await Contact.findByIdAndDelete(req.params.id);
    res.sendStatus(204);
});

app.listen(5000, () => {
    console.log('Server running on port 5000');
});
