# Shoostarter Project

Welcome to the capstone-project-shootstarter wiki! This is a small project which is a clone of Kickstarter website, I worked on this as a proof for all my knowledge and experiences that I gained at AppAcademy.

Deployed Live Link: https://shootstarter.onrender.com

## Major Feature
- There are 2 major features right now which have full CRUD (Create, Read, Update, Delete) in this project:
  - Projects
  - Backing projects and reward (Pledges)

## Future Feature
- These are list of future feature that are coming:
  - Comments
  - Likes
  - Search
  - User Profile

## Techonology
All technologies I used in this project are:
  - Backend: Python, Flask Server
  - Frontend: JavaScript, React, Redux, HTML, CSS 

## Landing Page
![image](https://user-images.githubusercontent.com/112263162/221633477-ab8fad57-ff44-48b5-ab97-aa0894b0f12c.png)

## Project Detail Page
![image](https://user-images.githubusercontent.com/112263162/221633619-5fe16443-9aa3-47a2-9c83-ed6673f14abf.png)
![image](https://user-images.githubusercontent.com/112263162/221633766-c6543f23-0d61-432a-9641-23952cfb368b.png)


## Getting started
1. Clone this repository (only this branch)

2. Install dependencies

      ```bash
      pipenv install -r requirements.txt
      ```

3. Create a **.env** file based on the example with proper settings for your
   development environment

4. Make sure the SQLite3 database connection URL is in the **.env** file

5. This starter organizes all tables inside the `flask_schema` schema, defined
   by the `SCHEMA` environment variable.  Replace the value for
   `SCHEMA` with a unique name, **making sure you use the snake_case
   convention**.

6. Get into your pipenv, migrate your database, seed your database, and run your Flask app

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   flask run
   ```

7. To run the React App in development, checkout the [README](./react-app/README.md) inside the `react-app` directory.


Contact Info: nednguyen1110@gmail.com
