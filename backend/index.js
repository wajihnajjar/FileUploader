const express=  require("express")
const app = express();
const cors = require("cors");
const multer = require("multer");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "*" })); 
// Set up storage for uploaded files
app.use("/uploads", express.static("./uploads"));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

// Create the multer instance
const upload = multer({ storage: storage });
app.post('/upload', upload.single('file'), (req, res) => {
	// Handle the uploaded file
	res.json({ message: 'File uploaded successfully!' });
  });
  

app.listen(3000, () => {
    console.log(`Server started...`);
});