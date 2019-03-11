
from pydub import AudioSegment

song = AudioSegment.from_wav("sd1audiotest.wav")
backwards = song.reverse()
backwards.export("audiotest.mp3", format = "mp3")

