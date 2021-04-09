var express = require('express')
var http = require('http')
var path = require('path')
var app = express();
var bodyParser=require("body-parser");
var user = require('./routes/user');
var banner = require('./routes/banner');
var school = require('./routes/school');
var product = require('./routes/product');
var category = require('./routes/category');
var wishlist = require('./routes/wishlist');
var rating = require('./routes/rating');
var cart = require('./routes/cart')
var address = require('./routes/address');
var multer = require('multer'); 
const DIR = './uploads';
var crypto = require('crypto');
var order = require('./routes/order');
var check = require('./routes/checkout');
var productcount = require('./routes/productcount');


let storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, DIR);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname );
  }
});

let upload = multer({ storage: storage });

var mssql    = require('mssql');
var connection = {
    server: 'sql5059.site4now.net',
    user: 'DB_A3CE37_v2school_admin',
    password: 'School@123',
    database : 'DB_A3CE37_v2school',
    options: {
        enableArithAbort: false
      }
};


mssql.connect(connection,function(err,result) {
if(err)
console.log(err);
else
console.log("result");
});
global.db = mssql;
global.conn = connection;


app.set('hostname', process.env.Host ||'0.0.0.0');
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use('/resources',express.static(__dirname + '/uploads'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
	  res.header("Access-Control-Allow-Origin", "*");
	  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	  next();
});

http.createServer(app).listen(app.get('port'),app.get('hostname'), function(){
  console.log('Express server listening on host '+app.get('hostname')+' and port ' + app.get('port'));
});

var router = express.Router();
app.get('', function (req, res) {
    res.send('this is the main Page');
});

app.use('/api/eSchool', router);
router.get('', function (req, res) {
    res.send('This is the second page');
});

router.post('/User/signUp',user.signup);
router.post('/User/login',user.login);
router.post('/User/forgetPasswordGetOtp',user.forgetPasswordGetOtp);
router.post('/User/forgetPassword',user.forgetPassword);
router.post('/User/otpAuth',user.otpAuth);
router.post('/User/resendOtp',user.resendOtp);
router.post('/User/checkRegistration',user.checkRegistration);
router.post('/User/updateProfile',user.updateProfile);
router.post('/User/changePassword',user.changePassword);
router.get('/User/deceitSlashUser',user.deceitSlashUser);

router.get('/Banner/bannerList',banner.bannerList);
router.get('/School/schoolList',school.schoolList);
router.get('/Category/categoryList',category.categoryList);
router.post('/Product/ProductListBySchool',product.productListBySchool);
router.post('/Product/productListByCategory',product.productListByCategory);

router.post('/WishList/addWishList',wishlist.addWishList);
router.post('/WishList/wishlistProducts',wishlist.wishlistProducts);
router.post('/WishList/deleteWishlistProduct',wishlist.deleteWishlistProduct);

router.post('/Rating/setRateReview',rating.setRateReview);
router.post('/Rating/getRateReview',rating.getRateReview);
router.post('/Rating/getProductReviews',rating.getProductReviews);
router.post('/Rating/getProductReviewsCount',rating.getProductReviewsCount);

router.post('/Cart/addPackageCount',cart.addPackageCount);
router.post('/Cart/getCartList',cart.getCart);
router.post('/Cart/getCartCount',cart.getCartCount);
router.post('/Cart/removeProductCart',cart.removeProductCart);

router.post('/Address/addressList',address.addressList);
router.post('/Address/addAddress',address.addAddress);
router.post('/Address/editAddress',address.editAddress);
router.post('/Address/deleteAddress',address.deleteAddress);

router.post('/order/orderhistory',order.orderhistory);
router.post('/check/checkout',check.checkout);
router.post('/check/OrderList',check.OrderList);


router.post('/productcount/productcount',order.productcount);


 
router.post('/Payment/getHash',(req,res)=>{
  var key = req.body.key
 //var merchantId = req.merchantId;
  var txnid = req.body.txnid
  var amount = req.body.amount
 // var surl = req.surl
 // var furl = req.furl
  var productInfo = req.body.productInfo
  var email = req.body.email
  var firstName = req.body.firstName
 //var phone = req.phone
  var salt = '5bgleeC5rj'

  var cryp = crypto.createHash('sha512');
  var text = key+'|'+txnid+'|'+amount+'|'+productInfo+'|'+firstName+'|'+email+'|||||||||||'+salt;
  
  cryp.update(text);
  var hash = cryp.digest('hex');
  res.send({
    "status": "1",
    "message": "Hash",
    "hash": hash
  })
})

router.post('/Payment/UpdateStatus',(req,res)=>{
  
  var key = req.productinfo
  var txnid = req.txnid
  var amount = req.status
  
  request.input('ActionType', db.NVarChar(50), 'getProductReviewsCount');
  request.input('pid', db.NVarChar(50), req.body.pid);
  request.execute('prcratingreview', function (error, results){
    res.send({
      "status": "1",
      "message": "Hash",
      "hash": hash
  })
  });
});
