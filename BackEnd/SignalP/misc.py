from pydub import AudioSegment
import shutil
import pydub
import os

inf = "download.ogg"
outdir = "processed.ogg"

def getFile():
    AudioSegment.from_file('/opt/app/src/download.ogg').export('/opt/app/src/download.ogg', format="ogg")
    shutil.move('/opt/app/src/download.ogg', '/usr/app/src/download.ogg')

def setFile():
    shutil.move('/usr/app/src/processed.ogg', '/opt/app/src/processed.ogg')


def ReverseSong():
    try:
        getFile()
        song = AudioSegment.from_ogg(inf)
        backwards = song.reverse()
        backwards.export(outdir, format = "ogg")
        setFile()
        return 'Successfully applied small room!'
    except Exception as e:
        print (e)
        return e

