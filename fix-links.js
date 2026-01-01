const fs = require('fs');
const path = require('path');

const componentsDir = path.join(__dirname, 'components');

function fixLinkInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  // Regex to match <Link ...> that does NOT already have legacyBehavior
  const regex = /<Link(?![^>]*legacyBehavior)([^>]*)>/g;

  let updatedContent = content.replace(regex, '<Link$1 legacyBehavior>');

  if (updatedContent !== content) {
    fs.writeFileSync(filePath, updatedContent, 'utf8');
    console.log(`Updated <Link> in: ${filePath}`);
  }
}

function walkDir(dir) {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      walkDir(fullPath);
    } else if (fullPath.endsWith('.js') || fullPath.endsWith('.jsx')) {
      fixLinkInFile(fullPath);
    }
  });
}

// Run
walkDir(componentsDir);
console.log('Finished fixing <Link> tags!');
