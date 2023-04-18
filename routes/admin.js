var express = require('express');
var router = express.Router();

const auth=require('../middleware/adminauth');
const bodyParser=require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:true}));

const adminController=require('../controllers/adminController');
/* GET home page. */
router.get('/',auth.isLogout,adminController.loadLogin);
router.post('/',adminController.verifyLogin);
router.get('/home',auth.isLogin,adminController.loadDashboard,adminController.adminDashboard);
router.get('/users',auth.isLogin,adminController.adminDashboard);
router.get('/products',auth.isLogin,adminController.adminProducts);
router.get('/logout',auth.isLogin,adminController.logOut);
router.get('/new-user',auth.isLogin,adminController.newUserLoad);
router.post('/new-user',adminController.addUser);
router.get('/edit-user/:id',auth.isLogin,adminController.editUserLoad);
router.post('/edit-user/',adminController.updateUser);
router.get('/delete-user/:id',auth.isLogin,adminController.deleteUser);

router.get("*",function(req,res){
  res.redirect("/admin");
})
module.exports = router;
