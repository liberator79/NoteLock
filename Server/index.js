const express = require("express");
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const bcrypt = require('bcrypt');
const User = require('./models/User');
const jwt = require("jsonwebtoken")
const Passwords = require("./models/Passwords")
const Notes = require("./models/Notes")
const { secret } = require("./keys")
const auth = require("./middleware/auth")
const cors = require("cors")
const app = express();
app.use(bodyParser.json())
app.use(cors())
const createToken = (savedUser) => {
    return jwt.sign({ _id: savedUser._id }, secret)
}
app.post("/signup", async (req, res) => {
    try {
        const { email, name, password } = req.body;
        const salt = await bcrypt.genSalt(10);
        const newpassword = await bcrypt.hash(password, salt);
        const newUser = new User({
            email,
            name,
            "password": newpassword,
        });
        const savedUser = await newUser.save();
        const token = createToken(savedUser)
        res.status(201).json({ token })
    } catch (err) {
        res.status(400).send({ error: err.message })
    }
})
app.post("/notes", auth, async (req, res) => {
    const { title, text } = req.body;
    try {
        const newNotes = new Notes({
            title,
            text,
            userId: req.user,
        })
        await newNotes.save()
        res.json(newNotes)
    } catch (err) {
        res.json({ error: err.message })
    }
})
app.post("/passwords", auth, async (req, res) => {
    const { title, password } = req.body;
    const newNotes = new Passwords({
        title,
        password,
        userId: req.user,
    })
    await newNotes.save()
    res.send("Sucess");
})
app.get("/notes", auth, async (req, res) => {

    const notes = await Notes.find({ userId: req.user._id });

    res.json(notes)
})
app.get("/notes/:id", auth, async (req, res) => {
    try {
        const { id } = req.params;
        const note = await Notes.findById(id);
        if (!note) {
            return res.status(404).json({ message: "Note not found" });
        }
        res.json(note);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});
app.post("/signin", async (req, res) => {
    try {
        const { email, password } = req.body
        const savedUser = await User.findOne({ email })
        if (!savedUser) { throw new Error("Invalid data") }
        const match = await bcrypt.compare(password, savedUser.password)
        if (!match) { throw new Error("Invalid data"); }
        const token = createToken(savedUser)
        res.status(200).json({ token });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
})

app.put('/notes/:id', auth, async (req, res) => {
    const { id } = req.params;
    const { title, text } = req.body;
    try {
        const updatedItem = await Notes.findByIdAndUpdate(
            id,
            { title, text },
            { new: true }
        )
        if (!updatedItem) {
            return res.status(404).json({ message: 'Item not found' });
        }
        res.json(updatedItem);
    }
    catch {
        res.status(500).json({ message: 'Internal server error' });
    }
    
});





app.delete("/notes/:id", auth, async (req, res) => {
    try{
        const {id} = req.params;
        const result = await Notes.findByIdAndDelete(id);
        if(!result){
            res.status(404).send({message : "Notes not found"});
        }
        res.send({message : "deleted successfully"});
    }catch(e){
        res.status(500).send({ message: 'Error deleting notes', error })
    }
})


const connectToDB = () => {
    mongoose.connect("mongodb://localhost:27017/NoteLock")
        .then(() => {
            app.listen(3000, () => { connectToDB });
            console.log("Server and databse started")
        })
        .catch(err => {
            console.log(err);
        })
}
connectToDB();