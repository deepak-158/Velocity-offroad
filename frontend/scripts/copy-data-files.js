// This file copies JSON data files to the public directory for access by Netlify CMS
const fs = require('fs');
const path = require('path');

try {
  // Source and destination directories
  const SRC_DATA_DIR = path.join(__dirname, '../src/data');
  const BUILD_DATA_DIR = path.join(__dirname, '../build/data');
  
  console.log('Starting data files copy process...');
  console.log(`Source directory: ${SRC_DATA_DIR}`);
  console.log(`Destination directory: ${BUILD_DATA_DIR}`);
  
  // Check if we're in a CI environment (like Netlify)
  const isCI = process.env.CI === 'true';
  
  if (isCI) {
    console.log('Running in CI environment (likely Netlify)');
  }
  
  // Create the build/data directory if it doesn't exist
  if (!fs.existsSync(BUILD_DATA_DIR)) {
    console.log('Creating build/data directory...');
    try {
      fs.mkdirSync(BUILD_DATA_DIR, { recursive: true });
      console.log('Successfully created build/data directory');
    } catch (dirError) {
      console.error('Error creating build/data directory:', dirError);
      // Continue execution - the build might still succeed even if we can't create this dir
    }
  }
    // Check if src/data exists
  if (!fs.existsSync(SRC_DATA_DIR)) {
    console.log('WARNING: src/data directory does not exist!');
    
    // Create sample data files for Netlify
    if (isCI) {
      console.log('Creating sample data files for CI environment...');
      try {
        // Create sample data
        const sampleData = {
          members: [{ id: 1, name: 'Sample Member' }],
          events: [{ id: 1, name: 'Sample Event' }],
          projects: [{ id: 1, name: 'Sample Project' }],
          sponsors: [{ id: 1, name: 'Sample Sponsor' }],
          news: [{ id: 1, title: 'Sample News Item' }],
          gallery: [{ id: 1, title: 'Sample Gallery Item' }],
          achievements: [{ id: 1, title: 'Sample Achievement' }],
          merchandise: [{ id: 1, name: 'Sample Merchandise' }],
          'racing-journey': [{ id: 1, title: 'Sample Racing Journey' }],
          'team-info': { teamName: 'Sample Team', foundingYear: 2020 }
        };
        
        // Write sample files
        Object.entries(sampleData).forEach(([type, data]) => {
          const filePath = path.join(BUILD_DATA_DIR, `${type}.json`);
          fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
          console.log(`Created sample ${type}.json in build/data/`);
        });
      } catch (sampleError) {
        console.error('Error creating sample data:', sampleError);
      }
    }
    
    // Exit without error to allow build to continue
    process.exit(0);
  }
    // Get all JSON files from the src/data directory
  let jsonFiles;
  try {
    jsonFiles = fs.readdirSync(SRC_DATA_DIR)
      .filter(file => file.endsWith('.json'));
      
    if (jsonFiles.length === 0) {
      console.log('WARNING: No JSON files found in src/data!');
      
      // Exit without error to allow build to continue
      if (!isCI) {
        process.exit(0);
      }
    }
  } catch (readDirError) {
    console.error('Error reading src/data directory:', readDirError);
    // Exit without error to allow build to continue
    process.exit(0);
  }

  // Copy each JSON file to the build/data directory
  let successCount = 0;
  jsonFiles.forEach(file => {
    const srcPath = path.join(SRC_DATA_DIR, file);
    const destPath = path.join(BUILD_DATA_DIR, file);
    
    // Copy the file
    try {
      fs.copyFileSync(srcPath, destPath);
      console.log(`Copied ${file} to build/data/`);
      successCount++;
    } catch (error) {
      console.error(`Error copying ${file}:`, error);
      // Continue with other files, don't exit
    }
  });
  
  console.log(`Data files copy complete! Successfully copied ${successCount} of ${jsonFiles.length} files.`);
} catch (error) {
  // Log error but don't fail the build
  console.error('Error during data files copy:', error);
  process.exit(0); // Exit without error to allow build to continue
}
