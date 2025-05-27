const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// Serve static files from build directory (for production build)
app.use(express.static(path.join(__dirname, '../build')));

// Serve static files from public directory
app.use(express.static(path.join(__dirname, '../public')));

// Serve static files from src directory (for accessing src/data)
app.use('/src', express.static(path.join(__dirname, '../src')));

// API routes
app.use('/api', require('./routes/api'));

// Handle saving JSON data
app.post('/api/admin/save-data', (req, res) => {
  try {
    const { dataType, data } = req.body;
    
    if (!dataType || !data) {
      return res.status(400).json({ 
        success: false, 
        message: 'Missing required fields' 
      });
    }
    
    // Validate data type
    const allowedTypes = [
      'members', 'events', 'projects', 'sponsors', 
      'news', 'gallery', 'achievements', 'merchandise',
      'racing-journey', 'team-info'
    ];
    
    if (!allowedTypes.includes(dataType)) {
      return res.status(400).json({ 
        success: false, 
        message: `Invalid data type: ${dataType}` 
      });
    }
    
    // Save to src/data
    const srcDataPath = path.join(__dirname, '../src/data', `${dataType}.json`);
    fs.writeFileSync(srcDataPath, JSON.stringify(data, null, 2));
    
    // Copy to public/data for immediate use
    const publicDataDir = path.join(__dirname, '../public/data');
    if (!fs.existsSync(publicDataDir)) {
      fs.mkdirSync(publicDataDir, { recursive: true });
    }
    
    const publicDataPath = path.join(publicDataDir, `${dataType}.json`);
    fs.writeFileSync(publicDataPath, JSON.stringify(data, null, 2));
    
    // Success response
    res.json({ 
      success: true, 
      message: `${dataType} data saved successfully` 
    });
    
  } catch (error) {
    console.error('Error saving data:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error saving data',
      error: error.message
    });
  }
});

// All other routes should serve the React app
app.get('*', (req, res) => {
  // Check if build/index.html exists
  const buildIndexPath = path.join(__dirname, '../build/index.html');
  if (fs.existsSync(buildIndexPath)) {
    return res.sendFile(buildIndexPath);
  }
  
  // Fallback to public/index.html if build doesn't exist
  const publicIndexPath = path.join(__dirname, '../public/index.html');
  if (fs.existsSync(publicIndexPath)) {
    return res.sendFile(publicIndexPath);
  }
  
  res.status(404).send('Not found');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
