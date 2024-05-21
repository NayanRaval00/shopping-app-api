const express = require('express')
const multer = require("multer");
const fs = require("fs");
const path = require('path');
const PDFDocument = require('pdfkit');
const nodemailer = require('nodemailer');
const Student = require("../models/Students")
var publicDir = path.join(__dirname, '../public');
const router = express.Router();

const imageStorage = multer.diskStorage({
  // Destination to store image     
  destination: 'public/images',
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '_' + Date.now()
      + path.extname(file.originalname))
    // file.fieldname is name of the field (image)
    // path.extname get the uploaded file extension
  }
});
const imageUpload = multer({
  storage: imageStorage,
  limits: {
    fileSize: 1000000 // 1000000 Bytes = 1 MB
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(png|jpg)$/)) {
      // upload only png and jpg format
      return cb(new Error('Please upload a Image'))
    }
    cb(undefined, true)
  }
})

router.get('/students', async (req, res) => {
  try {
    const studentData = await Student.find()

    res.status(201).send(studentData)
  } catch (error) {
    res.status(201).send(error)
  }

});

router.get('/students/:id', async (req, res) => {
  try {
    const id = req.params.id;

    // const studentData = await Student.findOne({ _id: id })
    const studentData = await Student.findById(id)
    if (!studentData) {
      res.status(400).send("No Data found")

    } else {
      res.status(201).send(studentData)
    }

  } catch (error) {
    res.status(500).send(error)
  }

});
router.patch('/students/:id', async (req, res) => {
  try {
    const id = req.params.id;

    const studentData = await Student.findByIdAndUpdate(id, req.body, { new: true })
    res.status(201).send(studentData)

  } catch (error) {
    res.status(400).send(error)
  }

});

router.delete('/students/:id', async (req, res) => {
  try {
    const id = req.params.id;

    const studentData = await Student.findOneAndDelete({ _id: id })
    console.log(studentData);
    if (!req.params.id) {
      res.status(400).send("Please send Id...")
    }
    res.status(201).send("Successfully Delete Record...")

  } catch (error) {
    res.status(400).send(error)
  }

});
// router.post('/students', function (req, res) {
//   const student = new Student(req.body)
//   student.save(student).then(() => {
//     res.status(201).send(student)
//   }).catch((e) => {
//     res.status(201).send(e)
//   })
// });

router.post('/students', imageUpload.single('image'), async (req, res) => {
  try {
    const student = new Student(req.body)
    student.image = req.file.path;
    const createStudent = await student.save(student);
    res.status(201).send(student)
  } catch (error) {
    res.status(400).send(error)
  }
});
// image upload

router.post('/uploadImage', imageUpload.single('image'), (req, res) => {
  res.send(req.file)
}, (error, req, res, next) => {
  res.status(400).send({ error: error.message })
})
// image upload

router.get('/test-api', (req, res) => {
  res.setHeader('Content-Type', 'application/json');

  // Create a JSON object
  const data = {
    name: 'Nayan Raval',
    age: new Date().getFullYear() - 2001,
    occupation: 'Software Engineer'
  };

  // Stringify the JSON object
  const jsonData = JSON.stringify(data);

  // Send the JSON data in the response body
  return res.end(jsonData);
})


// genrate pdf
router.get('/download-pdf', (req, res) => {
  const doc = new PDFDocument();
  doc.text('Hello World');
  doc.pipe(fs.createWriteStream('output.pdf', doc));
  return doc.end();
})

// send Email
router.get('/send-email', (req, res) => {
  console.log("nayan");
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'nayanr.yourdevexpert@gmail.com',
      pass: 'Nayan|229'
    }
  });

  const mailOptions = {
    from: 'nayanr.yourdevexpert@gmail.com',
    to: 'nayan@yopmail.com',
    subject: 'Test Npde',
    text: 'Hello Nayan Node'
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
})

module.exports = router;