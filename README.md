# Diarized Speech Recognition System for Patient-doctor Communication 
## Introductions
Focus: This project focuses on improving the quality of telecommunications between doctor and patient.

Motivation: Due to COVID-19, almost all doctor appointments start from a phone call examination. The current system can be improved to facilitate better patient and doctor communication. 

Need: A better way to examine the phone call examination content, which optimizes virtual medical appointments

Goal: An interface for patients and doctors where they can upload recorded telecommunication for further analysis

Features:
* Establish users accounts (users will be categorized into patient and doctor)
* Upload audio files to the website
* Select topics of interests and enter personalized topic of interest
* Transcribe the audio files into text file 
* Return user the transcribed script with highlighted contents
  * highlighted contents are related with the labels which the user selected
* Return user labels in two categories 
  * show up in the script
  * not show up in the script

## Architecture
![Architecture](/Flow_diagrams/Architecture.jpg)

## Node.js architecture
![Front_end](/Flow_diagrams/Front_end.jpg)
![Back_end](/Flow_diagrams/Back_end.jpg)

# Demo
Website demo link 
<>

Google 
<>

Resemblyzer:
<>

# Deploy
## google speech recognition 

## Resemblyzer


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

# Instructions & ScreenShots
## Nevigating the Website
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




