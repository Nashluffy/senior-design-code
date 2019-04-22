from pysndfx import AudioEffectsChain

fx = (
    AudioEffectsChain()

    .reverb(80, 75, 100, 50, 20, 0, False)
)

inf = 'sd1audiotest.wav'
outf = 'reverbBigHall.wav'
fx(inf, outf)