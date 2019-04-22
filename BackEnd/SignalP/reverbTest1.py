from pysndfx import AudioEffectsChain

fx = (
    AudioEffectsChain()
    .highshelf()
    .reverb()
    .phaser()
    .delay()
    .lowshelf()
)

inf = 'sd1audiotest.wav'
outf = 'output1.wav'
fx(inf, outf)
