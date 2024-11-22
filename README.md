
### 1. GET - Liste des commentaires
- **Méthode** : GET  
- **URL** : `https://jsonplaceholder.typicode.com/comments`  
- **Paramètres** : Aucun  
- **Résultat attendu** : Liste des commentaires.

---

### 2. POST - Création d'une todo
- **Méthode** : POST  
- **URL** : `https://jsonplaceholder.typicode.com/todos`  
- **En-têtes** : `Content-Type: application/x-www-form-urlencoded`  
- **Body** :  
  - `userId: 1`  
  - `title: Test Todo`  
  - `completed: false`  
- **Résultat attendu** : Une nouvelle tâche créée.

---

### 3. PATCH - Mise à jour d’un post
- **Méthode** : PATCH  
- **URL** : `https://jsonplaceholder.typicode.com/posts/1`  
- **En-têtes** : `Content-Type: application/json`  
- **Body** :  
  ```json
  {
    "title": "Updated Title",
    "body": "Updated Body Content"
  }
  ```
---
### 4. GET - Commentaires du post ayant l’identifiant 1
- **Méthode** : GET  
- **URL** : `https://jsonplaceholder.typicode.com/posts/1/comments`  
- **Paramètres** : Aucun  
- **Résultat attendu** : Une liste des commentaires associés au post ayant `id=1`.
---
### 5. GET - Photos affiliées à l’album numéro 2
- **Méthode** : GET  
- **URL** : `https://jsonplaceholder.typicode.com/albums/2/photos`  
- **Paramètres** : Aucun  
- **Résultat attendu** : Une liste des photos associées à l’album ayant `id=2`.
