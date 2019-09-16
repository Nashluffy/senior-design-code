from pysndfx import AudioEffectsChain
#Reverb takes 7 parameters:
    #Reverberance
    #High-Frequency Damping
    #Room Scale
    #Stereo Depth
    #Pre-Delay
    #Wet Gain
    #Wet Only

inf = '/tmp/download.wav'
outf = '/tmp/processed.wav'

def SmallRoom():
    try:
        fx = (AudioEffectsChain().reverb(34, 60, 20, 100, 20, 0, False))
        pysndfx.fx(inf, outf)
        print ('Successfully applied small room!')
        return 'Successfully applied small room!'
    except Exception as e:
        print (e)
        return 'Something wrong with SoX'

def TestMe():
     print('Reverb hit')
     return ('Hit me')

def ReflectiveRoom():
    try:
        fx = (AudioEffectsChain().reverb(80, 10, 10, 100, 40, 4, False).normalize())
        outf = outf + 'ReflectiveRoom.wav'
        pysndfx.fx(inf, outf)
        print('Sucessfully applied reflective room!')
    except:
        print('Something wrong with SoX')

def ReflectiveCave():
    try:
        fx = (AudioEffectsChain().reverb(100, 50, 100, 100, 50, 0, False))
        outf = outf + 'ReflectiveCave.wav'
        pysndfx.fx(inf, outf)
        print('Successfully applied reflective cave!')
    except:
        print('Something wrong with SoX')
def BigRoom():
    try:
        fx = (AudioEffectsChain().reverb(80, 75, 100, 50, 20, 0, False))
        outf = outf + 'BigHall.wav'
        pysndfx.fx(inf, outf)
        print('Sucessfully applied big hall!')
    except:
        print('Something wrong with SoX')
