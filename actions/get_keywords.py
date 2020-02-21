from models import KeywordExtractor

def getKeywords(url):
    ke = KeywordExtractor(url)
    return ke.getKeywords()

