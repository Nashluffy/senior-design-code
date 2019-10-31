from pysndfx import AudioEffectsChain
import os
import shutil
from pydub import AudioSegment

inf = 'download.ogg'
outdir = 'processed.ogg'


def getFile():
    AudioSegment.from_file('/opt/app/src/download.ogg').export('/opt/app/src/download.ogg', format="ogg")
    shutil.move('/opt/app/src/download.ogg', '/usr/app/src/download.ogg')

def setFile():
    shutil.move('/usr/app/src/processed.ogg', '/opt/app/src/processed.ogg')

def PhaserDefault():
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

def PhaserSpaceEffect():
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

def PhaserSubtle():
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

