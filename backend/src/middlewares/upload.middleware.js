const multer = require("multer");
const path = require("path");
const { FILE_LIMITS } = require("../config/constants");

// Configuración de almacenamiento
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, "../../uploads/imports");
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

// Filtro de archivos
const fileFilter = (req, file, cb) => {
  if (FILE_LIMITS.ALLOWED_TYPES.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Tipo de archivo no permitido"), false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: FILE_LIMITS.MAX_SIZE,
  },
  fileFilter: fileFilter,
});

module.exports = upload;
