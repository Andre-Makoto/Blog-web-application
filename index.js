import express from 'express';
import bodyParser from 'body-parser';
import ejs from 'ejs';
import { writeFile } from "fs/promises";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const port = 3000;
const app = express();
const posts = [];

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("index.ejs")
});

app.get("/about", (req, res) => {
    res.render("about.ejs")
});

app.get("/contact", (req, res) => {
    res.render("contact.ejs")
});

app.get("/new", (req, res) => {
    res.render("new.ejs")
});

app.get("/edit", (req, res) => {
    res.render("edit.ejs");
})

app.get("/show", (req, res) => {
    res.render("show.ejs");
})

app.post("/submit", (req, res) => {
    const title = req.body["title"];
    const text = req.body["text"];
    posts.push({title, text});
    res.render("index.ejs", {posts});

    const postData = {
        title: title,
        text: text,
        createdAt: new Date()
    }
    const filePath = path.join(__dirname, "posts", "post1.json");
    const jsonContent = JSON.stringify(postData, null, 2);

    async function saveFile() {
        try {
            await writeFile(filePath, jsonContent);
            console.log("File saved!");
        } catch (err) {
            console.log("Error: ", err)
        }   
    } 
    saveFile();
})

// Next step now is to enable the possibility to take that JSON file with the data and open the edit, view and delete.
// Probably will have to do somenthing related to the index of the post to make the path to this specific post.

app.post("", (req, res) => {

});

app.delete("", (req, res) => {

});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
