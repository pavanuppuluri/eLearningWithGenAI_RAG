import React, { useState } from 'react';
import './index.css';

function ApiDemo() {
  const [inputValue, setInputValue] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    setResponse('');
    try {
      const res = await fetch('https://92l8ekt6ul.execute-api.us-west-2.amazonaws.com/dev?prompt='+inputValue, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        // body: JSON.stringify({ prompt: inputValue }),
      });
      const data = await res.json();
      setResponse(data);
      // setResponse(data.response || JSON.stringify(data.body));
    } catch (err) {
      setResponse('Failed to fetch: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ width: '75vw', margin: '0 auto' }}>
      <div className="card">
        <h2><span className="highlight-blue">Incident Summarization</span> using Cohere</h2>
        <label htmlFor="input">Incident Details</label>
        <textarea
          id="input"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Paste your case details here..."
          style={{ height: '25vh' }}
        />
        <button onClick={handleSubmit} disabled={loading}>
          {loading ? 'Summarizing...' : 'Submit'}
        </button>

        <label htmlFor="response" style={{ marginTop: '1.5rem' }}>Incident Summary </label>
        <textarea
          id="response"
          className="response-box"
          readOnly
          value={response}
          style={{ height: '25vh' }}
        />
      </div>
    </div>
  );
}

export default ApiDemo;
