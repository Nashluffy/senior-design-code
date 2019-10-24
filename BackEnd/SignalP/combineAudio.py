from pydub import AudioSegment

sound1 = AudioSegment.from_file("download.ogg")
sound2 = AudioSegment.from_file("download2.ogg")


combined = sound1.overlay(sound2)

combined.export("processed.ogg", format='ogg')