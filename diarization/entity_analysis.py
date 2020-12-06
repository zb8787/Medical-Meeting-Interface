filepath = 'output_transcript/' #input transcript file path
#audio_file_name = 'podcast1_1min.txt' #input transcript file name
audio_file_name = 'abc.txt'

from google.cloud import language
from google.cloud.language import types
from google.cloud.language import enums

client = language.LanguageServiceClient()

fullpath = filepath + audio_file_name

#text = 'How many pills should I take each day? You should take two pills every six hours, up to three times.'
f = open(fullpath)
text = f.read()
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
f.close()
