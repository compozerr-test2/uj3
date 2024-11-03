const args = process.argv.slice(2);
if (args.length !== 1) {
    console.error("No args or too many args provided. Please provide exactly one argument.");
    process.exit(1);
}

const newName = args[0];

const fs = require('fs');
const path = require('path');
const glob = require('glob');

const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};
const lowerCase = (string) => {
    return string.toLowerCase();
}
const replaceInFile = (filePath, searchValue, replaceValue) => {
    const content = fs.readFileSync(filePath, 'utf8');
    const updatedContent = content.replace(new RegExp(searchValue, 'g'), replaceValue);
    fs.writeFileSync(filePath, updatedContent, 'utf8');
    console.log(`Replaced "${searchValue}" with "${replaceValue}" in ${filePath}`);
}
const replaceInFiles = (files, searchValue, replaceValue) => {
    files.forEach(file => {
        if (fs.existsSync(file)) {
            replaceInFile(file, searchValue, replaceValue);
        } else {
            console.warn(`File not found: ${file}`);
        }
    });
}

const renameFiles = (files, searchValue, replaceValue) => {
    files.forEach(file => {
        if (fs.existsSync(file)) {
            const dirname = path.dirname(file);
            const basename = path.basename(file);
            if (basename.includes(searchValue)) {
                const newBasename = basename.replace(new RegExp(searchValue, 'g'), replaceValue);
                const newPath = path.join(dirname, newBasename);
                fs.renameSync(file, newPath);
                console.log(`Renamed file from ${file} to ${newPath}`);
            }
        } else {
            console.warn(`File not found: ${file}`);
        }
    });
    
    const allDirs = new Set(files.map(file => path.dirname(file)));
    const sortedDirs = Array.from(allDirs)
        .sort((a, b) => b.split(path.sep).length - a.split(path.sep).length);
    
    sortedDirs.forEach(dir => {
        if (dir === '.' || !fs.existsSync(dir)) return;
        
        const parentDir = path.dirname(dir);
        const basename = path.basename(dir);
        
        if (basename.includes(searchValue)) {
            const newBasename = basename.replace(new RegExp(searchValue, 'g'), replaceValue);
            const newPath = path.join(parentDir, newBasename);
            
            try {
                fs.renameSync(dir, newPath);
                console.log(`Renamed directory from ${dir} to ${newPath}`);
            } catch (err) {
                console.warn(`Failed to rename directory: ${dir}`, err);
            }
        }
    });
}

const selfDestruct = () => {
    const selfDestructPath = path.join(__dirname, '.exec.js');
    if (fs.existsSync(selfDestructPath)) {
        fs.unlinkSync(selfDestructPath);
        console.log('Self-destructed successfully.');
    } else {
        console.warn('Self-destruct file not found.');
    }
}

const gitignorePath = path.join(__dirname, '.gitignore');
let files;
if (fs.existsSync(gitignorePath)) {
    const gitignoreContent = fs.readFileSync(gitignorePath, 'utf8');
    const ignorePatterns = gitignoreContent.split('\n').filter(line => line.trim() !== '');
    ignorePatterns.push('obj/**', '.git/**', 'package-lock.json', 'package.json', 'README.md', '.exec.js', "bin/**");
    files = glob.sync('**/*', { nodir: true, ignore: ignorePatterns });
} else {
    console.warn('.gitignore file not found. Proceeding without ignoring any files.');
    files = glob.sync('**/*', { nodir: true });
}

replaceInFiles(files, 'Template', capitalizeFirstLetter(newName));
replaceInFiles(files, 'template', lowerCase(newName));

renameFiles(files, 'Template', capitalizeFirstLetter(newName));
renameFiles(files, 'template', lowerCase(newName));

selfDestruct();