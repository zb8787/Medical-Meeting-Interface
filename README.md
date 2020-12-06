# Diarized Speech Recognition System for Patient-doctor Communication 
## Introduction
Focus: This project focuses on improving the quality of telecommunications between doctors and patients.

Motivation: Due to COVID-19, almost all doctor appointments start from a phone call examination. The current system can be improved to facilitate better patient and doctor communication. 

Need: A better way to understand phone call or virtual examination content, and in turn optimizing virtual medical appointments.

Goal: An interface for patients and doctors to upload recorded telecommunications, and perform further analysis on the recordings.

Features:
* Establish users accounts (users are categorized into patients and doctors)
* Upload audio files to the website
* Select topics (tags) of interests and enter personalized topic of interest
* Perform speech diarization, splitting the audio into who is speaking and when
* Transcribe the audio files into text files with diarized speakers
* Return to user the transcribed script with highlighted contents
  * highlighted contents are related with the labels (tags) which the user selected
* Return user labels in two categories 
  * show up in the script
  * not show up in the script

## Architecture
![update](/Flow_diagrams/update.jpg)

## Node.js architecture
![Front_end](/Flow_diagrams/Front_end.jpg)
![Back_end](/Flow_diagrams/Back_end.jpg)

# Deploy
## Google sentiment analysis

## Resemblyzer
* Explored with resemblyzer
  * Which uses pre-trained LSTM embeddings to compute similarity matrix
  * The result is a similarity metric for each speaker at n moment in time


## Website 
* Set up Node.js environment 
  * https://nodejs.org/en/
* Download website folder
* Open two terminals and go to folder client and server seperately
  * `npm init`
  * This will install all the neccessary dependencies from package.json
* After the dependencies are installed in both folders
  * `npm run start`
  * This will run the starting script for both files 
* Open web browser and try the website
  * http://localhost:8080

## Additional Set Up
### The website will not run with the above set up, for two reasons: 1, environment variables are not set up and the database is not set up in the correct form.
To solve environmental variable issue:
create an `.env` file to store all the environmental varibles
* `SECRETKEY = <Your secret>`
* database URL
  * The database used in developing is https://www.mongodb.com/cloud/atlas
  * `MONGODB_URI = mongodb+srv://<user>:<password>@cluster0.u1pj1.mongodb.net/<database name>`
  * You can use any database of your choice, as long as it is setup correctly
  
To setup the databse:
* Download Postman: https://www.postman.com/
* Run server end serperately
* Use back end URL: http://localhost:3000 to generate administrative account for patient and doctor
* Under both administrative account: generate preset topics 
  * The form follows such:
  * Category: overarching category.
    * categories including: general, dental, heart disease
  * Description: topics under the categories
    * description under general for doctor could include Emergency room, Allergy history, Hospital admission, Implantation of medical device, Family history 
  * Owner: the object ID of the corresponding adminstrative account 
  * since the default status is always completed, no need to input completed
 
# Instructions & ScreenShots
## Navigating the Website
![7](/screenshoots/7.PNG)
Register an account. You can either be a doctor or a patient.
![1](/screenshoots/1.PNG)
Login into the account.
![8](/screenshoots/8.PNG)
View your account information.
![6](/screenshoots/6.PNG)
Upload Audio file, Select label and Create own Label. You have to Upload an audio file in order to submit the page.
![3](/screenshoots/3.PNG)
A successful case would look like this before submit.
![4](/screenshoots/4.PNG)
The result page will look like this, according to the previous submission.
![5](/screenshoots/5.PNG)
## Resemblyzer

# Future steps
* Incorporate sentiment analysis into the website
* Achieve full automation within the website 
  * The website is currently using a sudo text file inside the server folder. The file name is: output_script_example
* Deploy the website
  * Due to the way heroku is setup, structural changes need to be made to combine server and client
* Have a more complete preset topic database 
  * Currently there are only three main categories with overall 35 preset topics



