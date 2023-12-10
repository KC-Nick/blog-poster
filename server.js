const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const User = require('./models/User.js');

const routes = require('./controllers');
const sequelize = require('./config/connection');
const helpers = require('./utils/helpers.js');

const app = express();
const PORT = process.env.PORT || 3001;

const sess = {
  //CHANGE before turning in
  secret: 'Super secret secret',
  cookie: {
    maxAge: 1 * 30 * 60 * 1000, //2 hours
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

const hbs = exphbs.create({ 
  helpers
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  if (req.session.user) {
    // Update the last activity timestamp
    User.update(
      { last_activity: new Date() },
      { where: { id: req.session.user.id } }
    );
  }
  next();
});

app.use((req, res, next) => {
  if (req.session.user && req.session.user.last_activity) {
    const currentTime = new Date();
    const lastActivityTime = new Date(req.session.user.last_activity);
    const sessionTimeout = 1 * 30 * 60 * 1000; // 2 hours in milliseconds

    if (currentTime - lastActivityTime > sessionTimeout) {
      // Clear the session and redirect to the login page
      req.session.destroy();
      return res.redirect('/login');
    }
  }
  next();
});

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});