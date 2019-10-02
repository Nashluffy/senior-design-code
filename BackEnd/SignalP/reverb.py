from pysndfx import AudioEffectsChain
import os
import shutil

#Reverb takes 7 parameters:
    #Reverberance
    #High-Frequency Damping
    #Room Scale
    #Stereo Depth
    #Pre-Delay
    #Wet Gain
    #Wet Only

inf = "download.wav"
outdir = "processed.wav"

def getFile():
    shutil.move('/opt/app/src/download.wav', '/usr/app/src/download.wav')

def setFile():
    shutil.move('/usr/app/src/processed.wav', '/opt/app/src/processed.wav')


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
