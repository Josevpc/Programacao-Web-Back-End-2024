const LocalStrategy = require('passport-local').Strategy;

const users = [
    { id: 1, username: 'admin', password: '1234' },
    { id: 2, username: 'teste', password: 'abcd' },
  
  ];

module.exports = function (passport) {
  passport.use(new LocalStrategy(
    (username, password, done) => {
      const user = users.find(user => user.username === username);
      if (!user) {
        return done(null, false, { message: 'Usuário não encontrado' });
      }
      if (user.password !== password) {
        return done(null, false, { message: 'Senha incorreta' });
      }
      return done(null, user);
    }
  ));

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    const user = users.find(user => user.id === id);
    done(null, user);
  });
};