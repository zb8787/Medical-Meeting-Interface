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
## Google Natural Language
* Follow the official Google Natural API quickstart guide to create an account and have access the API: https://cloud.google.com/natural-language/docs/quickstarts
* Authenticate your Google credentials to begin utilizing the various natural language scripts in the diarization directory
### Diarize and Transcribe - google_dt.py
* Place your desired audio file in the audio_input directory. The following process will work with as many files as you place in the directory.
* For audio longer than 1 minute, you the Google NL API requires a google storage buckets on your account. The code is set up to automatically utilize your storage bucket, you must specify your bucket's name on line 7.
* Run the google_dt.py script. The diarized text-to-speech transcript will be written to the output_transcript folder as a text file.
### Entity Analysis - entity_analysis.py
* Specify the directory where the transcript text files are located on line 1
* Specify the name of the transcript on line 3
* Run the entity_analysis.py script.
### Tag Search - tag_search.py
* Specify the directory where the transcript text files are located on line 1
* Specify the name of the transcript on line 3
* Specify SearchTerm on line 13
* Run the tag_search.py script. Script will perform search with and without context.

## Resemblyzer
* Explored diarization with resemblyzer
  * Uses pre-trained LSTM embeddings to compute similarity matrix
  * The result is a similarity metric for each speaker at n moment in time
* Make sure to install resemblyzer, pytorch, and matplotlib
* You can place any audio file (.wav) into the audio directory which you can specify on line 13.
* Run the diarization_demo.py script from your terminal located in the diarization directory.

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
 
# Instructions & Screenshots
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



