const {ChatOllama} = require('@langchain/community/chat_models/ollama');
const { loadDocsToLLM } = require('../services/document-retriever.service');
const { HNSWLib } = require("@langchain/community/vectorstores/hnswlib");
const { OllamaEmbeddings } = require("@langchain/community/embeddings/ollama");
const { formatDocumentsAsString } = require("langchain/util/document");
const { StringOutputParser } = require("@langchain/core/output_parsers");
const {
  RunnablePassthrough,
  RunnableSequence,
} = require("@langchain/core/runnables");
const {
  ChatPromptTemplate,
  HumanMessagePromptTemplate,
  SystemMessagePromptTemplate,
} = require("@langchain/core/prompts");

// const outputParser = new StringOutputParser();
const chatModel = new ChatOllama({
    baseUrl: "http://localhost:11434", // Default value
    model: "llama3",
});


// //API -->
const testFunction = async (req, res) => {

    const docs = await loadDocsToLLM("");

    // Create a vector store from the documents.
    const vectorStore = await HNSWLib.fromDocuments(docs, new OllamaEmbeddings({model: "mxbai-embed-large", baseUrl: "http://localhost:11434"}));

    // Initialize a retriever wrapper around the vector store
    const vectorStoreRetriever = vectorStore.asRetriever();

    // Create a system & human prompt for the chat model
    const SYSTEM_TEMPLATE = `Use the following pieces of context to answer the question at the end.
    If you don't know the answer, just say that you don't know, don't try to make up an answer.
    ----------------
    {context}`;
    const messages = [
    SystemMessagePromptTemplate.fromTemplate(SYSTEM_TEMPLATE),
    HumanMessagePromptTemplate.fromTemplate("{question}"),
    ];
    const prompt = ChatPromptTemplate.fromMessages(messages);

    const chain = RunnableSequence.from([
    {
        context: vectorStoreRetriever.pipe(formatDocumentsAsString),
        question: new RunnablePassthrough(),
    },
    prompt,
    chatModel,
    new StringOutputParser(),
    ]);

    const answer = await chain.invoke(
    "Does Parth Panchal have any soft skills?"
    );

    res.send(answer);

}

const inquiryFunction = async (req, res) => {

  const docs = await loadDocsToLLM("main");

  // Create a vector store from the documents.
  const vectorStore = await HNSWLib.fromDocuments(docs, new OllamaEmbeddings({model: "mxbai-embed-large", baseUrl: "http://localhost:11434"}));

  // Initialize a retriever wrapper around the vector store
  const vectorStoreRetriever = vectorStore.asRetriever();

  // Create a system & human prompt for the chat model
  const SYSTEM_TEMPLATE = `Use the following pieces of context to answer the question at the end.
  If you don't know the answer, just say that you don't know, don't try to make up an answer.
  ----------------
  {context}`;
  const messages = [
  SystemMessagePromptTemplate.fromTemplate(SYSTEM_TEMPLATE),
  HumanMessagePromptTemplate.fromTemplate("{question}"),
  ];
  const prompt = ChatPromptTemplate.fromMessages(messages);

  const chain = RunnableSequence.from([
  {
      context: vectorStoreRetriever.pipe(formatDocumentsAsString),
      question: new RunnablePassthrough(),
  },
  prompt,
  chatModel,
  new StringOutputParser(),
  ]);

  const answer = await chain.invoke(
  req.query.query
  );

  res.send(answer);

}

module.exports = {
    testFunction,
    inquiryFunction
}