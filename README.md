Description
===========
This is a timer application that is written using JavaScript.  This is as simple as it gets.

Usage
=====
There are two types of timers.

|Type|Description|
|----|-----------|
|Timer|A basic timer which starts with a specified time limit and counts down to zero.|
|Stopwatch|A stopwatch that starts at zero and counts up to infinity.|

You can create any number of timers and stopwatches and there is no limit to how many 
can be running at the same time.  When the page is loaded, the top buttons perform the
followingn actions.

|Button|Description|
|------|-----------|
|New Timer|Creates a new count down timer and adds it to the end of the list.  The timer will not be running until the start button is pushed.|
|New Stopwatch|Creates a new count up stopwarch and adds it to the end of the list.  The stopwatch will not be running until the start button is pushed.|
|Delete All|Stops and deletes all timers and stopwatches in the list|
|Reset All|Stops all timers and stopwatches and resets them to their **last edited** value.|
|Start All|Starts all timers and stopwatches that have not been started.|
|Stop All|Stops all timers and stopwatches that have been started.|

Under each timer or stopwatch, there are three individual buttons that allow you to manipulate the state
of said object.

|Button|Description|
|------|-----------|
|Start/Play|Starts the individual timer|
|Stop|Stops the individual timer|
|Reset|Stops and resets the timer to the **last edited** value.|
|Edit|Allows you to edit the current timer value.|
|Delete|The x button in the upper right stops and removes the timer from the list.|

When you are editing a timer or stopwatch, you can cancel the operation by clicking the *cancel* button, or accept the edit by clicking the *accept* button.  If you accept the edit, the new value will be the **last edited** value and will be defaulted to on reset.

License
=======
[The MIT License](https://opensource.org/licenses/MIT)

SPDX short identifier: MIT

Copyright 2017 Anthony Bonta

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.