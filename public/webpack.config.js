module.exports = {
    entry: {
      main: './src/js/main.js', // Entry point for your main JavaScript file
      styles: './src/css/styles.css' // Entry point for your CSS file
    },
    output: {
      filename: '[name].bundle.js', // Output bundle file name for JavaScript files
      path: path.resolve(__dirname, 'dist') // Output directory path
    },
    // Other configuration options for loaders, plugins, etc.
  };