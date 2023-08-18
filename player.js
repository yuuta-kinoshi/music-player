import data from "./data.js"
import { path, secondsToMinutes } from "./utils.js"
import elements from "./elements.js"

export default {
    audios: data,
    index: 0,
    currentAudios: {},
    start() {
        elements.get.call(this)
        this.update()
    },
    playMusic() {
        this.pause.style.display = 'block'
        this.play.style.display = 'none'
        this.music.play()
    },
    pauseMusic() {
        this.pause.style.display = 'none'
        this.play.style.display = 'block'
        this.music.pause()
    },
    keyButton(event) {
        if (event.keyCode == 32 && this.play.style.display == 'block') {
            this.playMusic()
        } else if (event.keyCode == 32 && this.pause.style.display == 'block') {
            this.pauseMusic()
        }
    },
    nextMusic() {
        if (this.index >= this.audios.length - 1) {
            this.music.pause()
            this.restart()   
        }
        this.music.pause()
        this.index++
        this.update()
        this.playMusic()
    },
    previousMusic() {
        if (this.index == 0) {
            this.index = this.audios.length
            this.playMusic()
        }
        this.music.pause()
        this.index--
        this.update()
        this.playMusic()
    },
    toggleMute() {
        this.music.muted = !this.music.muted
        this.muteUnmute.classList.toggle('fa-volume-off')
    },
    setVolume(value) {
        this.music.volume = value / 100
        this.volumeControl.value == 0 ? this.muteUnmute.classList.add('fa-volume-off') : this.muteUnmute.classList.remove('fa-volume-off')
    },
    setSeek(value) {
        this.music.currentTime = value
    },
    timeUpdate() {
        this.currentDuration.innerText = secondsToMinutes(this.music.currentTime)
        this.seekbar.value = this.music.currentTime
    },
    update() {
        this.currentAudios = this.audios[this.index]

        this.cover.style.background = `url('${path(this.currentAudios.cover)}') center / cover no-repeat`
        this.playerBg.style.background = `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('${path(this.currentAudios.playerBg)}') center / cover no-repeat`
        this.musicName.textContent = this.currentAudios.name
        this.artistName.textContent = this.currentAudios.artist
        elements.createAudio.call(this, path(this.currentAudios.audio))
        this.music.onloadeddata = () => {
            elements.actions.call(this)
        }
    },
    restart() {
        this.update()
        this.index = -1
    }
}