require("dotenv").config();
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
async function fetchChatHistory() {
const response = await openai.createCompletion({
  model: "text-ada-001",
  prompt: "hola",
  temperature: 0,
  max_tokens: 100,
  top_p: 1,
  frequency_penalty: 0.0,
  presence_penalty: 0.0,
  stop: ["\n"],
});
console.log(response.data.choices[0].text);

}
fetchChatHistory();