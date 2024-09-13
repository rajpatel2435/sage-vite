#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');
const inquirer = require('inquirer');

// Function to prompt the user for the theme name
const askThemeName = async () => {
  try {
    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'themeName',
        message: 'Enter your WordPress theme name (e.g., sage-vite-theme):',
        default: 'sage-vite-theme'
      }
    ]);
    if (typeof answers.themeName !== 'string' || answers.themeName.trim() === '') {
      throw new Error('Theme name is required.');
    }
    return answers.themeName;
  } catch (error) {
    console.error('Error asking theme name:', error);
    process.exit(1); // Exit with an error code
  }
};

// Function to copy the theme files from source to target
const copyTheme = async (themeName) => {
  const currentDir = process.cwd();
  const targetDir = path.join(currentDir, themeName);
  const sourceDir = path.join(__dirname, '/node_modules/vite-sage');

  try {
    if (!fs.existsSync(sourceDir)) {
      throw new Error(`Source directory '${sourceDir}' does not exist.`);
    }

    // Ensure target directory exists
    await fs.ensureDir(targetDir);
    
  

    // Copy the source directory to the target directory
    await fs.copy(sourceDir, targetDir);
    console.log(`✅ WordPress theme '${themeName}' created successfully in ${targetDir}`);
    console.log(`📋 Navigate to '${targetDir}' and run 'npm install' to install dependencies.`);
  } catch (error) {
    console.error('Error copying theme files:', error);
    process.exit(1); // Exit with an error code
  }
};

// Main function to run the setup
const run = async () => {
  try {
    const themeName = await askThemeName();
    if (typeof themeName !== 'string') {
      throw new Error('Theme name is not a string.');
    }
    await copyTheme(themeName);
  } catch (error) {
    console.error('Error during setup:', error);
    process.exit(1); // Exit with an error code
  }
};

// Execute the main function
run();
