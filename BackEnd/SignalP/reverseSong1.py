
from pydub import AudioSegment

song = AudioSegment.from_wav("test.wav")
backwards = song.reverse()
backwards.export("revreseSong.wav", format = "wav")

