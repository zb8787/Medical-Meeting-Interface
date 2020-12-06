filepath = 'output_transcript/' #input transcript file path
#audio_file_name = 'podcast1_1min.txt' #input transcript file name
audio_file_name = 'abc.txt'

from google.cloud import language
from google.cloud.language import types
from google.cloud.language import enums

client = language.LanguageServiceClient()

fullpath = filepath + audio_file_name

SearchTerm = "Aspirin"

#Search transcript for string, return 1 line
print("-----------------------------")
print("SearchTerm: ",SearchTerm)
print("Searching for SearchTerm..\n")
count = 0
f = open(fullpath)
for line in f:
    if SearchTerm in line:
        print(line)
        count = count+1
print("\n",count,"lines with SearchTerm found")
f.close()

print("-----------------------------")

#Search transcript for string, return 1 line before, up to 3 lines after
print("SearchTerm: ",SearchTerm)
print("Searching for SearchTerm with context..\n")
count = 0
f = open(fullpath)
SL = f.readlines()
for i, line in enumerate(SL):
    if SearchTerm in line:
        for L in SL[i-1:i+3]:
            print(L)
        count = count+1
        print("* * *")
print("\n",count,"lines with SearchTerm found")


f.close()