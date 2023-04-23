# ICI MES CHOIX TECHNIQUES

- L'ajout et la suppression de tags dans les tâches se fait directement dans le contexte des tâches, au lieu de créer un nouveau contexte m-to-n tag-task.

- Pour ajouter un tag à une tâche, on utilise l'url api/task/{TASK_ID}/tag/{TAG_ID}
- Pour le retirer, on utilise le même url avec -tag à la place de tag
