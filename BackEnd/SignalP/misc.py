from pydub import AudioSegment
from pysndfx import AudioEffectsChain
import pysndfx
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


def Reset():
    try:
        getFile()
        song = AudioSegment.from_ogg(inf)
        backwards = song.normalize()
        backwards.export(outdir, format = "ogg")
        setFile()
        return 'Successfully applied no effect!'
    except Exception as e:
        print (e)
        return e

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

def SpeedUp2x():
    try:
        getFile()
        fx = (AudioEffectsChain().normalize().speed(2,False))
        outf = outdir 
        fx(inf, outf)
        setFile()
        return 'Successfully applied speed up 2x!'
    except Exception as e:
        print(e)
        return e

def SlowDownHalf():
    try:
        getFile()
        fx = (AudioEffectsChain().normalize().speed(0.5,False))
        outf = outdir 
        fx(inf, outf)
        setFile()
        return 'Successfully applied slow down by half!'
    except Exception as e:
        print(e)
        return e
