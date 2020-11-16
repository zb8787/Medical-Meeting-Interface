filepath = 'output_transcript/' #input transcript file path
#audio_file_name = 'podcast1_1min.txt' #input transcript file name
audio_file_name = 'abc.txt'

from google.cloud import language
from google.cloud.language import types
from google.cloud.language import enums

client = language.LanguageServiceClient()

fullpath = filepath + audio_file_name

text = 'How many pills should I take each day? You should take two pills every six hours, up to three times.'
def text_entity_analysis(text):
#Analyzes the entities of a text file
    document = types.Document(
        content=text,
        type=enums.Document.Type.PLAIN_TEXT)
        
    entities = client.analyze_entities(document).entities
    print(entities)
    for entity in entities:
        print(u"Representative name for the entity: {}".format(entity.name))
        print(u"Entity type: {}".format(enums.Entity.Type(entity.type).name))
        print(u"Salience score: {}".format(entity.salience))
        for metadata_name, metadata_value in entity.metadata.items():
                print(u"{}: {}".format(metadata_name, metadata_value))
        for mention in entity.mentions:
                print(u"Mention text: {}".format(mention.text.content))
        print(
                    u"Mention type: {}".format(enums.EntityMention.Type(mention.type).name)
                )

def classify_text(text):
#Classifies content categories of a text file
    document = types.Document(
        content=text,
        type=enums.Document.Type.PLAIN_TEXT)
    
    categories = client.classify_text(document).categories
    print(categories)
    #for category in categories

text_entity_analysis(text)
print('TEXT: ',text)
print('CLASS:')
classify_text(text)


# #Classify text
# f = open(fullpath)
# t = f.read()
# print(t)
# classify_text(t)
# f.close()

##Search transcript for string, return 1 line
# f = open(fullpath)
# for line in f:
    # if "May" in line: print(line)
# f.close()

##Search transcript for string, return 1 line before, up to 3 lines after
# f = open(fullpath)
# SL = f.readlines()
# for i, line in enumerate(SL):
    # if "May" in line:
        # for L in SL[i-1:i+3]:
            # print(L)



# f.close()
