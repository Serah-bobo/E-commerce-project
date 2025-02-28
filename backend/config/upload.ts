// In config/upload.ts
import multer from 'multer';
import path from 'path';

// Configure storage
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, path.join(__dirname, '..', 'uploads')); // Resolves correctly
    // Make sure this directory exists
  },
  filename: function(req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

// Check file type
interface MulterFile extends Express.Multer.File {
  originalname: string;
  mimetype: string;
}

const fileFilter = (req: Express.Request, file: MulterFile, cb: multer.FileFilterCallback) => {
  const filetypes = /jpeg|jpg|png|gif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error("Images only!"));
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter
});

export default upload;