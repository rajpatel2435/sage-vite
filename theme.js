#!/usr/bin/env node

const clone = require('git-clone');
const prompt = require('prompt');
const { exec } = require('child_process');
const fs = require('fs-extra');
const path = require('path');

const repoUrl = 'https://github.com/rajpatel2435/sage-vite';

prompt.start();

prompt.get(['projectName'], (err, result) => {
  if (err) {
    console.error('Failed to get project name:', err);
    return;
  }

  const targetPath = path.resolve(result.projectName);
console.log(targetPath);
const currentPath = process.cwd();
const nodeModulesPath = path.join(currentPath, 'node_modules');
console.log(nodeModulesPath);

fs.remove(nodeModulesPath, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log('node_modules folder deleted successfully');
  }
});


  clone(repoUrl, targetPath, null, (err) => {
    if (err) {
      console.error('Failed to clone repository:', err);
    } else {
      console.log('Repository cloned successfully to', targetPath);

      // Change directory to the target path and install npm packages
      // exec(`cd ${targetPath} && composer install`, (err, stdout, stderr) => {
      //   if (err) {
      //     console.error('Failed to install npm packages:', err);
      //   } else {
      //     console.log('npm packages installed successfully!');
      //     console.log(stdout);
      //   }
      // });
    }
  });
});
