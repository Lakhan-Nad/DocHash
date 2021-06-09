const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator/check");
const auth = require("../middleware/auth");
const User = require("../models/User");
const File = require("../models/File");
const getFile = require("../src/blockchain/functions/accessFile");
const addFile = require("../src/blockchain/functions/createFile");
const grantAccess = require("../src/blockchain/functions/grantAccess");
const requestAccess = require("../src/blockchain/functions/requestAccess");
const deleteAccess = require("../src/blockchain/functions/deleteAccess");
const rejectAccess = require("../src/blockchain/functions/rejectAccess");
const { getIpfsURL, IPFS } = require("../src/blockchain/ipfs");
const { Buffer } = require("buffer");
const fs = require("fs");
const multer = require("multer");
const Share = require("../models/Share");
const upload = multer({ dest: "uploads/" });

// @route GET api/files
// @desc Get logged in user ///files
// @access Private

router.get("/", auth, async (req, res) => {
  try {
    const user_file = await File.find(
      { user: req.user.id },
      { filename: 1, _id: 0 }
    );
    res.json(user_file);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.get("/other", auth, async (req, res) => {
  try {
    const other_file = await Share.find(
      { user: req.user.id, status: "A" },
      { filename: 1, _id: 0 }
    );
    res.json(other_file);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.get("/noAccess", auth, async (req, res) => {
  try {
    const file = await File.find(
      { user: { $nin: [req.user.id] } },
      { filename: 1, _id: 0 }
    );
    const other_file = await Share.find(
      { user: req.user.id },
      { filename: 1, _id: 0 }
    );
    const files = file.filter(
      (val) =>
        !other_file
          .map((file) => file.filename == val.filename)
          .some((val) => val === true)
    );
    res.json(files);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.get("/requests", auth, async (req, res) => {
  try {
    let myFile = await File.find(
      { user: req.user.id },
      { filename: 1, _id: 0 }
    );
    myFile = myFile.map((file) => file.filename);
    console.log(myFile);
    const files = await Share.find(
      { status: "H", filename: { $in: myFile } },
      { filename: 1, _id: 0, user: 1 }
    );
    res.json(files);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.post("/upload", upload.single("file"), auth, async (req, res) => {
  console.log(req.user);
  let data = Buffer.from(fs.readFileSync(req.file.path));
  let { name } = req.body;
  console.log(name, req.file.path);
  IPFS.add(data, async function (err, file) {
    if (err) {
      console.log(err);
      res.status(500).end();
    } else {
      console.log(file);
      const ipfsHash = file[0].hash;
      const blockchain = addFile(req.user.account, name, ipfsHash);
      if (blockchain) {
        const newFileObj = new File({
          filename: name,
          user: req.user.id,
          ipfsHash,
        });
        await newFileObj.save();
        res.status(200).end();
      } else {
        res.status(500).send("Unable to add to blockchain");
      }
    }
  });
});

router.get("/download/:filename", auth, async (req, res) => {
  try {
    const { filename } = req.params;
    console.log(filename);
    const data = await getFile(req.user.account, filename);
    if (data === false) {
      return res.status(500).send("you can't access file");
    }
    res.status(200).send(getIpfsURL(data["1"]));
  } catch (err) {
    return res.status(500).send("internal server error");
  }
});

// @route Post api////files
// @desc Add new files
// @access Private

router.get("/request/:filename", auth, async (req, res) => {
  const { filename } = req.params;
  const blockchain = requestAccess(req.user.account, filename);
  if (blockchain) {
    const share = new Share({
      user: req.user.id,
      filename,
      status: "HOLD",
    });
    await share.save();
    return res.status(200).json(share);
  }
  res.status(500).send("Bad Request");
});

router.post("/grant/", async (req, res) => {
  const { filename, userId } = req.body;
  const share = await Share.findOne({ filename, user: userId, status: "H" });
  if (!share) {
    return res.status(500).end();
  }
  const user = await User.findById(user);
  if (!user) {
    return res.status(500).end();
  } else {
    const blockchain = grantAccess(req.user.account, filename, user.account);
    if (blockchain) {
      share.status = "A";
      await share.save();
      res.status(200).send();
    }
  }
});

router.get("/reject/:filename", async (req, res) => {});

router.get("/remove/:filename", async (req, res) => {});

module.exports = router;
