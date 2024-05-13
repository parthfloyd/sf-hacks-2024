const { DirectoryLoader } = require("langchain/document_loaders/fs/directory");
const { TextLoader } = require("langchain/document_loaders/fs/text");
const { CSVLoader } = require("langchain/document_loaders/fs/csv");
const { PDFLoader } = require("langchain/document_loaders/fs/pdf");

const {
    JSONLoader,
    JSONLinesLoader,
} = require("langchain/document_loaders/fs/json");



const loadDocsToLLM = async (folder) => {
    const loader = new DirectoryLoader(
        "uploads/" + folder,
        {
            ".json": (path) => new JSONLoader(path, "/texts"),
            ".jsonl": (path) => new JSONLinesLoader(path, "/html"),
            ".txt": (path) => new TextLoader(path),
            ".csv": (path) => new CSVLoader(path, "text"),
            ".pdf": (path) => new PDFLoader(path),
        }
    );

    const docs = await loader.load();
    console.log("Loaded documents", docs.length);
    return docs;
}

module.exports = { loadDocsToLLM };
