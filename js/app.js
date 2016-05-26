window.onload = function() {

    //Video
    var video = document.getElementById("video");
    
    //Buttons
    var playButton = document.getElementById("play-pause");
    var muteButton = document.getElementById("mute");
    var fullScreenButton = document.getElementById("full-screen");
    var closedCaptionButton = document.getElementById("closed-caption");

    //Progress Bars
    var seekBar = document.getElementById("seek-bar");
    var bufferedBar = document.getElementById("buffered-bar"); 
    
    
    //Functions
    
        // Play-Pause Video
        function playVideo() {
            if (video.paused == true) {
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
            if (video.muted == false) {
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
                console.log(video.textTracks[0].mode);
            }    
        }
        
        //Update current time of video as it plays
         function currentTime() {
            var video = document.getElementById("video");
            var minutes = parseInt(video.currentTime / 60, 10);
            var seconds = parseInt(video.currentTime % 60, 10);
            if (seconds < 10) {
                seconds = "0" + parseInt(video.currentTime % 60, 10);
            }
            return minutes + ":" + seconds;
        }
            //Update video timer text with current time
             video.ontimeupdate = function() {
                 document.getElementById("current-time").innerHTML = currentTime();
             };
            
        //Update video time with actual duration
        function duration() {
            var video = document.getElementById("video");
            var minutes = parseInt(video.duration / 60, 10);
            var seconds = parseInt(video.duration % 60);
            return minutes + ":" + seconds;
        }
            //Update video timer text with video duration
            document.getElementById("duration").innerHTML = duration();
        
        //Fill the seek bar with progress color as the video plays   
        function seekProgress() {
            // Calculate the seek bar progress value
    		var value = (100 / video.duration) * video.currentTime;
    
    		// Update the seek bar value
    		seekBar.value = value;
        }
        
        // Fill the buffered bar with progress color as the video plays
        function bufferProgress() {
            // Calculate the buffered bar progress value
    		var value = (100 / video.duration) * video.buffered.end(0);
    
    		// Update the buffered bar value
    		bufferedBar.value = value;
        }
           
        
    //Event Handling        
        
        //Event listener for play-pause button
        playButton.addEventListener("click", function() {
        	playVideo();
        });
        
        // Event listener for the mute button
     	muteButton.addEventListener("click", function() {
            muteVideo();     		
     	});
     
        // Event listener for the full-screen button
        fullScreenButton.addEventListener("click", function() {
            fullScreen();
        });
        
        // Event listener for the closed-caption button
        closedCaptionButton.addEventListener("click", function() {            	
            closedCaptions();	
        });
        
        // Event handler for seekbar progress indication
        video.addEventListener("timeupdate", function() {
            seekProgress();	
        }); 
        
        // Event handler for buffer progress indication
        video.addEventListener("timeupdate", function() {
            bufferProgress();	
        }); 
        
        // Event handler for updating playbar to seekbar click
        seekBar.addEventListener("click", function(event) {
            var barClick = event.offsetX / this.offsetWidth;
            video.currentTime = barClick * video.duration;
            seekBar.value = barClick / 100;
        });
    
    
    // Interactive Transcript
        // Event listener for video playback changes, timeUpdate
        // Need CSS class for highlight text, applied to each sentence in <p>
        // When clicking sentence, highlight class is applied
        // When clicking sentence, video.CurrentTime is updated to new time that matches cue in vtt
            // Create an array/object of cues? end start text

      var textTranscript = document.getElementById("text-transcript");
      var syncData = [
            {"start": "0","end": "7.535","text": "Now that we've looked at the architecture of the internet, let's see how you might connect your personal devices to the internet inside your house."},
            {"start": "7.536","end": "13.960","text": "Well there are many ways to connect to the internet, and most often people connect wirelessly."},
            {"start": "13.961","end": "17.940","text": "Let's look at an example of how you can connect to the internet."},
            {"start": "17.941","end": "30.920","text": "If you live in a city or a town, you probably have a coaxial cable for cable Internet, or a phone line if you have DSL, running to the outside of your house, that connects you to the Internet Service Provider, or ISP."},
            {"start": "32.100","end": "41.190","text": "If you live far out in the country, you'll more likely have a dish outside your house, connecting you wirelessly to your closest ISP, or you might also use the telephone system."},
            {"start": "42.350","end": "53.760","text": "Whether a wire comes straight from the ISP hookup outside your house, or it travels over radio waves from your roof, the first stop a wire will make once inside your house, is at your modem."},
            {"start": "53.761","end": "57.780","text": "A modem is what connects the internet to your network at home."},
            {"start": "57.780","end": "59.000","text": "A few common residential modems are DSL or..."}            
          ];
          
      createTranscript();

      function createTranscript() {
          var element;
          for (var i = 0; i < syncData.length; i++) {
              element = document.createElement('span');
              element.setAttribute("id", "cue_" + i);
              element.innerText = syncData[i].text + " ";
              textTranscript.appendChild(element);
          }
      }
            
        video.addEventListener("timeupdate", function(e) {
            syncData.forEach(function(element, index, array){
                if( video.currentTime >= element.start && video.currentTime <= element.end )
                    textTranscript.children[index].style.background = 'rgba(254, 187, 55, 0.75)';
            });
        });


  
  
  

     
   
} //End window.onload

       
 
//       this works but breaks seek and is awkward
//       if (time > 0 && time < 7.535) {
//           document.getElementById("cue_1").classList.add("active-cue");
//       } else if (time > 7.535 && time < 13.960) {
//           document.getElementById("cue_1").classList.remove("active-cue");
//           document.getElementById("cue_2").classList.add("active-cue");
//       } else if (time > 13.960 && time < 17.940) {
//           document.getElementById("cue_2").classList.remove("active-cue");
//           document.getElementById("cue_3").classList.add("active-cue");
//       } else if (time > 17.940 && time < 30.920) {
//           document.getElementById("cue_3").classList.remove("active-cue");
//           document.getElementById("cue_4").classList.add("active-cue");
//       } else if (time >= 32.100 && time < 41.190) {
//           document.getElementById("cue_4").classList.remove("active-cue");
//           document.getElementById("cue_5").classList.add("active-cue");
//       } else if (time >= 42.350 && time < 53.760) {
//           document.getElementById("cue_5").classList.remove("active-cue");
//           document.getElementById("cue_6").classList.add("active-cue");
//       } else if (time > 53.760 && time < 57.780) {
//           document.getElementById("cue_6").classList.remove("active-cue");
//           document.getElementById("cue_7").classList.add("active-cue");
//       } else if (time > 57.780) {
//           document.getElementById("cue_7").classList.remove("active-cue");
//           document.getElementById("cue_8").classList.add("active-cue");
//       } 
       






//To Do

    // X  Implement the play and pause buttons.
    
    // X  Add volume button that lets you mute the sound or turn it on.
    
    // X  Implement the fullscreen button.
        
    // X  Embed the .vtt file as a closed captioning track 
        // X  Add a button to video controls to toggle captions on and off.
    
    //Implement the playback progress control. 
        // X  -A user should be able to click anywhere on the playback bar to jump to that part of the video.
       // X  -As the video plays the playback bar should fill in.
       // X  -As the video plays the current time should be displayed and updated e.g. 0:10 / 11:34.
    
    //As the media playback time changes, sentences in the transcript should highlight.
        //-Use JavaScript to listen for those changes and apply a highlight to the appropriate sentence.
        //-You can use the captions.vtt file to see the times at which the words are spoken in the video.
    //When the user clicks on any sentence in the transcript the video player jumps to the appropriate time in the video.
    
//    Playback speed control or other helpful controls.
//    
//    Volume control so viewer can adjust the volume level, not just mute or on.
//    
//    Playback controls include buffering progress of the downloaded video.
            //Does buffered bar count?  Also, preload none and make a poster or upload to github to check buffering bar is visible.