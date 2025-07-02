/**
 * Script to sync data between src/data and public/data directories
 * This can be run manually or as part of a build/start process
 */
const fs = require('fs');
const path = require('path');

// Directories
const SRC_DATA_DIR = path.join(__dirname, '../src/data');
const PUBLIC_DATA_DIR = path.join(__dirname, '../public/data');

// Create the public/data directory if it doesn't exist
if (!fs.existsSync(PUBLIC_DATA_DIR)) {
  console.log('Creating public/data directory...');
  fs.mkdirSync(PUBLIC_DATA_DIR, { recursive: true });
}

// Get all JSON files from the src/data directory
const jsonFiles = fs.readdirSync(SRC_DATA_DIR)
  .filter(file => file.endsWith('.json'));

console.log(`Found ${jsonFiles.length} JSON files to sync:`);

// Copy each JSON file to the public/data directory
const results = jsonFiles.map(file => {
  const srcPath = path.join(SRC_DATA_DIR, file);
  const destPath = path.join(PUBLIC_DATA_DIR, file);
  
  try {
    fs.copyFileSync(srcPath, destPath);
    console.log(`✓ Synced ${file}`);
    return { file, success: true };
  } catch (error) {
    console.error(`✗ Failed to sync ${file}: ${error.message}`);
    return { file, success: false, error: error.message };
  }
});

// Report results
const successCount = results.filter(r => r.success).length;
const failCount = results.length - successCount;

console.log('\nSync Summary:');
console.log(`Total files: ${results.length}`);
console.log(`Successfully synced: ${successCount}`);
console.log(`Failed to sync: ${failCount}`);

if (failCount > 0) {
  console.log('\nFailed files:');
  results.filter(r => !r.success).forEach(r => {
    console.log(`- ${r.file}: ${r.error}`);
  });
  
  process.exit(1);
} else {
  console.log('\nAll files synced successfully!');
}
