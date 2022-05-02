# Work-IN

I enjoy exercise. That said, I don't exercise like I enjoy it. I haven't kept a journal in years or any other form of record keeping. That's what led me to start this project, Work-IN. Upon login, you will be brought to the workout page, where you can input the exercises you will be doing today. Once you click begin, you'll be brought through the workout in order. Upon finishing, you'll be congratulated on a job well done! You may also keep track of your maxes in the home screen, with more features coming soon! 

## Prerequisites
Before you get started, make sure you have the following software installed on your computer:

- Node.js
- PostrgeSQL
- Nodemon

## Create database and tables
Create a new database called Work-In, copy and paste the database.sql in Postico, and execute.

## Development Setup Instructions
- Run npm install
- Create a .env file at the root of the project and paste this line into the file:

    SERVER_SESSION_SECRET=superDuperSecret

    While you're in your new .env file, take the time to replace superDuperSecret with some long random string like 25POUbVtx6RKVNWszd9ERB9Bb6 to keep your application secure. Here's a site that can help you: https://passwordsgenerator.net/. If you don't do this step, create a secret with less than eight characters, or leave it as superDuperSecret, you will get a warning.
- Start postgres if not running already by using brew services start postgresql
- Run npm run server
- Run npm run client
- Navigate to localhost:3000

## Acknowledgements

I'd like to thank a whole swath of people. I'll start will my instructor Dane Smith, who has made learning all of this an absolute pleasure. I'd also like to thank all of my 