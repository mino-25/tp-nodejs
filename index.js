//TP 1 Amine MAHI


const express = require("express");
const {Pool} = require("pg"); 
require("dotenv").config();  

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());


const pool = new Pool({
    user: process.env.DATABASE_USER,
    host: process.env.DATABASE_HOST,
    database: process.env.DATABASE_NAME,
    password: process.env.DATABASE_PASSWORD,
    port: process.env.DATABASE_PORT,
});


pool.query(` CREATE TABLE IF NOT EXISTS articles ( 
    id SERIAL PRIMARY KEY, 
    title TEXT,
    content TEXT, 
    author TEXT 
    ) 
`)

.then(() => console.log('Table articles créée ou déjà existante'))
.catch(err => console.error(`Erreur lors de la création de la table: ${err}.`));


app.post("/articles", async (req, res) => {
    try {
        const {title, content, author} = req.body
        const result = await pool.query("INSERT INTO articles(title, content, author) VALUES($1, $2, $3) RETURNING *", [title, content, author]);
        res.status(201).json(result.rows[0])
    } catch (error) {
        console.error(err);
        res.status(500).json({
            message : "Erreur lors de la création de l'article."
        });
    }
})

app.get("/articles", async (req, res) => {
    try{
      const result = await pool.query("SELECT * FROM articles ORDER BY id ASC");
  
      if(result.rows.length <= 0 || !result.rows){
        throw new Error("La table articles est vide ou inexistante.");
      }
  
      res.send(`Liste des articles : ${JSON.stringify(result.rows)}`);
  
    }catch(err){
      res.status(500).json({
        "message": `Une erreur s'est produite lors de la tentative de récupération des données de la table articles: ${err}.`
      });
    }
});

app.patch("/articles/edit/title", async (req,res) => {
    try{
  
      const {id, title} = req.body;
  
      const result = pool.query("UPDATE users SET title=$2 WHERE id=$1", [id, title]);
  
      res.status(200).json({
        message: "Le titre de l'article a été modifié.",
        result: result
      });
  
    }catch(err){
      res.status(500).json({
        message: `Une erreur s'est produite lors de la mise à jour du titre de l'article : ${err}`
      });
    }
});  

app.delete("/articles/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query("DELETE FROM articles WHERE id = $1 RETURNING *", [id]);

        if (result.rowCount === 0) {
            return res.status(404).json({
                message: "Aucun article trouvé avec cet ID."
            });
        }
        res.status(200).json({
            message: "L'article a été supprimé avec succès.",
            deletedArticle: result.rows[0]
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: `Erreur lors de la suppression de l'article : ${err}`
        });
    }
});


app.listen(port, () => console.log(`Le serveur écoute le port ${port}.`));