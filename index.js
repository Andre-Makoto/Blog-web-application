import express from 'express';
import bodyParser from 'body-parser';
import ejs from 'ejs';

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
    // Acredito que assim que requisitar POST, tenho que criar uma nova file para guardar o novo post com o seu respectivo index(posição na array).
    // Assim consigo usar method get para res.render esse novo post. 
    // Com isso podemos visualizar o post, editar o post e deletar o post.
})


app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
