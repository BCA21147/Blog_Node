var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var { AddAdmin, GetAdmin, UpdateStatusAdmin, UpdateAdmin, DeleteAdmin, UpdateAdmin, GetSingleAdmin, SearchAdmin } = require('../controller/admin/AddAdmin');
var { AddCatagory, GetCatagory, UpdateStatusCatagory, DeleteCatagory, GetSingleCatagory, UpdateCatagory, SearchCatagory } = require('../controller/admin/AddCatagory');
var { AddBlog, GetBlog, UpdateStatusBlog, DeleteBlog, GetSingleBlog, UpdateBlog, SearchBlog } = require('../controller/admin/AddBlog');
const { GetComment, UpdateStatusComment, DeleteComment, SearchComment } = require('../controller/admin/AddComment');
const { CheckAdmin } = require('../controller/admin/CheckAdmin');
const { Cookie } = require('express-session');
const cookieParser = require('cookie-parser');
const DB = require('../database/DB');


const VerifyToken = (req, res, next) => {

    // console.log("Verify :- " + req.headers.authorization);

    // console.log(jwt.decode(req.headers.authorization));

    // jwt.verify(req.header.authorization, "Krishna123", function (err, decoded) {
    //     if (err) {
    //         console.log(err);
    //     }
    //     else {
    //         console.log(decoded);
    //     }
    // });

    jwt.verify(req.headers.authorization, 'Krishna@123', function (err, decoded) {
        if (err) {
            console.log("Token Expires..!");
            res.status(200).json({
                data:[],
                Token:"Expire"
            });
        }
        else {
            // console.log(decoded) // bar
            next();
        }
    });

}

router.post('/check_admin', CheckAdmin);
router.get('/setDefaultDB',VerifyToken, DB);

router.post('/add_admin',VerifyToken, AddAdmin);
router.get('/get_admin', VerifyToken, GetAdmin);
router.get('/update_status_admin/:id/:status',VerifyToken, UpdateStatusAdmin);
router.get('/get_single_admin/:id',VerifyToken, GetSingleAdmin);
router.post('/update_admin/:id',VerifyToken, UpdateAdmin);
router.get('/delete_admin/:id',VerifyToken, DeleteAdmin);
router.get('/search_admin/:value',VerifyToken, SearchAdmin);

router.post('/add_catagory',VerifyToken, AddCatagory);
router.get('/get_catagory',VerifyToken, GetCatagory);
router.get('/update_status_catagory/:id/:status',VerifyToken, UpdateStatusCatagory);
router.get('/delete_catagory/:id',VerifyToken, DeleteCatagory);
router.get('/get_single_catagory/:id',VerifyToken, GetSingleCatagory);
router.post('/update_catagory/:id',VerifyToken, UpdateCatagory);
router.get('/search_catagory/:value',VerifyToken, SearchCatagory);


router.post('/add_blog',VerifyToken, AddBlog);
router.get('/get_blog',VerifyToken, GetBlog);
router.get('/update_status_blog/:id/:status',VerifyToken, UpdateStatusBlog);
router.get('/delete_blog/:id',VerifyToken, DeleteBlog);
router.get('/get_single_blog/:id',VerifyToken, GetSingleBlog);
router.post('/update_blog/:id',VerifyToken, UpdateBlog);
router.get('/search_blog/:value',VerifyToken, SearchBlog);

router.get('/get_comment',VerifyToken, GetComment);
router.get('/update_status_comment/:id/:status',VerifyToken, UpdateStatusComment);
router.get('/delete_comment/:id',VerifyToken, DeleteComment);
router.get('/search_comment/:value',VerifyToken, SearchComment);

module.exports = router;
