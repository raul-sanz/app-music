import trae from 'trae'
import configServices from './config'
const platziMusicService = trae.create({
    baseUrl : configServices.apiUrl
})

export default platziMusicService