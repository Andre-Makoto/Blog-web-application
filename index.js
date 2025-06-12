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

    const postData = {
        title: title,
        text: text,
    }
    const index = posts.length;
    posts.push(postData);
    
    res.render("index.ejs", {posts});

    const filePath = path.join(__dirname, "posts", `post${index}.json`);
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

// Each post is now taking place of the first post, which is not making it possible to make multiple posts.
// Now I have to save each post with a new file name so that it dont get replaced.
// Next step now is to enable the possibility to take that JSON file with the data and open the edit, view and delete.
// Probably will have to do somenthing related to the index of the post to make the path to this specific post.
// After that we need to check if everything is working.
// When everthing works we do the styling.
// Check if it is responsive with mobile. 


app.post("", (req, res) => {

});

app.delete("", (req, res) => {

});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
