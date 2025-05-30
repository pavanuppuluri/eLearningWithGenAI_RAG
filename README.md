# 📚 eLearning with GenAI And RAG

This project demonstrates how to build a Retrieval-Augmented Generation (RAG) based eLearning solution.

## 🔧 Setup Steps

### 1. Data Source (Amazon S3)
- Create an **S3 bucket**.
- Upload all relevant document files into this bucket.

### 2. Create Amazon Bedrock Knowledge Base
- Link the **S3 bucket** as the data source.
- Configure:
  - **Chunking strategy**
  - **Embedding model**
  - **Vector store** (e.g., Amazon OpenSearch, Pinecone)

### 3. Create AWS Lambda Function
- Create an **IAM role** with appropriate permissions.
- **Increase the timeout** setting for the function (e.g., to 60 seconds).
- Implement the `RetrieveAndGenerate` API logic to:
  - Query the knowledge base
  - Generate responses using Bedrock model

  **Model ARN:**
  ```json
  'modelArn': 'arn:aws:bedrock:us-east-1::foundation-model/anthropic.claude-instant-v1'
  ```
  
### 4. Create REST API

- Use **Amazon API Gateway** to create a new **REST API**.
- Define a new resource and method (e.g., `POST /generate`).

### 5. Integrate Lambda with API Gateway and Frontend React App

- **Create and link the API Gateway** endpoint to your **AWS Lambda function**.
- Ensure the **Lambda function** has the necessary permissions for invocation.
- **Deploy the API** to a stage (e.g., `dev`, `prod`) to expose the `RetrieveAndGenerate` endpoint over HTTP.

### 6. Create a Frontend React App (Client Integration)

- Develop a **React.js frontend** to consume the API Gateway endpoint.
- Use `fetch` or `axios` to call the deployed REST API.
- Display the generated responses from the Bedrock Knowledge Base to users via the UI.
- Ensure **CORS settings** in API Gateway allow requests from your frontend domain or local environment during development.

> With above steps, your RAG-based system is fully integrated end-to-end — from document ingestion to user interaction via a web app.

---

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

### 🧠 AWS Lambda Function to Call `retrieve_and_generate` from Bedrock Knowledge Base

#### Example
Below is a sample AWS Lambda function in **Python**, wrapping the `retrieve_and_generate` API call using `boto3` for AWS Bedrock:

```python
import boto3

def lambda_handler(event, context):
    user_prompt = event.get('prompt', 'What is Kubernetes?')

    # Initialize the Bedrock Knowledge Base client
    client_bedrock_knowledgebase = boto3.client('bedrock-agent-runtime', region_name='us-west-2')

    try:
        # Call RetrieveAndGenerate API
        response = client_bedrock_knowledgebase.retrieve_and_generate(
            input={
                'text': user_prompt
            },
            retrieveAndGenerateConfiguration={
                'type': 'KNOWLEDGE_BASE',
                'knowledgeBaseConfiguration': {
                    'knowledgeBaseId': '9I620UL64M',
                    'modelArn': 'arn:aws:bedrock:us-west-2::foundation-model/anthropic.claude-instant-v1'
                }
            }
        )

        # Return the model response
        return {
            'statusCode': 200,
            'body': response
        }

    except Exception as e:
        return {
            'statusCode': 500,
            'error': str(e)
        }
```

Happy coding!!!

