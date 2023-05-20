var express = require('express');
var router = express.Router();
const { Get_All_Catagory, Search_Catagory } = require('../controller/user/Catagory');
const { Get_All_Blog, Get_Blog_Catagory, Get_Single_Catagory, Get_Single_Blog, Get_Top_5_Blog, Get_Latest_5_Blog, Get_Catagory_Id, Search_Blog, SingleBlogNextBtn, SingleBlogPrevBtn } = require('../controller/user/Blog');
const { AddComment, GetComment } = require('../controller/user/Comment');

router.get('/get_all_catagory', Get_All_Catagory);
router.get('/get_single_catagory/:catagory', Get_Single_Catagory);
router.get('/get_all_blog', Get_All_Blog);
router.get('/get_single_blog/:blog', Get_Single_Blog);
router.get('/get_top_5_blog', Get_Top_5_Blog);
router.get('/get_latest_5_blog', Get_Latest_5_Blog);
router.get('/get_blog_catagory', Get_Blog_Catagory);
router.get('/get_catagory_id/:blog', Get_Catagory_Id);

router.post('/add_comment/:id', AddComment);
router.get('/get_comment', GetComment);

router.get('/search_catagory/:value',Search_Catagory);
router.get('/search_blog/:id/:value',Search_Blog);

router.get('/single_blog/next_btn/:id',SingleBlogNextBtn);
router.get('/single_blog/prev_btn/:id',SingleBlogPrevBtn);

module.exports = router;
