const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);


const generateText = async (req, res) => {
  const { prompt } = req.body;



  try {
   

    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      temperature: 0.5,
      max_tokens: 1000,
     
      
    });


   // console.log(response.data.choices)

    const answer = response.data.choices[0].text;

    res.status(200).json({
      success: true,
      data: answer,
    });
  } catch (error) {
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
    } else {
      console.log(error.message);
    }

    res.status(400).json({
      success: false,
      error: 'The answer could not be generated',
    });
  }
};

module.exports = { generateText };
