# eLearning With GenA And RAG

## What is RetrieveAPI ?
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


<img width="1462" alt="image" src="https://github.com/user-attachments/assets/f5dbf252-5c4a-4631-b244-40c6868f030f" />

---

## What is RetrieveAndGenerateAPI? 

AWS Bedrock **RetrieveAndGenerateAPI** is a higher-level API that **combines retrieval and generation into a single step**, enabling you to build intelligent applications that automatically pull relevant information from your data and generate responses using a foundation model.

### What does it do?

- **Automatically retrieves relevant data** from your configured knowledge base (documents, repositories, etc.).
- **Passes that data as context** to a foundation model.
- **Generates a final response** using the foundation model, grounded in the retrieved data.
- Simplifies the Retrieval-Augmented Generation (RAG) pattern by handling both steps internally.

### Why use RetrieveAndGenerateAPI in AWS Bedrock?

- You don’t need to **manually orchestrate retrieval + generation** — it's done in one API call.
- Ideal for building **intelligent assistants, chatbots, and Q&A systems** that need to reason over private or enterprise-specific data.
- Supports **multi-modal data sources** like PDFs, web pages, or structured content in vector stores.

### How it works (high-level):

1. **You send a query** to the RetrieveAndGenerateAPI.
2. The API retrieves relevant information from your **Bedrock knowledge base**.
3. It automatically passes the retrieved context to a **chosen foundation model** (e.g., Claude, Titan, or GPT).
4. The model returns a **grounded, natural-language response** based on your query and the retrieved data.

In short, RetrieveAndGenerateAPI abstracts the entire RAG pipeline, allowing you to focus on building applications without managing retrieval and prompt engineering separately.

<img width="1468" alt="image" src="https://github.com/user-attachments/assets/c01f629c-f743-4750-9e70-3788f92c7afb" />



