const router = require('express').Router();
const { Comment, User, Post } = require('../../models');

router.get('/:id', async (req, res) => {
    //get comment through id, including the post associated with it
    try {
        const commentData = await Comment.findByPk(req.params.id, {
            include: [{
                model: User,
                attributes: ['name']
            },
            {
                model: Post,
                atrributes: ['id']
            }
            ]
        });

        if (!commentData) {
            res.status(404).json({ message: 'No comment found with this id!' });
            return;
        }

        res.status(200).json(commentData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/', async (req, res) => {
    // create a new comment
    try {
        const commentData = await Comment.create(
            {
                description: req.body.description,
                //does this connect to Post model?
                post_id: req.params.post_id
            }
        );
        res.status(200).json(commentData);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.put('/:id', (req, res) => {
    // update a comment's description by its `id` value
    Comment.update(
        {
            description: req.body.description
        },
        {
            where: {
                id: req.params.id,
            },
        }
    )
        .then((updatedComment) => {
            // Sends the updated comment as a json response
            res.json(updatedComment);
        })
        .catch((err) => res.json(err));
});

router.delete('/:id', (req, res) => {
    Comment.destroy({
        where: {
            id: req.params.id
        },
    })
        .then((deletedComment) => {
            res.json(deletedComment);
        })
        .catch((err) => res.json(err));
});

module.exports = router;  