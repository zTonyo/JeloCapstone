const multer = require("multer");
const fs = require('fs')
const path = require("path");

const getStorage = (subfolder) => {
    return multer.diskStorage({
      destination: (req, file, cb) => {
        const uploadPath = path.resolve(__dirname, '..', '..', 'client-vite', 'src', 'assets', subfolder);
  
        if (!fs.existsSync(uploadPath)) {
          fs.mkdirSync(uploadPath, { recursive: true });
        }
        cb(null, uploadPath); 
      },
      filename: (req, file, cb) => {
        const fileExtension = path.extname(file.originalname); 
        const fileName = Date.now() + fileExtension;
        console.log('Saving file:', fileName);
        cb(null, fileName);
      },
    });
  };
  
  exports.upload = (subfolder) => multer({ storage: getStorage(subfolder) });