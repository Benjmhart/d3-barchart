Welcome to the D3 Boilerplate!


This package includes preconfigured Webpack, Babel, ESLINT, Node-Sass, prettier, gh-pages, and jest,   


USAGE:

with npm start, npm run build, or npm run deploy,  

to know everything is working correctly here are some indicators

if D3 is functioning, the squares will be orange
if SASS is functioning, the text will be BLUE
if Jest is working,  you can adjust src/tests/index.test.js to make the test pass or fail  and run npm run test to watch it.



DEV SERVER:  

CLI:   

    npm start

the webpack dev server is preset for cloud9 IDE - to change it find the start script in 
package.JSON and remove the following option:

    --host 0.0.0.0

this should allow the dev server to run on localhost

BUILD:

to see a transpiled copy for deployment:

    npm run build
    
AUTOFIX:

    npm run autofix
    
this will run prettier and eslint sequentially,   fixing and formatting all your code
    
want prettier to use spaces instead of tabs?   remove the --use-tabs option flag in the pretty script in package.JSON
    
DEPLOY on Github pages:

this package include gh-pages.

To get set up, simply run the following commands:

    git remote add origin <github repo link>
    
    npm run deploy
    
this will create a gh-pages branch on your repo, run a build,  and upload that build to the gh-pages branch, enabling it as the page for the repo


TEST:

    npm run test
    
this will run jest in watch mode so you can run all tests effected since your last commit 

test files need to be placed in src/tests and need to have the .test.js post-fix