const messages = [
  {
    id: 1,
    text: "Hi there!",
    user: "Amando",
    added: new Date()
  },
  {
    id: 2,
    text: "Hello World!",
    user: "Charles",
    added: new Date()
  }
];

const getIndex = (req, res) => {
  res.render('index', { title: "Message Board", messages: messages })
}

module.exports = { getIndex }
