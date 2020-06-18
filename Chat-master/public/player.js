var song = new Audio("http://94.102.5.183:9928/;stream.mp3");
var meta = document.getElementById('metadata');

function playOrPauseSong (img) {
    song.playbackRate = 1;
	if(song.paused){
        meta.innerHTML = "Yükleniyor...";
		song.play();
        img.src = "images/pause.png";
	}else{
		song.pause();
		img.src = "images/play.png";
	}
}

$(function() {

    $.ajax({

        // The 'type' property sets the HTTP method.
        // A value of 'PUT' or 'DELETE' will trigger a preflight request.
        type: 'GET',
        beforeSend: function (request) {
            request.setRequestHeader("Authorization", "Negotiate");
        },
        // The URL to make the request to.
        url: 'http://94.102.5.183:9928/;stream.mp3',
      
        // The 'contentType' property sets the 'Content-Type' header.
        // The JQuery default for this property is
        // 'application/x-www-form-urlencoded; charset=UTF-8', which does not trigger
        // a preflight. If you set this value to anything other than
        // application/x-www-form-urlencoded, multipart/form-data, or text/plain,
        // you will trigger a preflight request.
        contentType: 'text/plain',
      
        xhrFields: {
          // The 'xhrFields' property sets additional fields on the XMLHttpRequest.
          // This can be used to set the 'withCredentials' property.
          // Set the value to 'true' if you'd like to pass cookies to the server.
          // If this is enabled, your server must respond with the header
          // 'Access-Control-Allow-Credentials: true'.
          withCredentials: false
        },
      
        headers: {
          // Set any custom headers here.
          // If you set any non-simple headers, your server must include these
          // headers in the 'Access-Control-Allow-Headers' response header.
        },
      
        success: function() {
          // Here's where you handle a successful response.
          window.alert("başarılı");
        },
      
        error: function() {
          // Here's where you handle an error response.
          // Note that if the error was due to a CORS issue,
          // this function will still fire, but there won't be any additional
          // information about the error.,
          window.alert('hata');
        }
      });
});

/*
var url = 'http://94.102.5.183:9928/;stream.mp3';
var xhr = createCORSRequest('GET', url);
xhr.send(); 
xhr.onload = function() {
    var text = xhr.responseText;
    var title = getTitle(text);
    alert('Response from CORS request to ' + url + ': ' + title);
  };

function createCORSRequest(method, url) {
    var xhr = new XMLHttpRequest();
    if ("withCredentials" in xhr) {
      // XHR for Chrome/Firefox/Opera/Safari.
      xhr.open(method, url, true);
    } else if (typeof XDomainRequest != "undefined") {
      // XDomainRequest for IE.
      xhr = new XDomainRequest();
      xhr.open(method, url);
    } else {
      // CORS not supported.
      xhr = null;
    }
    return xhr;
  }
  
  // Helper method to parse the title tag from the response.
  function getTitle(text) {
    return text.match('<title>(.*)?</title>')[1];
  }
  
  // Make the actual CORS request.
  function makeCorsRequest() {
    // This is a sample server that supports CORS.
    var url = 'http://94.102.5.183:9928/;stream.mp3';
  
    var xhr = createCORSRequest('GET', url);
    if (!xhr) {
      alert('CORS not supported');
      return;
    }
  
    // Response handlers.
    xhr.onload = function() {
      var text = xhr.responseText;
      var title = getTitle(text);
      alert('Response from CORS request to ' + url + ': ' + title);
    };
  
    xhr.onerror = function() {
      alert('Woops, there was an error making the request.');
    };
  
    xhr.send();
  }
*/
/*
function getSongInfo() {
    var nc = new Date().getTime();
    
    $.ajax({
        type: 'GET',
        url: 'http://www.radyoodtu.com.tr/iplayer/json.php?nc=' + nc,
        dataType: 'json',
        async: 'true',
        success: function (data) {
            d = new Date();
            strChannels = "";
            strout = "";
            UTCTime = Math.ceil(d.getTime()/1000);
            timeToUpdate =  parseInt(UTCTime) + 10000;
            firstChannelToUpdate = 0;
            currentChannelUpdateTime = 0;

            $.each(data, function(i, channel) {
                if (channels[i].playedat != channel.playedat) {
                    channels[i].update = true;
                    channels[i].artist = channel.artist;
                    channels[i].song = channel.song;
                    channels[i].image_extralarge = channel.image_extralarge;
                    channels[i].playedat = channel.playedat;
                } else {
                    channels[i].update = false;
                }
                currentChannelUpdateTime = (parseInt(channel.playedat) + parseInt(channel.duration)) - UTCTime;
                if (timeToUpdate > currentChannelUpdateTime) {
                    if (currentChannelUpdateTime > 0 ) {
                        timeToUpdate = currentChannelUpdateTime;
                        firstChannelToUpdate = i;
                    }//if (currentCh
                    else{//missed the update, switch to forced mode
                        timeToUpdate = 5
                        firstChannelToUpdate = i;
                    }
                }//if (tim
            });//$.each(data, function(i, channel)
        }//  success: function (data)
    });
}*/