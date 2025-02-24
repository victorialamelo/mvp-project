# MY SCHEDULES APP

MAIN OBJECTIVE:
The main objective of this app is to allow users to create and save schedules with planned itineraries on Google Maps. Users can also share these itineraries with others. While the Google Maps app currently allows users to access past itineraries, it does not provide the ability to save future itineraries, which is where this website can be useful. This app contains 3 main views, which can be found on the 'pages' folder inside 'client': 1- the Home Page, with the list of created schedules; 2- the page to see your recently created Schedule and add stops to your itinerary; and 3- the Add New Location (item) page, with the Google Maps API.

# MAIN SETUP STEPS

### 1. Dependencies

- Run `npm install` in project directory (mvp-project/my-express-app). This will install server-related dependencies such as `express`.
- `cd client` and run `npm install`. This will install client dependencies (React/Google Maps API).
- You will need to create your Google Maps API key - instructions here https://shorturl.at/kopfA
- After creating the API key, create a `.env` file inside 'client' folder. Inside `.env` paste the following line with your API key, without the [ ]:

VITE_GOOGLE_MAPS_API_KEY=[YOUR API KEY]

### 2. Database Prep

- Access the MySQL interface in your terminal by running `mysql -u root -p` (or the command that has been working for you)

- Create a new database called 'itinerary', and enter in your terminal: `create database itinerary`

- Add a new `.env` file, this time to the project folder (my-express-app), containing the MySQL authentication information for MySQL user:

DB_HOST=localhost  
DB_USER=root  
DB_NAME=itinerary  
DB_PASS=yourMySQLpassword

- Open a new terminal, and run `npm run migrate` in the project folder (mvp-project/my-express-app). This will create 3 tables called 'Schedule', 'ScheduleItem' and 'User' in your 'itinerary' database. So far, I have only used 'Schedule' and 'ScheduleItem' tables in this MVP. I created table 'User' as a P1 thinking of future user_id validation/login.

### 3. Development

- Run `npm start` in project directory (my-express-app) to start the Express server on port 5000

- In another terminal, do `cd client` and run `npm run dev` to start the client in development mode with hot reloading in port 5173.

# DATABASE SCHEMA

![Database Schema](/my-express-app/public/images/database-schema.png)

# API ROUTES

![API Routes](/my-express-app/public/images/API-routes.png)

# SUGGESTED FEATURES LIST

- Allowing the user to input a different Schedule name (instead of default date name YYY-MM-DD).
- Rendering the starting and destination locations names on "From x to y" along each Schedule on home page.
- Re-ordering items/stops on the itinerary. Currently, user must delete location and enter new ones consecutively.
- Integrating ‘new location’ input field with Google Maps (automatic fetching place name on input field based on the marker coordinates).
- Changing default map center location to user’s current location (now default center is in Barcelona).
- Adding a user_id/login validation page and/or different user views.

_This is a student project that was created at [CodeOp](http://codeop.tech), a full stack development bootcamp in Barcelona._
