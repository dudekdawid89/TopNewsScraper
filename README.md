# Top News Scraper Application

## About

**Top News Scraper** is the web application that lets users view and leave comments on the latest top news from `www.nbcchicago.com`

[Click ](https://news-scraper-live.herokuapp.com) to see Top News Scraper App

## Technology
    Application is using Mongoose and Cheerio for scrape the latest news from antoher site and store them in the data base. Web app is deployed on the heroku
## List of technology used for app:

 
     1. Node.js 
     2. Express 
     3. HTML
     4. CSS
     5. Bootstrap
     6. Heroku
     7. Express-handlebars
     8. Mongoose
     9. Cheerio
    10. Axios

## Application folder structure:

  ```
  TopNewsScraper
    - .gitignore
    - models
      - Article.js
      - index.js
      - Note.js
      - public
        - app.js
      - view
        - layouts
            - main.handlebars
        - index.handlebars
        - saved.handlebars
    - node_modules
    - package.json
    - server.js
  ```

  ## NPM packages installation instructions command:

Terminal command (1) : `npm init -y` (create package.json)

Terminal command (2) : `npm i`

## Run instructions

 1. Termianal command : `npm start`
 2. Open browser and run: [localhost:3000](http://localhost:3000)  