import {Router} from 'express';
import Table from '../table';
import multer from 'multer';
import AWS from 'aws-sdk';
import multerS3 from 'multer-s3';

let blogs = new Table('blogs');
//let app = express();
let router = Router();

AWS.config.update({
    secretAccessKey: 'olEhlofD0OaD4dOhYvU/1ZgmnQB3ITQfsEvSlsCw',
    accessKeyId: 'AKIAINN3DOEWB3CYD7XA',
    region: 'us-east-1'
});

let s3 = new AWS.S3();

//use multher to upload an image to AWS
const upload = multer({
    storage: multerS3({
        s3: s3,
        acl: 'public-read',
        bucket: 'alanblogimage',
        key: function (req, file, cb) {
            console.log(file);
            cb(null, file.originalname); //use Date.now() for unique file keys
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
    console.log(req.body);
    blogs.insert(req.body)
    // .then(id => {
    //     res.json(id);
    // })
    .then((result) => {
        
        result.sendStatus(200);
    })
    .catch((err) => {
        console.log(err);
    })
    
})
//update blog blog
router.put('/:id', (req, res) => {
    console.log('updating some stuff');
    console.log(req.body);
    console.log(req.params);
    let id = req.params.id;
    blogs.update(id, req.body)
    .then((blogs) => {
        res.send(blogs)
    }).catch((err) => {
        console.log(err);
    })
    
})


//delete Blog post
router.delete('/:id', (req,res) => {
    let id = req.params.id;
    blogs.delete(id)
    .then(blogs => {
        res.json(blogs)
    })
    .catch((err) => {
        console.log(err);
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

export default router;


///////////////////////////////////////////////////////////
//code below to later reimplement users to upload photo for blog
/////////////////////////////////////////////////////////////



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
    
// });