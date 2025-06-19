const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

/**
 * API endpoint to refresh data files from src/data to public/data
 */
router.get('/refresh-data', (req, res) => {
  try {
    // Source and destination directories
    const SRC_DATA_DIR = path.join(__dirname, '../../src/data');
    const PUBLIC_DATA_DIR = path.join(__dirname, '../../public/data');
    
    // Create the public/data directory if it doesn't exist
    if (!fs.existsSync(PUBLIC_DATA_DIR)) {
      fs.mkdirSync(PUBLIC_DATA_DIR, { recursive: true });
    }
    
    // Get all JSON files from the src/data directory
    const jsonFiles = fs.readdirSync(SRC_DATA_DIR)
      .filter(file => file.endsWith('.json'));
    
    // Copy each JSON file to the public/data directory
    const results = jsonFiles.map(file => {
      const srcPath = path.join(SRC_DATA_DIR, file);
      const destPath = path.join(PUBLIC_DATA_DIR, file);
      
      try {
        fs.copyFileSync(srcPath, destPath);
        return { file, success: true };
      } catch (error) {
        return { file, success: false, error: error.message };
      }
    });
    
    // HTML response for browser viewing
    const successCount = results.filter(r => r.success).length;
    const failCount = results.length - successCount;
    
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Data Refresh</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              max-width: 800px;
              margin: 0 auto;
              padding: 20px;
            }
            h1 {
              color: #c11212;
            }
            .card {
              border: 1px solid #ddd;
              border-radius: 4px;
              padding: 20px;
              margin-bottom: 20px;
            }
            .success {
              color: green;
            }
            .error {
              color: red;
            }
            table {
              width: 100%;
              border-collapse: collapse;
            }
            th, td {
              border: 1px solid #ddd;
              padding: 8px;
              text-align: left;
            }
            th {
              background-color: #f2f2f2;
            }
            .btn {
              display: inline-block;
              background-color: #c11212;
              color: white;
              padding: 8px 16px;
              text-decoration: none;
              border-radius: 4px;
              margin-top: 20px;
            }
          </style>
        </head>
        <body>
          <h1>Data Refresh Results</h1>
          
          <div class="card">
            <h2>Summary</h2>
            <p>Total files: ${results.length}</p>
            <p class="success">Successfully copied: ${successCount}</p>
            ${failCount > 0 ? `<p class="error">Failed: ${failCount}</p>` : ''}
          </div>
          
          <div class="card">
            <h2>Details</h2>
            <table>
              <tr>
                <th>File</th>
                <th>Status</th>
              </tr>
              ${results.map(result => `
                <tr>
                  <td>${result.file}</td>
                  <td class="${result.success ? 'success' : 'error'}">${result.success ? 'Success' : 'Failed: ' + result.error}</td>
                </tr>
              `).join('')}
            </table>
          </div>
          
          <a href="/admin" class="btn">Return to Admin Dashboard</a>
        </body>
      </html>
    `;
    
    res.send(html);
  } catch (error) {
    console.error('Error refreshing data:', error);
    res.status(500).send(`Error refreshing data: ${error.message}`);
  }
});

/**
 * API endpoint to get JSON data directly
 * This ensures the CMS can always access the data regardless of server setup
 */
router.get('/admin/data/:dataType', (req, res) => {
  try {
    const { dataType } = req.params;
    
    // Validate data type
    const allowedTypes = [
      'members', 'events', 'projects', 'sponsors', 
      'news', 'gallery', 'achievements', 'merchandise',
      'racing-journey', 'team-info'
    ];
    
    if (!allowedTypes.includes(dataType)) {
      return res.status(400).json({ error: `Invalid data type: ${dataType}` });
    }
    
    // Path to the JSON file in src/data
    const dataPath = path.join(__dirname, '../../src/data', `${dataType}.json`);
    
    if (!fs.existsSync(dataPath)) {
      return res.status(404).json({ error: `Data file for ${dataType} not found` });
    }
    
    // Read the file
    const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
    
    // Return the data
    return res.json(data);
  } catch (error) {
    console.error(`Error getting data:`, error);
    return res.status(500).json({ error: error.message });
  }
});

module.exports = router;
