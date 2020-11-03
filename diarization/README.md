# Diarization and Transcription

Diariation_demo.py:\
This is a diarization demo, the input takes an audio file sample from a podcast with two speakers.\
Output is a graph plotting a similarity score in-sync with the audio file, indicating who is speaking at that moment.\
This demo requires the user to pre-identify both speakers for a small sample of the audio.\
Included in this directory is an .mp3 audio file for the demo, but this must be converted to a .wav file before use in the demo. This is due to the large size of the .wav file and github restrictions.

google_dt.py:\
This takes an .mp3 file as input (in the input_audio directory) and outputs a speaker diarized transcript (in the output_transcript directory).\
Must authenticate via google cloud, and must have a google cloud storage bucket created prior to running code.
