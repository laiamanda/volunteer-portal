## Goals
* Create a web page where user can upload their hours and their volunteer
* Create a dashboard to view their hours and entries
* Initiate a database in the backend
* Create a sign-in page where user can create an account
* Create a login page where user can login into the website

## To Do Tasks:
* Global Styling
  * Make navbar more responsive
  * Add favicon - fix it
  * Add logic - where if no user is logged in, display sign-up/login in navbar. If user is logged in, show logout link
* Database
  * Update user scheme
    * Store createddate, firstname, lastname, email
  * Sign Up
    * Store email
* Edit Page
  * Add input fields
    * Organization
    * Position/Role
* Dashboard
  * Create a dataTables function to render data into js file
  * Display hours with datatables
* Auth
  * Make users have their password to include symbol, number, letter, upper and lower case
  * If failed to login, display error message on the page
  * If failed to sign-up, display error on the page
* Create a change-log page
* Get npm start to work