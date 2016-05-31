window.onload = function() {

    //Video
    var video = document.getElementById("video");
    
    //Buttons
    var playButton = document.getElementById("play-pause");
    var muteButton = document.getElementById("mute");
    var fullScreenButton = document.getElementById("full-screen");
    var closedCaptionButton = document.getElementById("closed-caption");
    var volumeUpButton = document.getElementById("volume-up");
    var volumeDownButton = document.getElementById("volume-down");
    var rewind10SecButton = document.getElementById("rewind-10");

    //Progress Bars
    var seekBar = document.getElementById("seek-bar");
    var bufferedBar = document.getElementById("buffered-bar"); 
    
    //Transcript
    var textTranscript = document.getElementById("text-transcript");
    
    //JSON for cue start/end times & text
    var syncData = [
          {"start": "0.01","end": "7.535","text": "Now that we've looked at the architecture of the internet, let's see how you might connect your personal devices to the internet inside your house."},
          {"start": "7.536","end": "13.960","text": "Well there are many ways to connect to the internet, and most often people connect wirelessly."},
          {"start": "13.961","end": "17.940","text": "Let's look at an example of how you can connect to the internet."},
          {"start": "17.941","end": "30.920","text": "If you live in a city or a town, you probably have a coaxial cable for cable Internet, or a phone line if you have DSL, running to the outside of your house, that connects you to the Internet Service Provider, or ISP."},
          {"start": "32.100","end": "41.190","text": "If you live far out in the country, you'll more likely have a dish outside your house, connecting you wirelessly to your closest ISP, or you might also use the telephone system."},
          {"start": "42.350","end": "53.760","text": "Whether a wire comes straight from the ISP hookup outside your house, or it travels over radio waves from your roof, the first stop a wire will make once inside your house, is at your modem."},
          {"start": "53.761","end": "57.780","text": "A modem is what connects the internet to your network at home."},
          {"start": "57.781","end": "59.000","text": "A few common residential modems are DSL or..."}            
        ];
        
      //Call function to create transcript on page 
      createTranscript();

    
    //FUNCTIONS
        
        //Creates the transcript content on the page using JSON
        function createTranscript() {
            var element;
            for (var i = 0; i < syncData.length; i++) {
                element = document.createElement('span');
                element.cue = syncData[i];
                element.innerText = syncData[i].text + " ";
                textTranscript.appendChild(element);
            }
        }
        
        // Play-Pause Video
        function playVideo() {
            if (video.paused === true) {
            	// Play the video
            	video.play();
                //Update button img to Pause icon
                document.getElementById("play-pause-icon").src = "icons/play-icon.png";
            } else {
                //Pause the video
                video.pause();
                //Update button img to Play icon
                document.getElementById("play-pause-icon").src = "icons/pause-icon.png";
            }
        }
    
        // Mute Video
        function muteVideo() {
            if (video.muted === false) {
        		// Mute the video
        		video.muted = true;
        		// Update the button image to Volume Off
            document.getElementById("mute-icon").src = "icons/volume-off-icon.png";
        	} else {
        		// Unmute the video
        		video.muted = false;
        		// Update the button image to Volume Off
                document.getElementById("mute-icon").src = "icons/volume-on-icon.png";
        	}
        }
        
        // Full Screen Video
        function fullScreen() {
            if (video.requestFullscreen) {
            		video.requestFullscreen();
        	} else if (video.mozRequestFullScreen) {
        		video.mozRequestFullScreen(); // Firefox
        	} else if (video.webkitRequestFullscreen) {
        		video.webkitRequestFullscreen(); // Chrome and Safari
        	}
        }
        
        // Toggle Closed Captions (Subtitles)
        function closedCaptions() {
            if (video.textTracks[0].mode == "showing") {
            	// Turn off captions
            	video.textTracks[0].mode = "hidden";
            	// Update the CC button image to CC off
                document.getElementById("closed-caption-icon").src = "icons/closed-caption-off-icon.png";
            } else {
            	// Turn captions on
            	video.textTracks[0].mode = "showing";
            	// Update the CC button image to CC On
                document.getElementById("closed-caption-icon").src = "icons/closed-caption-icon.png";
            }    
        }
        
        //Get Video Current Time in min/sec
         function currentTime() {
            var video = document.getElementById("video");
            var minutes = parseInt(video.currentTime / 60, 10);
            var seconds = parseInt(video.currentTime % 60, 10);
            if (seconds < 10) {
                seconds = "0" + parseInt(video.currentTime % 60, 10); //leading zero
            }
            return minutes + ":" + seconds;
        }
            //Update Video Timer Text with current time
             video.ontimeupdate = function() {
                 document.getElementById("current-time").innerHTML = currentTime();
             };
            
        //Get Video Duration in min/sec
        function duration() {
            var video = document.getElementById("video");
            var minutes = parseInt(video.duration / 60, 10);
            var seconds = parseInt(video.duration % 60);
            return minutes + ":" + seconds;
        }
            //Update Video Duration Text with video duration
            document.getElementById("duration").innerHTML = duration();
        
        //Fill the Seek Bar with progress color as the video plays   
        function seekProgress() {
            // Calculate the seek bar progress value
    		var value = (100 / video.duration) * video.currentTime;
    		// Update the seek bar value
    		seekBar.value = value;
        }
        
        // Fill the Buffered Bar with progress color as the video loads/plays
        function bufferProgress() {
            // Calculate the buffered bar progress value
    		var value = (100 / video.duration) * video.buffered.end(0);
    		// Update the buffered bar value
    		bufferedBar.value = value;
        }
        
        //Increase Volume
        function volumeUp() {
            video.volume+=0.1;
        }
        
        //Decrease Volume
        function volumeDown() {
            video.volume-=0.1;
        }
              
        //Reset Video Start Time to start time from matching text & play video
        function textJump(e) {
             video.currentTime = e.target.cue.start;
             video.play();
         }
         
        //Rewinds Video 10 seconds from current time
        function rewind10Sec() {
            video.currentTime = video.currentTime - 10;
        }
        
        
    //Event Handling        
        
        //Event listener for play-pause button
        playButton.addEventListener("click", playVideo);
                
        // Event listener for the mute button
     	muteButton.addEventListener("click", muteVideo); 
     	     
        // Event listener for the full-screen button
        fullScreenButton.addEventListener("click", fullScreen); 
                
        // Event listener for the closed-caption button
        closedCaptionButton.addEventListener("click", closedCaptions);
                
        // Event listener for seekbar progress indication
        video.addEventListener("timeupdate", seekProgress);
                
        // Event listener for buffer progress indication
        video.addEventListener("timeupdate", bufferProgress);
                
        // Event listener for updating playbar to seekbar click
        seekBar.addEventListener("click", function(event) {
            var barClick = event.offsetX / this.offsetWidth;
            video.currentTime = barClick * video.duration;
            seekBar.value = barClick / 100;
        });
    
        //Event listener for end of video to set back to start
        video.addEventListener("timeupdate", function(event) {
            if (video.currentTime == video.duration) {
                video.pause();
                video.currentTime = 0;
            }
        });
        
        //Event listener for volume up
        volumeUpButton.addEventListener("click", volumeUp);
    
        //Event listener for volume down
        volumeDownButton.addEventListener("click", volumeDown);
   
        //Event listener for text transcript highlight changes
        video.addEventListener("timeupdate", function(e) {
            syncData.forEach(function(element, index, array){
                if( video.currentTime >= element.start && video.currentTime <= element.end )
                    textTranscript.children[index].classList.remove("inactive-cue");
                    textTranscript.children[index].classList.add("active-cue");
                    if (video.currentTime < element.start || video.currentTime > element.end) {
                        textTranscript.children[index].classList.remove("active-cue");
                        textTranscript.children[index].classList.add("inactive-cue");  
                    } 
            });
        });

        //Event listener for text click on transcript
            //When span is clicked
            var sentences = textTranscript.getElementsByTagName('span');
            for (var i = 0; i < sentences.length; i++) {
                sentences[i].addEventListener("click", textJump); //Call textJump function
            }
            
        //Event listener for rewind 10 seconds button
        rewind10SecButton.addEventListener("click", rewind10Sec);
        
          
}; //End window.onload

