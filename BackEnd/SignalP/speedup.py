from pysndfx import AudioEffectsChain
import os
import shutil

inf = 'download.ogg'
outdir = 'processed.ogg'

def getFile():
    shutil.move('/opt/app/src/download.wav', '/usr/app/src/download.wav')

def setFile():
    shutil.move('/usr/app/src/processed.wav', '/opt/app/src/processed.wav')


def speedUpx2():
    try:
        getFile()
        fx = (AudioEffectsChain().normalize().speed(2,False))
        outf = outdir 
        fx(inf, outf)
        setFile()
        return 'Successfully applied simple mastering!'
    except Exception as e:
        print(e)
        return e
def slowDownHalf():
    try:
        getFile()
        fx = (AudioEffectsChain().normalize().speed(0.5,False))
        outf = outdir 
        fx(inf, outf)
        setFile()
        return 'Successfully applied simple mastering!'
    except Exception as e:
        print(e)
        return e
