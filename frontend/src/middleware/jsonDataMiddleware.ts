// This middleware handles requests to fetch JSON data files
// It will be used to serve the JSON files from the public/data directory

import { NextFunction, Request, Response } from 'express';
import * as path from 'path';
import * as fs from 'fs';

interface JsonMiddlewareOptions {
  cacheTTL?: number; // Time to live for cache in seconds
  dataDir?: string;  // Directory containing JSON files
}

const defaultOptions: JsonMiddlewareOptions = {
  cacheTTL: 300, // 5 minutes
  dataDir: 'data' // Relative to public directory
};

// Create a middleware factory function
export function createJsonDataMiddleware(options: JsonMiddlewareOptions = {}) {
  const config = { ...defaultOptions, ...options };
  const cache: Record<string, { data: any, expiry: number }> = {};
  
  return (req: Request, res: Response, next: NextFunction) => {
    // Only handle GET requests to /api/data/* paths
    if (req.method !== 'GET' || !req.path.startsWith('/api/data/')) {
      return next();
    }
    
    // Extract the file name from the path
    const filePath = req.path.replace('/api/data/', '');
    if (!filePath.endsWith('.json')) {
      return res.status(400).json({ error: 'Only JSON files are supported' });
    }
    
    // Check if we have a cached version that's still valid
    const now = Date.now();
    if (cache[filePath] && cache[filePath].expiry > now) {
      return res.json(cache[filePath].data);
    }
    
    // Construct the absolute path to the file
    const publicDir = path.resolve(process.cwd(), 'public');
    const dataPath = path.join(publicDir, config.dataDir || '', filePath);
    
    // Check if the file exists
    if (!fs.existsSync(dataPath)) {
      return res.status(404).json({ error: 'File not found' });
    }
    
    try {
      // Read and parse the file
      const fileContent = fs.readFileSync(dataPath, 'utf8');
      const jsonData = JSON.parse(fileContent);
      
      // Update the cache
      cache[filePath] = {
        data: jsonData,
        expiry: now + (config.cacheTTL || 300) * 1000
      };
      
      // Send the response
      return res.json(jsonData);
    } catch (error) {
      console.error(`Error reading JSON file ${dataPath}:`, error);
      return res.status(500).json({ error: 'Failed to read data file' });
    }
  };
}
