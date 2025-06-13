const express = require('express');
const router = express.Router();
const adminAuthController = require('../controllers/adminAuth.Controller');

router.get('/', (req, res) => {
  res.redirect('/admin/login');
});

router.get('/login', adminAuthController.formLogin);

router.post('/login', adminAuthController.login);

router.post('/logout', adminAuthController.logout);

module.exports = router;
