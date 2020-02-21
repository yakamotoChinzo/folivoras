import requests
from string import punctuation
from bs4 import BeautifulSoup
import spacy
from sklearn.feature_extraction.text import TfidfTransformer, CountVectorizer

class KeywordExtractor:
    def __init__(self, urls):
        self.nlp = spacy.load('en_core_web_sm')
        self.urls = urls
        self.urlsData = []
        self.descriptions = []
        self.normDesc = []
    
    def scrappeData(self):
        for url in self.urls:
            self.urlsData.append(requests.get(url))
    
    def searchDescriptions(self):
        for data in self.urlsData:
            soup = BeautifulSoup(data.text)
            for link in soup.find_all('div'):
                if link.get('jsname') == "sngebd":
                    self.descriptions.append(link.text)

    def preprocessDescriptions(self):
        for description in self.descriptions:
            print(description)
            doc = self.nlp(description)
            for sentence in doc.sents:
                tokens = []
                for token in sentence:
                    if not token.is_punct and not token.is_stop and not token.like_url and not token.like_email:
                        t = ''.join([c for c in token.norm_ if c not in punctuation])
                        tokens.append(t)
                if len(tokens)>0:
                    self.normDesc.append(' '.join(tokens))

    def build_preprocessedDescription(self):
        self.scrappeData()
        self.searchDescriptions()
        self.preprocessDescriptions()
    
    def sort_coo(self, coo_matrix):
        tuples = zip(coo_matrix.col, coo_matrix.data)
        return sorted(tuples, key=lambda x: (x[1], x[0]), reverse=True)
    
    def extract_topn_from_vector(self,feature_names, sorted_items, topn=10):
        """get the feature names and tf-idf score of top n items"""
    
        #use only topn items from vector
        sorted_items = sorted_items[:topn]

        score_vals = []
        feature_vals = []

        for idx, score in sorted_items:
            fname = feature_names[idx]
            
            #keep track of feature name and its corresponding score
            score_vals.append(round(score, 3))
            feature_vals.append(feature_names[idx])

        #create a tuples of feature,score
        #results = zip(feature_vals,score_vals)
        results= {}
        for idx in range(len(feature_vals)):
            results[feature_vals[idx]]=score_vals[idx]
        
        return results

    def getKeywords(self):
        self.build_preprocessedDescription()
        cv = CountVectorizer(max_features=1000, max_df=0.85, ngram_range=(2, 3))
        word_count_vector = cv.fit_transform(self.normDesc)
        tfidf_transformer = TfidfTransformer(smooth_idf=True, use_idf=True, )
        tf_idf_vector = tfidf_transformer.fit_transform(word_count_vector)
        feature_names = cv.get_feature_names()
        #sort the tf-idf vectors by descending order of scores
        sorted_items= self.sort_coo(tf_idf_vector.tocoo())

        #extract only the top n; n here is 10
        keywords = self.extract_topn_from_vector(feature_names, sorted_items, 100)
        return keywords
    
