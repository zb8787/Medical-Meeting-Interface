const express = require('express');
const multer = require('multer');
const ejs = require('ejs');
const path = require('path');

// set storage engine
const storage = multer.diskStorage({
    destination: './public/uploads/',
    filename: function(req,file,cb){
        cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

// init upload 
const upload = multer({
    storage: storage,
    fileFilter: function(req,file,cb){
        checkFileType(file,cb);
    }
}).single('Audio');

function checkFileType(file,cb){
    const filetypes = /wav/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if (extname && mimetype){
        return cb(null,true);
    }else{
        cb('Error');
    }
}

const app = express();

app.set('view engine','ejs');

app.use(express.static('./public'));

app.get('/', (req, res) => res.render('index'));

app.post('/upload', (req,res)=>{
    //res.send('test');
    upload(req,res,(err) =>{
        if(err){
            res.render('index', {
                msg: err
            });
        }else {
            //console.log(req.file);
            //res.send('success');
            if(req.file == undefined){
                res.render('index',{
                    msg: 'no file selected'
                });
            }else{
                res.render('index',{
                    msg: 'File uploaded'
                });    
            }
        }
    });
});

const port = 3000;

app.listen(port, () => console.log(`server started on port ${port}`));
