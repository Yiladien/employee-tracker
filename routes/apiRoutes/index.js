const express = require("express");
const router = express.Router();

router.use(require("./departments"));
router.use(require("./roles"));
router.use(require("./employees"));

module.exports = router;
