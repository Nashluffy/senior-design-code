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




def masterDefault():
    try:
        getFile()
        fx = (AudioEffectsChain().normalize().equalizer(10000, 1, 5).equalizer(20, 1, -10).equalizer(200, 1, 9).compand(.010, .1, 1.4, -30, -20, -20))
        outf = outdir 
        fx(inf, outf)
        setFile()
        return 'Successfully applied simple mastering!'
    except Exception as e:
        print(e)
        return e

def vocalsDefault():
    try:
        #getFile()
        #reduces bass of audio file and uses standard vocal compression parameters
        fx = (AudioEffectsChain().normalize().highpass(100, 0.707).equalizer(100, 100, -50).equalizer(750, 30, 5).equalizer(5000, 500, 3).compand(0.8, 1, 4, -25, -20, -20))
        outf = outdir 
        fx(inf, outf)
        #setFile()
        return 'Successfully applied default vocal mastering'
        print(e)
        return e
    except Exception as e:
        print(e)
        return e

def guitarDefault():
    try:
        getFile()
        fx = (AudioEffectsChain().normalize().equalizer(15000, 5000, -4).equalizer(3000, 1100, 4).equalizer(1000, 500, 3).equalizer(250, 150, -5).equalizer(20, 10, -40).compand(.010, .02, 2, -10, -20, -20))
        outf = outdir 
        fx(inf, outf)
        setFile()
        return 'Successfully applied guitar mastering!'
    except Exception as e:
        print(e)
        return e

def bassDefault():
    try:
        getFile()
        fx = (AudioEffectsChain().normalize().equalizer(20000, 15000, -25).equalizer(350, 250, 10).equalizer(50, 100, 5).compand(.050, .5, 11, -35, -20, -20))
        outf = outdir 
        fx(inf, outf)
        setFile()
        return 'Successfully applied bass mastering!'
    except Exception as e:
        print(e)
        return e

def drumsDefault():
    try:
        getFile()
        fx = (AudioEffectsChain().normalize().equalizer(250, 50, 10).equalizer(20000, 10000, 4).compand(.020, .1, 2, -30, -20, -20))
        outf = outdir 
        fx(inf, outf)
        setFile()
        return 'Successfully applied drums mastering!'
    except Exception as e:
        print(e)
        return e

def pianoDefault():
    try:
        getFile()
        fx = (AudioEffectsChain().normalize().equalizer(2500, 1000, 7).equalizer(100, 100, 5).compand(.020, .5, 1.4, -20, -20, -20))
        outf = outdir 
        fx(inf, outf)
        setFile()
        return 'Successfully applied piano mastering!'
    except Exception as e:
        print(e)
        return e


def customCompressor(attack, decay, ratio, threshold):
    try:
        getFile()
        fx = (AudioEffectsChain().normalize().compand( attack, decay, ratio, threshold, -20, -20))
        outf = outdir 
        fx(inf, outf)
        setFile()
        return 'Successfully applied piano mastering!'
    except Exception as e:
        print(e)
        return e

