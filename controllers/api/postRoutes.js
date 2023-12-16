const router = require('express').Router();
const { Post } = require('../../models');

router.post('/', async (req, res) => {
  try {
    const newPost = await Post.create({
      name: req.body.name,
      description: req.body.description,
      user_id: req.session.user_id
    });
    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const userData = await Post.findOne({
      where: {
        id: req.params.id
      }
    });
    if (userData.dataValues.user_id !== req.session.user_id){
      res.status(404).json({ message: 'User id does not match post id'});
      return;
    } else if (!userData) {
      res.status(404).json({ message: 'Post not found'});
      return;
    } else if (userData.dataValues.user_id === req.session.user_id){
      const postData = await Post.update(
        {
          name: req.body.name,
          description: req.body.description
        },
        {
          where: {
            id: req.params.id
          },
        }
      );
      res.json(postData);
    }
  } catch(err) {
    console.log(err);
    res.json(err);
  }
}
);

router.delete('/:id', async (req, res) => {
  try {
    const userData = await Post.findOne({
      where: {
        id: req.params.id
      }
    });
    if (userData.dataValues.user_id !== req.session.user_id) {
      res.status(404).json({ message: 'User id does not match poster id' });
    } else if (!userData) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    } else if (userData.dataValues.user_id === req.session.user_id) {
      const postData = await Post.destroy({
        where: {
          id: req.params.id,
          user_id: req.session.user_id,
        },
      });
      res.status(200).json(postData);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;