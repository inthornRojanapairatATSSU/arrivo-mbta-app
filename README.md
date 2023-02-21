# Arrivo: Runs on MBTA API
## Hassle-free train web app
This MERN stack implementation creates a small web application that lets users register, login, view a home page, and logout.

# Introduction
The MBTA Transit app is a web-based application that displays real-time updates on train arrival and departures. It allows users to identify which alert to prioritize through the severity of the alert. When it comes to this transit app, it allows users to receive filtered alerts based on their preference and prioritization of their train line. Also, the app is in a comprehensible format for users to view the incoming trains.

Configuration
-------------
Under users/server/create .env file that looks similar to this:
DB_URL = mongodb+srv://admin:<your admin password>@cluster<some  number>.<some unique id>.mongodb.net/<some database name>
ACCESS_TOKEN_SECRET = xb3tim8rnIdoMMJfGNaqMxHX6zyWGBrR
To do this, you need to create an MongoDB Atlas account, a collection, and a database.

The DB_URL comes from signing up for an MongoDB Atlas account and creating a cluster.  Under database select the cluster (likely
cluster0 if it is your first one) and select Connect. Select connect your application, driver=Node.js.  You will see
the database connection string in this window.

Generate a unique JWT access token for ACCESS_TOKEN_SECRET

Start Up
---------
  Start the back end by going to users/server and executing npm start.
  Start the front end by going to ui and executing npm start.
  
Front End
---------
  The Front End runs on port 8096 which is specified in ui/.env
  The land page is at http://localhost:8096/
  
Back End
--------
  The back end runs on port 8081.
  This is specified in user/server/server.js
  The back provides access to user information through a RESTful API.
