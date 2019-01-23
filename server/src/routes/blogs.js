import {Router} from 'express';
import Table from '../table';
import multer from 'multer';
import AWS from 'aws-sdk';
import multerS3 from 'multer-s3';
import { config } from '../config/index';

let blogs = new Table('blogs');
const tagsTable = new Table('tags');
const blogTagTable = new Table('blogtags');
const imagesTable = new Table('images');

let router = Router();

AWS.config.update({
    secretAccessKey: config.AWS_SECRET_ACCESS_KEY,
    accessKeyId: config.AWS_ACCESS_KEY_ID,
    region: 'ca-central-1',
    maxRetries: 15
});

let s3 = new AWS.S3();

let upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: config.AWS_S3_BUCKET_NAME,
        contentType: multerS3.AUTO_CONTENT_TYPE,
        cacheControl: 'max-age=31536000',
        key: function (req, file, cb) {
            console.log('logging the file');
            console.log(file);
            cb(null, Date.now() + '.jpg')
        }
    })
});

//get all blogs
router.get('/', (req, res) => {
    blogs.getAll()
    .then(blogs => {
        res.json(blogs);
    })
});

//get single blog
router.get('/:id', (req, res) => {
    let id = req.params.id;
    blogs.getOne(id)
    .then(blogs => {
        res.json(blogs);
    }).catch((err) => {
        console.log(err);
    })
});

//save Blog Post
router.post('/', upload.single('selectedFile'), (req, res) => {
    let filePath = req.file.location;
    let blogid = '';
    let tagids = [];

    const blogPost = {
        userid: req.body.id,
        title: req.body.title,
        content: req.body.content
    };

    blogsTable.insert(blogPost)
        .then((blog) => {
            blogid = blog.id;
            insertTags(req.body.tags, blogid);
            insertImage(filePath, blogid);
            res.sendStatus(200);
        }).catch((err) => {
            console.log(err);
            res.sendStatus(500);
        });
});

//update blog post
router.put('/:id', (req, res) => {
    const updateBlog = {
        title: req.body.title,
        content: req.body.content
    };

    blogsTable.update(req.params.id, updateBlog)
        .then(() => {
            updateTags(req.body.tagid, req.body.tags);
            res.sendStatus(200);
        }).catch((err) => {
            console.log(err);
            res.sendStatus(500);
        });
});

//old way
// router.put('/:id', (req, res) => {
//     console.log('updating some stuff');
//     console.log(req.body);
//     console.log(req.params);
//     let id = req.params.id;
//     blogs.update(id, req.body)
//     .then((blogs) => {
//         res.send(blogs)
//     }).catch((err) => {
//         console.log(err);
//     }) 
// })

//delete Blog post
router.delete('/:id', (req,res) => {
    let id = req.params.id;
    blogs.delete(id)
    .then(blogs => {
        res.json(blogs)
    })
    .catch((err) => {
        console.log(err);
        res.sendStatus(500);
    })
});

router.get('/create', (req,res) => {
    let blog = {
        title: 'First Input from web',
        content: 'I sent this using express'
    }
    blogs.insert(blog)
    .then(id => {
        res.json(id);
    })

})

//create tag
function insertTags(tags, blogid) {
    return new Promise((resolve, reject) => {
        const blogTag = { name: tags, blogid: blogid };
        tagsTable.insert(blogTag)
            .then((result) => {
                return result;
            }).then((result) => {
                return blogTagTable.insert({ blogid, tagid: result.id });
            }).then((result) => {
                resolve('success');
            }).catch((err) => {
                console.log(err);
                reject(err);
            });
    })
};

function updateTags(tagid, tags) {
    tagsTable.update(tagid, { name: tags })
        .then(() => {
            return 'success';
        }).catch((err) => {
            return err;
        })
}

//insert image 
function insertImage(filePath, blogid) {
    return imagesTable.insert({ file: filePath, blogid: blogid })
        .then((result) => {
            return result;
        }).catch((err) => {
            console.log(err);
            return err;
        });
}


export default router;


///////////////////////////////////////////////////////////
//code below to later reimplement users to upload photo for blog
/////////////////////////////////////////////////////////////
//old save blog post 
// router.post('/', (req, res) => {
//     // router.post('/', upload.single('image'), (req,res,next) => {
//     //res.send("Uploaded!");
//     //console.log('req body ');
//    // console.log('req.body is ' +req.body);
//     //req.file = req.body.image;
//     // console.log('req file ' + req.file);
//     // console.log('req file location ' + req.file.location);
//    // req.body.image = req.file.buffer;
//     //console.log('router.put uri: ' + req.params.uri);
//     //console.log('router.put location: ' + req.file.location);
//     //console.log('creating a blog post');
//     //let file = req.file;
//     // let photo = {uri: req.file.location};
//     // req.body.image = photo;
//     //console.log('photo ' + photo);
//     //console.log(req.body);
//     //req.body.image = req.file.location;
//     console.log(req.body);
//     blogs.insert(req.body)
//     // .then(id => {
//     //     res.json(id);
//     // })
//     .then((result) => {
        
//         result.sendStatus(200);
//     })
//     .catch((err) => {
//         console.log(err);
//     })
    
// })

// AWS.config.update({
//     secretAccessKey: 'olEhlofD0OaD4dOhYvU/1ZgmnQB3ITQfsEvSlsCw',
//     accessKeyId: 'AKIAINN3DOEWB3CYD7XA',
//     region: 'us-east-1'
// });

//use multher to upload an image to AWS
// const upload = multer({
//     storage: multerS3({
//         s3: s3,
//         acl: 'public-read',
//         bucket: 'alanblogimage',
//         key: function (req, file, cb) {
//             console.log(file);
//             cb(null, file.originalname); //use Date.now() for unique file keys
//         }
//     })
// });

router.post('/', (req, res) => {
    // router.post('/', upload.single('image'), (req,res,next) => {
    //res.send("Uploaded!");
    //console.log('req body ');
   // console.log('req.body is ' +req.body);
    //req.file = req.body.image;
    // console.log('req file ' + req.file);
    // console.log('req file location ' + req.file.location);
   // req.body.image = req.file.buffer;
    //console.log('router.put uri: ' + req.params.uri);
    //console.log('router.put location: ' + req.file.location);
    //console.log('creating a blog post');
    //let file = req.file;
    // let photo = {uri: req.file.location};
    // req.body.image = photo;
    //console.log('photo ' + photo);
    //console.log(req.body);
    //req.body.image = req.file.location;


//app.use(bodyParser.json());
// let upload = multer({
//     storage: multerS3({
//         s3,
//         bucket: 'alanblogimage',
//         acl: 'public-read',
//         ContentType: multerS3.AUTO_CONTENT_TYPE,
//         //contentDisposition: 'attachment',
//         // ContentType: 'image/jpeg',
//         // metadata: function (req, file, cb) {
//         //     cb(null, { fieldName: file.fieldname });
//         // },
//         key: function (req, file, cb) {
//             cb(null, Date.now() + '.jpg')
//             //cb(null, Date.now().toString())
//         }
//     })
// });

//store all files in this place
//const upload = multer({storage: storage});
//const upload = multer({dest: storage});

//to save stuff to disk
// const multerConf = {
//     storage: multer.diskStorage({
//         destination: function(req,file,cb) {
//             cb(null, './uploads')
//         },
//         filename: function(req, file, cb) {
//             const ext = file.mimetype.split('/')[1];
//             cb(null, file.fieldname + '-' + Date.now() + '.'+ext);
//         }
//     }),
//     fileFilter: function(req, file, next) {
//         if(!file){
//             next();
//         }
//         const image = file.mimetype.startsWith('image/');
//         if(image){
//             next(null, true);
//         }else {
//             next({message: "file type not supported"}, false);
//         }
//     }
// };
//to save stuff to memory and send in buffer 
//let storage = multer.memoryStorage();
//let upload = multer({ dest: 'uploads/' });

//if saving to file
// router.post('/', multer(multerConf).single('blogImage'), (req,res) => {
//     console.log(req.file);
//     if(req.file) {
//         req.body.blogimage = req.file.fieldname;
//     }
//     console.log('creating a blog post');
//     console.log(req.body);
//     blogs.insert(req.body)
//     .then(id => {
//         res.json(id);
//     })
//     .catch((err) => {
//         console.log(err);
//     })
    
// })
// 