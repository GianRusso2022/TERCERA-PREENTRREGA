import { json, Router } from 'express';
import { userModel } from '../dao/models/user.model.js';
import { authenticated } from '../utils/auth.js';
import passport from "passport"

const route = Router();

route.post(
  '/login',
  passport.authenticate('login', { failureRedirect: '/api/auth/failurelogin' }),
  async (req, res) => {
    req.session.user = req.user.email;
    res.redirect("/products")
  }
);

route.post('/logout', authenticated, (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      res.status(500).send({ error: err });
    } else {
      res.redirect('/login');
    }
  });
});

route.post('/register', passport.authenticate('register', {
  failureRedirect: '/api/auth/failureregister',
}),
  async (req, res) => res.status(201).send({ message: 'User created' })
);

route.get('/failureregister', (req, res) =>
  res.send({ error: 'Error' })
);
route.get('/failurelogin', (req, res) =>
  res.send({ error: 'Password or user error' })
);

route.post('/restore-password', async (req, res) => {
  const { email, newPassword } = req.body;
  const user = await userModel.findOne({ email });
  if (!user) {
    res.status(404).send({ error: 'User not found' });
    return;
  }
  const hashedPassword = createHash(newPassword);
  await userModel.updateOne({ email }, { $set: { password: hashedPassword } });
  res.send({ message: 'Password changed' });
});

route.get("/github", passport.authenticate("github", { scope: ["user:email"] }),
  (req, res) => { }
)

route.get("/github-callback", passport.authenticate("github", { failureRedirect: "/login" }),
  (req, res) => {
    console.log(req.user);
    req.session.user = req.user
    res.redirect("/")
  })


export default route;
