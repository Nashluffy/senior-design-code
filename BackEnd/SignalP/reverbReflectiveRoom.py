from pysndfx import AudioEffectsChain

fx = (
    AudioEffectsChain()

    .reverb(80, 10, 10, 100, 40, 4, False)
    .normalize()
        #reverb takes 7 parameters: reverberance, high-freqnency damping,
        #room scale, stereo depth, pre-delay, wet gain and wet only (Truce or
        #False)
)

inf = 'sd1audiotest.wav'
outf = 'reverbReflectiveRoom.wav'
fx(inf, outf)