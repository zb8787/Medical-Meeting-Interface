#gcloud auth application-default login
# virtual venv
# venv/Scripts/Activate

filepath = 'input_audio/' #input audio file path
output_FP = 'output_transcript/' #output file path for final transcript
bucketname = 'BUCKET_HERE' #name of google cloud storage bucket

from pydub import AudioSegment
from google.cloud import speech_v1p1beta1 as speech
from google.cloud.speech_v1p1beta1 import types
from google.cloud import storage
import wave
import os

os.environ["GCLOUD_PROJECT"] = "PROJECT_HERE"

def mp3_to_wav(audio_file_name):
#Converts .mp3 file to .wav file
    if audio_file_name.split('.')[1] == 'mp3':    
        sound = AudioSegment.from_mp3(audio_file_name)
        audio_file_name = audio_file_name.split('.')[0] + '.wav'
        sound.export(audio_file_name, format="wav")
        
def stereo_to_mono(audio_file_name):
#Converts a stereo audio file to mono
    sound = AudioSegment.from_wav(audio_file_name)
    sound = sound.set_channels(1)
    sound.export(audio_file_name, format='wav')

def frame_rate_channel(audio_file_name):
#Returns the audio frame rate and number of channels for input .wav file
    with wave.open(audio_file_name, 'rb') as wf:
        Frame_rate = wf.getframerate()
        Channels = wf.getnchannels()
        return Frame_rate,Channels

def upload_blob(bucket_name, source_file_name, dest_blob_name):
#Uploads a file to the Google bucket
    storage_client = storage.Client()
    bucket = storage_client.get_bucket(bucket_name)
    blob = bucket.blob(dest_blob_name)
    
    blob.upload_from_filename(source_file_name)

def delete_blob(bucket_name, blob_name):
#Deletes a file from the bucket
    storage_client = storage.Client()
    bucket = storage_client.get_bucket(bucket_name)
    blob = bucket.blob(blob_name)
    
    blob.delete()

def write_transcripts(trans_filename,trans):
#Save the transcript to a file
    f = open(output_FP + trans_filename,'w+')
    f.write(trans)
    f.close()

def google_transcribe(audio_file_name):
    filename = filepath + audio_file_name
    print("Converting from .mp3 to .wav")
    mp3_to_wav(filename)
    audio_file_name = audio_file_name.split('.')[0] + '.wav'
    filename = filepath + audio_file_name

    
    frame_rate, channels = frame_rate_channel(filename)
    
    if channels > 1:
        stereo_to_mono(filename)
        
    bucket_name = bucketname
    source_file_name = filename
    dest_blob_name = audio_file_name
    
    print("Uploading audio file to Google bucket.")
    upload_blob(bucket_name,source_file_name,dest_blob_name)
    print("Upload complete.")
    gcs_uri = 'gs://' + bucketname + '/' + audio_file_name
    transcript = ''
    
    client = speech.SpeechClient()
    audio = types.RecognitionAudio(uri=gcs_uri)
    
    print("Performing diarization and transcription on audio file")
    config = types.RecognitionConfig(
        encoding=speech.RecognitionConfig.AudioEncoding.LINEAR16,
        sample_rate_hertz=frame_rate,
        language_code='en-US',
        enable_speaker_diarization=True,
        diarization_speaker_count=2)
    
    operation = client.long_running_recognize(request={"config":config, "audio":audio})
    response = operation.result(timeout=10000)
    result = response.results[-1]
    words_info = result.alternatives[0].words
    
    tag = 1
    speaker = ''
    
    for word_info in words_info:
        if word_info.speaker_tag == tag:
            speaker = speaker + " " + word_info.word
        else:
            transcript += "speaker {}: {}".format(tag,speaker) + '\n'
            tag = word_info.speaker_tag
            speaker = "" + word_info.word
    
    transcript += "speaker {}: {}".format(tag,speaker)
    
    print("Deleting audio file from Google bucket.")
    delete_blob(bucket_name, dest_blob_name)
    print("Successfully deleted from Google bucket.")
    return transcript

if __name__ == "__main__":
    for audio_file_name in os.listdir(filepath):
        print("Now processing ", audio_file_name)
        if audio_file_name.split('.')[1] != '.wav':
            transcript = google_transcribe(audio_file_name)
            transcript_filename = audio_file_name.split('.')[0] + '.txt'
            write_transcripts(transcript_filename,transcript)
            print(audio_file_name, " complete!")
    print("Transcript(s) uploaded to the following directory: ", output_FP)
    print("Program is complete.")
    