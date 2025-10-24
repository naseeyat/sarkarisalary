const fs = require('fs');

/**
 * Safe file write - preserves existing files unless forced
 * @param {string} filepath - Path to write file
 * @param {string} content - Content to write
 * @param {boolean} force - Force overwrite existing files
 * @returns {boolean} - True if file was written, false if skipped
 */
function safeWriteFile(filepath, content, force = false) {
    if (!force && fs.existsSync(filepath)) {
        const filename = filepath.split('/').pop();
        console.log(`⚠️  ${filename} already exists. Skipping to preserve customizations.`);
        console.log(`   Use --force flag to overwrite existing files.`);
        return false;
    }
    
    // Ensure directory exists
    const dir = filepath.substring(0, filepath.lastIndexOf('/'));
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
    
    fs.writeFileSync(filepath, content);
    const filename = filepath.split('/').pop();
    console.log(`✅ Generated: ${filename}`);
    return true;
}

/**
 * Parse command line arguments
 * @returns {object} - Parsed arguments
 */
function parseArgs() {
    const args = process.argv.slice(2);
    return {
        force: args.includes('--force'),
        skip: args.includes('--skip'),
        only: args.find(arg => arg.startsWith('--only='))?.split('=')[1],
        help: args.includes('--help') || args.includes('-h')
    };
}

/**
 * Show help message
 */
function showHelp(generatorName) {
    console.log(`
Usage: node ${generatorName}

Options:
  --force         Overwrite existing files
  --skip          Skip all existing files (default behavior)
  --only=<name>   Generate only specific item
  --help, -h      Show this help message

Examples:
  node ${generatorName}                    # Generate all (skip existing)
  node ${generatorName} --force            # Generate all (overwrite existing)
  node ${generatorName} --skip             # Generate all (skip existing)
  node ${generatorName} --only=ias-timeline # Generate only specific item
`);
}

module.exports = {
    safeWriteFile,
    parseArgs,
    showHelp
};