#this import below needs to either specify the pysndfx location
#like: 
#from directoryHome.libraries.python-audio-effect-master.pysndfx import AudioEffectsChain
#I'm not sure where the libraries are located within the virtual env so nash will have to test it
#OR you can just have the python files inside of the directory.

from pysndfx import AudioEffectsChain
#Reverb takes 7 parameters:
    #Reverberance
    #High-Frequency Damping
    #Room Scale
    #Stereo Depth
    #Pre-Delay
    #Wet Gain
    #Wet Only



#The binary error came from how we were calling the input and output file
inf = '~/SkyAudio/SkyAudio/SampleFiles/Sample.wav'
outf = '~/SkyAudio/SkyAudio/SampleFiles/reverb'

def SmallRoom(waveform):
    try:
        fx = (AudioEffectsChain().reverb(34, 60, 20, 100, 20, 0, False))
        outf = outf + 'SmallRoom.wav'
        #I took out the pysndfx.fx call and just called the function directly
        fx(waveform, outf)
        return 'Successfully applied small room!'
    except:
        print ('Something wrong with SoX')

def ReflectiveRoom():
    try:
        fx = (AudioEffectsChain().reverb(80, 10, 10, 100, 40, 4, False).normalize())
        outf = outf + 'ReflectiveRoom.wav'
        fx(inf, outf)
        print('Sucessfully applied reflective room!')
    except:
        print('Something wrong with SoX')

def ReflectiveCave():
    try:
        fx = (AudioEffectsChain().reverb(100, 50, 100, 100, 50, 0, False))
        outf = outf + 'ReflectiveCave.wav'
        fx(inf, outf)
        print('Successfully applied reflective cave!')
    except:
        print('Something wrong with SoX')
def BigRoom():
    try:
        fx = (AudioEffectsChain().reverb(80, 75, 100, 50, 20, 0, False))
        outf = outf + 'BigHall.wav'
        fx(inf, outf)
        print('Sucessfully applied big hall!')
    except:
        print('Something wrong with SoX')
