from flask import Flask, render_template, request
from actions import getKeywords

app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        url1 = request.form['url1']
        url2 = request.form['url2']
        url3 = request.form['url3']
        url4 = request.form['url4']
        url5 = request.form['url5']
        keywords = getKeywords([url1, url2, url3, url4, url5])
        keywords = keywords.items()
        return render_template('index.html', keywords = keywords, url1=url1, url2=url2, url3=url3, url4=url4, url5=url5)
    return render_template('index.html')

if __name__ == '__main__':
    app.run()