from pysndfx import AudioEffectsChain
#Reverb takes 7 parameters:
    #Reverberance
    #High-Frequency Damping
    #Room Scale
    #Stereo Depth
    #Pre-Delay
    #Wet Gain
    #Wet Only

inf = 'files/test.wav'
outf = 'files/output'

def SmallRoom():
    try:
        fx = (AudioEffectsChain().equalizer(10000, 1, 3).equalizer(20, 1, -10).limiter(3).normalize().compand(0.2, 1, 2.0, -20, -20, -20))
        outf = outf + 'SmallRoom.wav'
        fx(inf, outf)
        print('Successfully applied simple mastering!')
    except Exception as e:
        print(e)
        return e

