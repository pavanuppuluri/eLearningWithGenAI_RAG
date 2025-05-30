# eLearning With GenA And RAG

AWS Bedrock **RetrieveAPI** is a service feature designed to help you efficiently **retrieve relevant documents or data** from your own private data sources or external data repositories to use as context for foundation model queries.

### What does it do?

**Retrieves relevant documents or snippets**
  - Based on a user’s query
    - It will convert user query to Vector Embeddings,
    - Performs similarity search of that Embeddings with a Vector Database embedings and
    - Returns the result which we can say it as a Context
  - Helps **augment foundation model responses** with specific, contextually relevant information pulled from your proprietary data.
  - Acts as a **retrieval layer** that feeds the foundation model with the best-matching data from indexed or stored documents.

### Why use RetrieveAPI in AWS Bedrock?

- Foundation models like GPT or Claude are powerful but can lack **up-to-date or domain-specific knowledge**.
- RetrieveAPI allows you to **combine retrieval of your specific data** with the generation capability of the foundation model.
- This enables building applications like **context-aware chatbots, knowledge assistants, or search engines** that answer queries with precise, relevant info.

### How it works (high-level):

1. **You provide a query** to the RetrieveAPI.
2. RetrieveAPI searches your indexed data (e.g., documents, PDFs, databases).
3. It returns the most relevant pieces of data.
4. The returned data can be **passed along with the query to a foundation model** for an informed and precise answer.



