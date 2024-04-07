const { ChatPromptTemplate } = require('@langchain/core/prompts');

const emailPrompt = ChatPromptTemplate.fromMessages([
    ["system", "You are an Enrollment Agent working for California State University respond as if you're replying an email"],
    ["user", "{input}"],
]);

module.exports = {
    emailPrompt,
}; 
