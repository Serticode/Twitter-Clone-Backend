const getCustomer = (req, res) => {
  console.log("Get request called");
  res.send("getCustomer");
};

const postCustomer = (req, res) => {
  console.log("Post request called");
  res.send("postCustomer");
};

const putCustomer = (req, res) => {
  console.log("Put request called");
  res.send("putCustomer");
};

const deleteCustomer = (req, res) => {
  console.log("Delete request called");
  res.send("deleteCustomer");
};

module.exports = {
  getCustomer,
  postCustomer,
  putCustomer,
  deleteCustomer,
};
