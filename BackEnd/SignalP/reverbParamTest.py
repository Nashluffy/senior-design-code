from pysndfx import AudioEffectsChain

fx = (
    AudioEffectsChain()

    .reverb(100, 50, 10, 100, 20, 0, False)
)

inf = 'sd1audiotest.wav'
outf = 'reverbParamChanges.wav'
fx(inf, outf)