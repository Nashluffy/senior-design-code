#sudo pip install ffmpeg
#sudo pip install pydub

import sys
import os
from pydub import AudioSegment
import ffmpeg

def exportFile(fileName):
    fileName = os.path.abspath(os.path.expanduser(fileName))
    if not os.path.exists(fileName):
        print("File not found. Please check path.", file=sys.stderr)
        sys.exit(1)
    else:
        AudioSegment.from_wav(fileName).export("/home/nash/Code/SkyAudio/file.mp3", format="mp3")


if __name__ == '__main__':
   exportFile("/home/nash/Code/SkyAudio/Sample.wav")
