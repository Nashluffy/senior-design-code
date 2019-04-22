/*
 * This is a JavaScript Scratchpad.
 *
 * Enter some JavaScript, then Right Click or choose from the Execute Menu:
 * 1. Run to evaluate the selected text (Ctrl+R),
 * 2. Inspect to bring up an Object Inspector on the result (Ctrl+I), or,
 * 3. Display to insert the result in a comment after the selection. (Ctrl+L)
 */


/*
Using the below call, a stereo buffer will be created that will last for .5 seconds 
22050 frames/44100Hz = .5 seconds
*/

var context = new AudioContext();
var buffer = context.createBuffer(2, 22050, 44100);

/*
The Web Audio API uses a planar buffer format, meaning the left and right channels are stored as follows
LLLLLLLLLLLLLLLLRRRRRRRRRRRRRRRR (for a buffer of 16 frames)

Alternative is an interleaved buffer format, below
LRLRLRLRLRLRLRLRLRLRLRLRLRLRLRLR (for a buffer of 16 frames)
*/

