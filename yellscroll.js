// yellscroll.js v0.1
"use strict";

var yellscroll = (function () {
  var mp3 = {
    prefix: "data:audio/mp3;base64,",
    sound: [
      ]
  };

  var ogg = {
    prefix: "data:audio/ogg;base64,",
    sound: [
	  ]
  };

  return function (trigger_distance) {
    trigger_distance = trigger_distance || 400;
    var lastOffset;

    var scrollYell = function() {
      var scrollOffset = Math.floor(window.scrollY / trigger_distance);
      if (lastOffset !== scrollOffset) {
        playAudio();
        lastOffset = scrollOffset;
      }
    };

    var timer;
    function resizeYell() {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(function(){ playAudio(); }, 200);
    };

    window.addEventListener('scroll', scrollYell, false);
    window.addEventListener('resize', resizeYell, false);
  };

  function playAudio(position){
    var player = getPlayer()
      , audio = getAudioFor(player)
      , rand = Math.floor(Math.random() * audio.sound.length);

    player.src = audio.prefix + audio.sound[position || rand];
    player.play();
  };

  function getAudioFor(player){
    if(player.canPlayType("audio/mp3")) {
      return mp3;
    } else if(player.canPlayType("audio/ogg")) {
      return ogg;
    }
  }

  function getPlayer() {
    var container = getContainer(), player
      , players = container.getElementsByTagName("audio");

    for (player in  players) {
      if (player.currentTime === 0 || player.ended) {
        return player;
      }
    }

    player = document.createElement("audio");
    container.appendChild(player);
    return player;
  };

  function getContainer() {
    var container = document.getElementById("yellscroll");

    if (container === null) {
      container = document.createElement("div");
      container.id = "yellscroll";
      document.getElementsByTagName('body')[0].appendChild(container);
    }

    return container;
  }
})();
