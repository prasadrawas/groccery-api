import multer from 'multer';

const multerStorage = multer.diskStorage({
  // destination: (_request, _file, callback) => {
  //   callback(null, __dirname);
  // },
  // filename: (_request, file, callback) => {
  //   callback(null, file.originalname);
  // },
});

const upload = multer({ storage: multerStorage });
export default upload;
