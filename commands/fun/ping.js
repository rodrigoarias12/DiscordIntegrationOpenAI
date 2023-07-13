const { SlashCommandBuilder } = require('discord.js');
const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();
const configuration = new Configuration({
	apiKey: process.env.OPENAI_API_KEY,
  });
const openai = new OpenAIApi(configuration);

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),
	async execute(interaction) {
	console.log("primer intento");
		const chat = await fetchChatHistory(interaction.channel);
    const summary = await generateSummary(chat);
		await interaction.reply(summary);
	},
};


async function fetchChatHistory(channel) {
	const messages = await channel.messages.fetch({ limit: 100 });
	const chat = messages.map((message) => message.content).join('\n');
  
	return chat;
  }
  async function generateSummary(chat) {
	try {  const response = await openai.listModels();

		const completion = await openai.createCompletion(
			{model: "text-davinci-003",
			prompt: "Say this is a test",
			temperature: 0,
			max_tokens: 7,
			},
			{
			  timeout: 1000,
			  headers: {
				"Example-Header": "example",
			  },
			}
		  );
		//console.log(completion.data.choices[0].text);
		const summary = completion.data.choices[0].text.trim();
		return summary;
	  } catch (error) {
		console.log(error.response.data);
		console.log(error.message);
		return "errror";
		if (error.response) {
		  console.log(error.response.status);
		  console.log(v);
		  return error.response.data;
		} else {
		  console.log(error.message);
		  return "error"+ error.message;
		}
	  }
	
  
	
  }