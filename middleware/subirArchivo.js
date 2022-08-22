const multer = require('multer')
const path = require('path')
const fs = require('fs')

const storage = multer.diskStorage({
	destination: (req, file, callback)=> {
		fs.mkdir('./public/uploads', function(err) {
			if(err && err.code !== 'EEXIST') {
				console.log(err)
			} else {
				callback(null, './public/uploads');
			}
		})
	},
	filename: (req, file, callback) =>{
		const ext = path.extname(file.originalname);
		callback(null, file.fieldname + '-' + Date.now()+ext);
	}
});


const subirArchivo = (req,res,next)=>{
	const upload = multer({
		storage : storage,
		fileFilter: (req, file, callback)=> {
			const ext = path.extname(file.originalname);
			if(ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
				return callback(new Error('Only images are allowed'))
			}
			callback(null, true)

		}

	}).single('avatar');
	upload(req,res,function(err) {
		if(err) {
			return res.end("Error uploading file.");
		}
		next()
	});
}

module.exports = subirArchivo