const express = require("express");
const router = express.Router();
const {
  getCustomer,
  postCustomer,
  putCustomer,
  deleteCustomer,
} = require("../controllers/customer");

router.get("/:id", getCustomer);
router.post("/", postCustomer);
router.put("/:id", putCustomer);
router.delete("/:id", deleteCustomer);

module.exports = router;
