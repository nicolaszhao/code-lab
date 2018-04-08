(function(root) {

  var ICONS = {
    PAUSED: '/images/btn_voice.gif',
    PLAYING: '/images/btn_voice_over.gif'
  };

  var supportAudio = function() {
    var ret = true;
  
    try {
      new Audio();
    } catch (ex) {
      ret = false;
    }
  
    return ret;
  };

  var engine = supportAudio() ? new AudioEngine.default() : null;

  var AudioPlayer = function(el, options) {
    if (!supportAudio()) {
      throw new Error('该浏览器目前还不支持 HTML5 的 Audio 以及相关 API。');
      return null;
    }

    options = $.extend({
      onPlay: null,
      onPause: null,
      onError: null
    }, options);

    this.$el = $(el);
    this.paused = true;
    this.buffering = false;
    this.light = options.light;
    this.onError = options.onError;

    this.refresh();

    this.song = engine.add({ url: this.$el.attr('src') });
    this.bindEvents();
  };

  AudioPlayer.prototype = {
    constructor: AudioPlayer,

    refresh: function() {
      this.$el.find('img').attr('src', (this.buffering || !this.paused) ? ICONS.PLAYING : ICONS.PAUSED);
    },
  
    bindEvents: function() {
      var that = this;

      this.song
        .on('error', function(err) {
          if (typeof that.onError === 'function') {
            that.onError(err);
          }
        })
        .on('statechange', function(state) {
          var buffering = false,
            paused = true;

          var STATES = AudioEngine.STATES;
  
          if (state === STATES.BUFFERING || state === STATES.PREBUFFER) {
            buffering = true;
          } else if (state === STATES.PLAYING) {
            paused = false;
          }
  
          that.paused = paused;
          that.buffering = buffering;
          that.refresh();
        });
  
      this.$el.on('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        that.play();
      });
    },
  
    play: function() {
      if (!this.check() || this.buffering) {
        return;
      }
  
      if (!this.paused) {
        engine.setPosition(this.song, 0);
      } else {
        engine.play(this.song);
      }
    },
  
    check: function() {
      var nextUrl = this.$el.attr('src');
  
      if (!nextUrl) {
        return false;
      }
  
      if (nextUrl !== this.song.url) {
        engine.remove(this.song);
        this.song = engine.add({ url: nextUrl });
      }
  
      return true;
    }
  };

  root.AudioPlayer = AudioPlayer;

})(this);

(function() {
  $('.voice_track').each(function() {
    new AudioPlayer(this);
  });
})();
