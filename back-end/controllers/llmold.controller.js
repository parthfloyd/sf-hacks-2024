const db = require('../models/index');
const {ChatOllama} = require('@langchain/community/chat_models/ollama');
const {emailPrompt} = require('../services/prompts.service');
const { StringOutputParser } = require('@langchain/core/output_parsers');
const { loadDocsToLLM } = require('../services/document-retriever.service');


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

const testFunction2 = async (req, res) => {
    loadDocsToLLM().then((docs) => {
        
        res.json({ message: 'File uploaded successfully', filename: req.file.filename });        
    });
    const result = await emailChain.invoke({input: "what is LangSmith?"});
    res.send(result);
}


module.exports = {
    testFunction,
}