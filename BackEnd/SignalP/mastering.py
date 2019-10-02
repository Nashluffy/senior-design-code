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

inf = 'download.wav'
outf = 'processed.wav'


def getFile():
    shutil.move('/opt/app/src/download.wav', '/usr/app/src/download.wav')

def setFile():
    shutil.move('/usr/app/src/processed.wav', '/opt/app/src/processed.wav')




def SmallRoom():
    try:
        getFile()
        fx = (AudioEffectsChain().equalizer(10000, 1, 3).equalizer(20, 1, -10).limiter(3).normalize().compand(0.2, 1, 2.0, -20, -20, -20))
        outf = outf 
        fx(inf, outf)
        setFile()
        return 'Successfully applied simple mastering!'
    except Exception as e:
        print(e)
        return e

