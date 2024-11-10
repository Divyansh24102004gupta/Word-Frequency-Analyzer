import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [url, setUrl] = useState('');
  const [topWords, setTopWords] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/analyze', { url });
      console.log(response);
      setTopWords(response.data);
    } catch (err) {
      console.error('Error fetching data', err);
    }
  };

  return (
    <div  style={{marginLeft:"450px", marginBottom:"200px"}}>
      <h1>Word Frequency Analyzer</h1>
      <form onSubmit={handleSubmit} style={{marginLeft:"140px", marginTop:"100px"}}>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter URL"
          required
        />
        <button type="submit" style={{marginLeft:"20px"}}>Analyze</button>
      </form>

      {topWords.length > 0 && (
        <table style={{marginLeft:"200px", marginTop:"20px"}}>
          <thead>
            <tr>
              <th>Word</th>
              <th>Frequency</th>
            </tr>
          </thead>
          <tbody>
            {topWords.map(([word, freq]) => (
              <tr key={word}>
                <td>{word}</td>
                <td>{freq}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default App;
