from pysndfx import AudioEffectsChain
import os
import shutil
import pydub
from pydub import AudioSegment
#Reverb takes 7 parameters:
    #Reverberance
    #High-Frequency Damping
    #Room Scale
    #Stereo Depth
    #Pre-Delay
    #Wet Gain
    #Wet Only

inf = "download.ogg"
outdir = "processed.ogg"

def getFile():
    AudioSegment.from_file('/opt/app/src/download.ogg').export('/opt/app/src/download.ogg', format="ogg")
    shutil.move('/opt/app/src/download.ogg', '/usr/app/src/download.ogg')

def setFile():
    shutil.move('/usr/app/src/processed.ogg', '/opt/app/src/processed.ogg')


def SmallRoom():
    try:
        getFile()
        fx = (AudioEffectsChain().reverb(34, 60, 20, 100, 20, 0, False))
        outf = outdir
        fx(inf, outf)
        setFile()
        return 'Successfully applied small room!'
    except Exception as e:
        print (e)
        return e

def ReflectiveRoom():
    try:
        getFile()
        fx = (AudioEffectsChain().reverb(80, 10, 10, 100, 40, 4, False).normalize())
        outf = outdir
        fx(inf, outf)
        setFile()
        return 'Successfully applied reflective room!'
    except Exception as e:
        print(e)
        return e

def ReflectiveCave():
    try:
        getFile()
        fx = (AudioEffectsChain().reverb(100, 50, 100, 100, 50, 0, False))
        outf = outdir 
        fx(inf, outf)
        setFile()
        return 'Successfully applied reflective cave!'
    except Exception as e:
        print(e)
        return e

def BigRoom():
    try:
        getFile()
        fx = (AudioEffectsChain().reverb(80, 75, 100, 50, 20, 0, False))
        outf = outdir
        fx(inf, outf)
        setFile()
        return 'Sucessfully applied big hall!'
    except Exception as e:
        print(e)
        return e
