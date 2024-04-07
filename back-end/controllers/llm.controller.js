const db = require('../models/index');
const {ChatOllama} = require('@langchain/community/chat_models/ollama');
const {emailPrompt} = require('../services/prompts.service');
const { StringOutputParser } = require('@langchain/core/output_parsers');


const outputParser = new StringOutputParser();
const chatModel = new ChatOllama({
    baseUrl: "http://localhost:11434", // Default value
    model: "mistral",
});
const emailChain = emailPrompt.pipe(chatModel).pipe(outputParser);


//API -->
const testFunction = async (req, res) => {
    const result = await emailChain.invoke({input: "what is LangSmith?"});
    res.send(result);
}


module.exports = {
    testFunction,
}