const { run } = require('./gemini');

module.exports = async (req, res) => {
  if (req.method === 'POST') {
    const { text } = req.body;
    console.log('Received text:', text);

    try {
      // Send text to Gemini API for evaluation
      const evaluation = await run(text);

      // Respond with the evaluation result
      res.status(200).json({ evaluation });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'An error occurred while evaluating the text.' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};
