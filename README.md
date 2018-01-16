First, you should have deployed the app-reader-backend repo. I'd recommend using Heroku. Then, set the BACKEND_URL global variable at the top of src/Login.js and src/Dashboard.js. If you're using Heroku, this URL should look like "xxxxx.herokuapp.com".

To run:
'npm install' then 'npm start'

The reader is currently customized for TreeHacks application data and rating criteria. To change those, some modifications will need to be made to templates in the src/Dashboard.js file.