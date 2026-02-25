class AudioPlayer {
    constructor() {
        this.audio = document.getElementById('background-audio');
        this.playBtn = document.getElementById('audio-play-btn');
        this.volumeSlider = document.getElementById('audio-volume');
        this.muteBtn = document.getElementById('audio-mute-btn');
        this.playerContainer = document.getElementById('audio-player');
        
        this.isPlaying = false;
        this.isMuted = false;
        
        this.init();
    }
    
    init() {
        this.loadPreferences();
        this.attachEventListeners();
        this.tryAutoplay();
    }
    
    loadPreferences() {
        const savedVolume = localStorage.getItem('audioVolume');
        const savedMuted = localStorage.getItem('audioMuted');
        const savedPlaying = localStorage.getItem('audioPlaying');
        
        if (savedVolume !== null) {
            this.audio.volume = parseFloat(savedVolume);
            this.volumeSlider.value = savedVolume * 100;
        } else {
            this.audio.volume = 0.5;
            this.volumeSlider.value = 50;
        }
        
        if (savedMuted === 'true') {
            this.mute();
        }
        
        if (savedPlaying === 'true') {
            this.isPlaying = true;
        }
    }
    
    attachEventListeners() {
        this.playBtn.addEventListener('click', () => this.togglePlay());
        this.muteBtn.addEventListener('click', () => this.toggleMute());
        this.volumeSlider.addEventListener('input', (e) => this.changeVolume(e.target.value / 100));
        
        this.audio.addEventListener('play', () => this.updatePlayButton(true));
        this.audio.addEventListener('pause', () => this.updatePlayButton(false));
        this.audio.addEventListener('ended', () => this.audio.play());
    }
    
    tryAutoplay() {
        this.audio.muted = true;
        const playPromise = this.audio.play();
        
        if (playPromise !== undefined) {
            playPromise.then(() => {
                if (!this.isMuted && this.isPlaying) {
                    this.audio.muted = false;
                }
                this.playerContainer.classList.add('visible');
            }).catch(() => {
                this.playerContainer.classList.add('visible');
            });
        }
    }
    
    togglePlay() {
        if (this.audio.paused) {
            this.play();
        } else {
            this.pause();
        }
    }
    
    play() {
        this.audio.muted = this.isMuted;
        this.audio.play();
        this.isPlaying = true;
        localStorage.setItem('audioPlaying', 'true');
    }
    
    pause() {
        this.audio.pause();
        this.isPlaying = false;
        localStorage.setItem('audioPlaying', 'false');
    }
    
    toggleMute() {
        if (this.isMuted) {
            this.unmute();
        } else {
            this.mute();
        }
    }
    
    mute() {
        this.audio.muted = true;
        this.isMuted = true;
        this.muteBtn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 5L6 9H2v6h4l5 4V5z"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>';
        localStorage.setItem('audioMuted', 'true');
    }
    
    unmute() {
        this.audio.muted = false;
        this.isMuted = false;
        this.updateMuteButton();
        localStorage.setItem('audioMuted', 'false');
    }
    
    changeVolume(value) {
        this.audio.volume = value;
        localStorage.setItem('audioVolume', value);
        
        if (value === 0) {
            this.mute();
        } else if (this.isMuted) {
            this.unmute();
        } else {
            this.updateMuteButton();
        }
    }
    
    updatePlayButton(playing) {
        if (playing) {
            this.playBtn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>';
            this.playBtn.setAttribute('aria-label', 'Pausar áudio');
        } else {
            this.playBtn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>';
            this.playBtn.setAttribute('aria-label', 'Reproduzir áudio');
        }
    }
    
    updateMuteButton() {
        const volume = this.audio.volume;
        let icon;
        
        if (volume === 0) {
            icon = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 5L6 9H2v6h4l5 4V5z"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>';
        } else if (volume < 0.5) {
            icon = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 5L6 9H2v6h4l5 4V5z"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>';
        } else {
            icon = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 5L6 9H2v6h4l5 4V5z"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>';
        }
        
        this.muteBtn.innerHTML = icon;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new AudioPlayer();
});
