const router = require('express').Router();
const { Comment, User, Post } = require('../../models');

router.post('/', async (req, res) => {
    // create a new comment
    try {
        const commentData = await Comment.create(
            {
                description: req.body.description,
                post_id: req.body.post_id,
                user_id: req.session.user_id
            }
        );
        console.log(req.session);
        res.status(200).json(commentData);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.put('/:id', async (req, res) => {
//get user of comment id
try {
    const userData = await Comment.findOne({
        where: {
            id: req.params.id
        }
    });
    if (userData.dataValues.user_id !== req.session.user_id) {
        res.status(404).json({ message: 'User id does not match post'})
    } else if (!userData) {
        res.status(404).json({ message: 'Post not found'})
    } else if (userData.dataValues.user_id === req.session.user_id) {
        const commentData = await Comment.update(
            {
                description: req.body.description
            },
            {
                where: {
                    id: req.params.id
                }
            }
        );
        res.json(commentData);
    }
} catch(err) {
    console.log(err);
    res.json(err);
}
});

router.delete('/:id', async (req, res) => {
    try {
        const userData = await Comment.findOne({
            where:{
                id:req.params.id
            }
        });
        if (userData.dataValues.user_id !== req.session.user_id) {
            res.status(404).json({ message: 'User id does not match comment'});
        } else if (!userData) {
            res.status(404).json({ message: 'No comment found' });
        } else if (userData.dataValues.user_id === req.session.user_id) {
            const commentData = await Comment.destroy({
                where: {
                    id: req.params.id,
                    user_id: req.session.user_id
                },
            });
            res.status(200).json(commentData);
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;  