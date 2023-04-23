# -*- coding: utf-8 -*-
"""
Created on Sun Apr 23 01:09:17 2023

@author: lei92
"""

from flask import Flask, request, jsonify
from PIL import Image
import numpy as np
import cv2
import pinecone

app = Flask (__name__)
pinecone.init(api_key="85607c65-715a-4e32-85c6-6a67bb3ce4ed", environment="us-west4-gcp")
index = pinecone.Index("karunimg")

@app.route ('/', methods = ['POST'])
def main():
    req = request.files.getlist ('file')
    for f in req:
        img = Image.open (f)
        data, vect = query (img)
        save_vector (vect, f.filename)
    
    return jsonify (data)
    
def preprocess (img):
    img = cv2.cvtColor (np.array (img), cv2.COLOR_BGR2GRAY)
    img = cv2.resize (img, (100, 100))
    img = img /255.0
    
    return tuple (img.flatten ())

def save_vector (vect, name):   
    index.upsert(vectors=[
            (name, vect)
        ])

def query (img):
    vect = preprocess (img)
    query_vector = index.query (top_k = 10, vector = vect)
    
    if len (query_vector ['matches']):
        for i, j in enumerate (query_vector ['matches']):
            return {'Match No: ':i, 'Vector ID: ':j['id'], 'Score: ':j['score']}, vect
        
    return {'response':'new record'}, vect
    
    
if __name__ == '__main__':
    app.run (debug = True, use_reloader = False)