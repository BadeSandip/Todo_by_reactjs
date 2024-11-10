import { pool } from '../helper/db.js'
import { Router } from 'express'
// import { emptyOrRows } from '../helper/utils.js'
// import { auth } from '../helper/auth.js'
import { getTasks, postTask } from '../controllers/TaskController.js'



const router = Router()

router.get('/', getTasks)  
router.post('/create', postTask)  

// router.post('/create',(req,res,next) => {
//     if (!req.body.description) {
//         return res.status(500).json({ error: 'Description is required' });
//     }
//     pool.query('insert into task (description) values ($1) returning *',
//         [req.body.description],
//         (error, result) => {
//         if (error) {
//             return next(error)
//         }
//         return res.status(200).json({id: result.rows[0].id})
//     })
// })

router.delete('/delete/:id', (req, res, next) => {
    const id = parseInt(req.params.id, 10);

    // Validate that the 'id' is a positive integer
    if (isNaN(id) || id <= 0) {
        console.log('Invalid ID:', req.params.id);
        return res.status(500).json({ error: 'Invalid ID' });
    }

// Proceed with the deletion
pool.query('DELETE FROM task WHERE id = $1', [id], (error, result) => {
    if (error) {
        console.log('Deletion Error:', error);
        return next(error); // Handle error if the deletion fails
    }
    return res.status(200).json({ id: id }); // Successfully deleted
});
});

export default router;