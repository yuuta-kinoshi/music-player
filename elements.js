import data from "./data.js"
import { secondsToMinutes } from "./utils.js"

export default {
    get() {
        this.playerBg = document.querySelector('.player-wrapper')
        this.cover = document.querySelector('.cover')
        this.musicName = document.querySelector('.description h3')
        this.artistName = document.querySelector('.description i')
        this.play = document.querySelector('.fa-play')
        this.pause = document.querySelector('.fa-pause')
        this.next = document.querySelector('.fa-forward')
        this.previous = document.querySelector('.fa-backward')
        this.muteUnmute = document.querySelector('.fa-volume-high')
        this.volumeControl = document.querySelector('#vol-bar')
        this.seekbar = document.querySelector('#seek-bar')
        this.duration = document.querySelector('.duration')
        this.currentDuration = document.querySelector('.currentDuration')
    },
    createAudio(audio) {
        this.music = new Audio(audio)
    },
    actions() {
        this.music.onended = () => this.nextMusic()
        this.music.ontimeupdate = () => this.timeUpdate()
        this.play.onclick = () => this.playMusic()
        this.pause.onclick = () => this.pauseMusic()
        this.next.onclick = () => this.nextMusic()
        this.previous.onclick = () => this.previousMusic()
        this.muteUnmute.onclick = () => this.toggleMute()
        this.volumeControl.oninput = () => this.setVolume(this.volumeControl.value)
        this.volumeControl.onchange = () => this.setVolume(this.volumeControl.value)
        this.seekbar.oninput = () => this.setSeek(this.seekbar.value)
        this.seekbar.onchange = () => this.setSeek(this.seekbar.value)
        this.seekbar.max = this.music.duration
        this.duration.textContent = secondsToMinutes(this.music.duration)
        window.onkeydown = () => this.keyButton(event)
    }
}