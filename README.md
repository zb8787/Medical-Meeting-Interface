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
![Overall_Architecture](/Flow_diagrams/Overall_Architecture.jpg)

### Node.js architecture
![Front_end](/Flow_diagrams/Front_end.jpg)
![Back_end](/Flow_diagrams/Back_end.jpg)
