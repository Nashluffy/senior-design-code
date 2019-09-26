from pysndfx import AudioEffectsChain


#Reverb takes 7 parameters:
    #Reverberance
    #High-Frequency Damping
    #Room Scale
    #Stereo Depth
    #Pre-Delay
    #Wet Gain
    #Wet Only

inf = "files/download.wav"
outdir = "files/output"

def SmallRoom():
    try:
        fx = (AudioEffectsChain().reverb(34, 60, 20, 100, 20, 0, False))
        outf = outdir + 'ReverbSmallRoom.wav'
        fx(inf, outf)
        return 'Successfully applied small room!'
    except Exception as e:
        print (e)
        return e

def ReflectiveRoom():
    try:
        fx = (AudioEffectsChain().reverb(80, 10, 10, 100, 40, 4, False).normalize())
        outf = outdir + 'ReverbReflectiveRoom.wav'
        fx(inf, outf)
        print('Sucessfully applied reflective room!')
    except Exception as e:
        print(e)
        return e

def ReflectiveCave():
    try:
        fx = (AudioEffectsChain().reverb(100, 50, 100, 100, 50, 0, False))
        outf = outdir + 'ReverbReflectiveCave.wav'
        fx(inf, outf)
        print('Successfully applied reflective cave!')
    except Exception as e:
        print(e)
        return e

def BigRoom():
    try:
        fx = (AudioEffectsChain().reverb(80, 75, 100, 50, 20, 0, False))
        outf = outdir + 'ReverbBigHall.wav'
        fx(inf, outf)
        print('Sucessfully applied big hall!')
    except Exception as e:
        print(e)
        return e
