from pysndfx import AudioEffectsChain

fx = (
    AudioEffectsChain()

    .reverb(100, 50, 100, 100, 50, 0, False)
)

inf = 'sd1audiotest.wav'
outf = 'reverbReflectiveCave.wav'
fx(inf, outf)