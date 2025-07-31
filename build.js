// build.js
const fs = require('fs');
const path = require('path');

// Define the path to your HTML file
// IMPORTANT: Make sure this matches the name of your HTML file.
const htmlFilePath = path.join(__dirname, 'rental-return-app.html'); 
const placeholder = '__SUPABASE_ANON_KEY_PLACEHOLDER__';
// This is the environment variable Netlify will provide
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY; 

if (!supabaseAnonKey) {
    console.error('Error: SUPABASE_ANON_KEY environment variable is not set in Netlify.');
    console.error('Please go to Site settings > Build & deploy > Environment variables and add SUPABASE_ANON_KEY.');
    process.exit(1); // Exit with an error code to fail the build
}

try {
    let htmlContent = fs.readFileSync(htmlFilePath, 'utf8');

    // Replace the placeholder with the actual Supabase Anon Key
    htmlContent = htmlContent.replace(placeholder, supabaseAnonKey);

    fs.writeFileSync(htmlFilePath, htmlContent, 'utf8');
    console.log('Successfully injected Supabase Anon Key into HTML.');
} catch (error) {
    console.error('Error during build process:', error);
    process.exit(1); // Exit with an error code
}
