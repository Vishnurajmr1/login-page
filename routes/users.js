var express = require('express');
var router = express.Router();

const auth=require('../middleware/auth');
const bodyParser=require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:true}));


const userController=require('../controllers/userController');

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.render('user/login',{title:'Login-Page'});
// });

/* GET users listing. */

router.get('/signup',auth.isLogout,userController.loadRegister);
router.post('/signup',userController.insertUser);

router.get('/',auth.isLogout,userController.loginLoad);
router.get('/login',auth.isLogout,userController.loginLoad);
router.post('/login',userController.verifyLogin);
router.get('/password',(req,res,next)=>{
  res.render('user/password',{title:'Forgot-Password'});
});
router.get('/home',auth.isLogin,userController.loadHome);
router.get('/logout',auth.isLogin,userController.userLogout);






// router.get("*", function(req, res, next) {
//   if (req.originalUrl.startsWith('/admin')) {
//     res.redirect("/admin"); // Redirect to "/admin" for admin-related routes
//   } else {
//     res.redirect("/login"); // Redirect to "/login" for all other routes
//   }
// });

module.exports = router;