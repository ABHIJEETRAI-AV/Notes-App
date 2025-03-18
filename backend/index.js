const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

const user = require('./models/user.model');
const notes = require('./models/notes.model');


const url = 'mongodb+srv://Abhijeet:123server123@backend-project.bbdsw.mongodb.net/?retryWrites=true&w=majority&appName=Backend-project'
const connectDB = async (url) => {
  await mongoose.connect(url)
  console.log('Connected to MongoDB');
}
connectDB(url);

app.use(cors(
  {
    origin: '*',
    credentials: true,
  }
));
app.use(express.json());




app.post('/getNotesList', async (req, res) => {
  const user = req.body.user
  try {
    console.log(user)
    const User = await notes.find({ user: user })
    if (User) {


      res.status(200).json(User);

    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
    console.error(error);
  }
})




app.post('/title', async (req, res) => {
  try {
    await notes.create(req.body);
    res.send('Hello World');
    console.log(req.body);
  } catch (error) {
    res.status(500).send('Error creating user');
    console.error(error);
  }

})

app.post('/', async (req, res) => {

  const { name, password } = req.body
  try {
    const User = await user.findOne({ name: name });
    if (User) {


      res.status(200).json({ user: User, boolean: true });

    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
    console.error(error);
  }

})





app.post('/login', async (req, res) => {
  const { name, password } = req.body
  try {
    const User = await user.findOne({ name: name });
    if (User) {
      if (User.password === password) {

        res.status(200).json({ message: "Login Successful", user: User, boolean: true });
        console.log('login successful');
      } else {
        res.status(401).json({ message: "Invalid Credentials" });
        console.log('login failed');
      }
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
    console.error(error);
  }



})





app.post('/SignUp', async (req, res) => {
  try {
    await user.create(req.body);
    res.send('Hello World');
    console.log(req.body);
  } catch (error) {
    res.status(500).send('Error creating user');
    console.error(error);
  }
})


app.delete('/delete', async (req, res) => {
const { id } = req.body; // Extract the ID from the request body
if (!mongoose.Types.ObjectId.isValid(id)) {
  return res.status(400).json({ message: 'Invalid ID format' });
}
console.log(JSON.stringify(id))
  try {
    const deletedDocument = await notes.findByIdAndDelete( id);

    if (deletedDocument) {
      return res.status(404).json({ message: 'Document not found' });
    }

    res.status(200).json({ message: 'Document deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting the document', error });
  }
});

app.post('/getNoteContent', async (req, res) => {

  const id  = req.body.user
  console.log(id) 
  try {
    const User = await notes.findOne({ _id: id });
    if (User) {


      res.status(200).json({ user: User, boolean: true });

    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
    console.error(error);
  }

})

app.put('/updateNote', async (req, res) => {
  const { content, id } = req.body; 
  console.log(req.body)// Extract the ID from the request body
  console.log(content)// Extract the ID from the request body
  try {
    const updatedDocument = await notes.findByIdAndUpdate(
       id , // The ID of the document to update
      {content: content}, // The updated data
      // { new: true, runValidators: true } // Options: return the updated document and validate
    );

    if (!updatedDocument) {
      return res.status(404).json({ message: 'Document not found' });
    }

    res.status(200).json(updatedDocument);
  } catch (error) {
    res.status(500).json({ message: 'Error updating the document', error });
  }
  });

app.listen(3000, () => {
  console.log('Server is running on https://notes-app-ten-livid.vercel.app');
});