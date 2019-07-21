# This file is part of audioread.
# Copyright 2011, Adrian Sampson.
#
# Permission is hereby granted, free of charge, to any person obtaining
# a copy of this software and associated documentation files (the
# "Software"), to deal in the Software without restriction, including
# without limitation the rights to use, copy, modify, merge, publish,
# distribute, sublicense, and/or sell copies of the Software, and to
# permit persons to whom the Software is furnished to do so, subject to
# the following conditions:
#
# The above copyright notice and this permission notice shall be
# included in all copies or substantial portions of the Software.


#sudo pacman -S python-pip (Arch Linux)
#sudo pip install wave
#sudo pip install pygobject
#sudo pip install gstreamer
#sudo pip install audioread
#sudo pip install boto3

import sys
import os
import audioread
import contextlib
import wave
import boto3
import botocore
import traceback
import audioread.gstdec

#Create event handler to handle S3 action
def lambda_handler(event, context):
    file_name = event['Records'][0]['s3']['object']['key']
    print(file_name)
    bucketPull(file_name)
    decode(file_name)
    bucketPush(file_name)
    

#Create S3 resource & define properties
s3 = boto3.resource('s3')
BUCKET_NAME = 'django-file-storage'
IMPORT_FOLDER = 'RawFiles/{}'
EXPORT_FOLDER = 'ConvertedFiles/{}'
IMPORT_BUCKET = 'skyaudio.files.raw'
EXPORT_BUCKET = 'skyaudio.files.converted'

#Pulling file from AWS S3 Bucket
def bucketPull(file_name):
    try:
        s3.Bucket(IMPORT_BUCKET).download_file(file_name, '/tmp/' + file_name) 
        print("File downloaded to tmp directory succesfully!")
    except botocore.exceptions.ClientError as e:
        if e.response['Error']['Code'] == "404":
            print("The object does not exist.")
        else:
            raise

#Pushing the converted file back to the bucket
def bucketPush(file_name):
    try:
        s3.Bucket(EXPORT_BUCKET).upload_file(('/tmp/' + file_name  + '.wav'), (file_name + '.wav')) #Upload call
        print("File uploaded successfully!")
    finally:
        os.remove('/tmp/' + file_name + '.wav') #Delete converted file from tmp directory
        os.remove('/tmp/' + file_name) #Delete converted



#Convert file
def decode(file_name):
    file_location = os.path.abspath(os.path.expanduser('/tmp/' + file_name))
    #audioread.ffdec.available()
    if not os.path.exists(file_location):
        print("File not found. Please check path.", file=sys.stderr)
        sys.exit(1)
    else:
        print("File can be located")
    try:
        with audioread.gstdec.GstAudioFile(file_location) as f:
            print('Input file: %i channels at %i Hz; %.1f seconds.' %
                  (f.channels, f.samplerate, f.duration),
                  file=sys.stderr)
            print('Backend:', str(type(f).__module__).split('.')[1],
                  file=sys.stderr)

            with contextlib.closing(wave.open(file_location + '.wav', 'w')) as of:
                of.setnchannels(f.channels)
                of.setframerate(f.samplerate)
                of.setsampwidth(2)

                for buf in f:
                    of.writeframes(buf)

    except audioread.DecodeError:
        exc_type, exc_value, exc_traceback = sys.exc_info()
        traceback.print_tb(exc_traceback, limit = None, file=sys.stdout)
    #    print("File could not be decoded.", file=sys.stderr)
    #    sys.exit(1)
