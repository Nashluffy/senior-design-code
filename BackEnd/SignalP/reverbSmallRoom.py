from pysndfx import AudioEffectsChain

fx = (
    AudioEffectsChain()

    .reverb(34, 60, 20, 100, 20, 0, False)
    #reverb takes 7 parameters: reverberance, high-freqnency damping,
    #   room scale, stereo depth, pre-delay, wet gain and wet only (Truce or
    #   False)
)

inf = 'sd1audiotest.wav'
outf = 'reverbSmallRoom.wav'
fx(inf, outf)