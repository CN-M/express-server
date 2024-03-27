const GET = (req, res) => {
  const { name } = req.query;

  if (name) {
    res.status(200).json({ message: `Hello, ${name}!` });
  } else {
    res.status(200).json({ message: "Hello world" });
  }
};

const POST = (req, res) => {
  const { name, occupation } = req.body;

  res.status(200).json({
    message: `Hey there, ${name}. What's it like being a ${occupation}?`,
  });
};

const PUT = (req, res) => {
  res.status(200).json({ message: "Item Updated Successfully" });
};

const DELETE = (req, res) => {
  res.status(200).json({ message: "Item Deleted Succesfully" });
};

module.exports = { GET, POST, PUT, DELETE };
