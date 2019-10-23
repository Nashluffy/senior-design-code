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

inf = 'quiet.wav'
outdir = 'processed.wav'


def getFile():
    shutil.move('/opt/app/src/download.wav', '/usr/app/src/download.wav')

def setFile():
    shutil.move('/usr/app/src/processed.wav', '/opt/app/src/processed.wav')


def phaserDefault():
    try:
        getFile()
        fx = (AudioEffectsChain().normalize().phaser(1, 1, 2, 0.25, 2, False))
        outf = outdir 
        fx(inf, outf)
        setFile()
        return 'Successfully applied simple mastering!'
    except Exception as e:
        print(e)
        return e

def phaserSpaceEffect():
    try:
        getFile()
        fx = (AudioEffectsChain().normalize().phaser(1, 1, 2, 0.5, 2, False))
        outf = outdir 
        fx(inf, outf)
        setFile()
        return 'Successfully applied simple mastering!'
    except Exception as e:
        print(e)
        return e

def phaserSubtle():
    try:
        getFile()
        fx = (AudioEffectsChain().normalize().phaser(1, 0.9, 2, 0.5, 0.5, False))
        outf = outdir 
        fx(inf, outf)
        setFile()
        return 'Successfully applied simple mastering!'
    except Exception as e:
        print(e)
        return e

