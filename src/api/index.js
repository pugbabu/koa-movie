import * as url from './urlConfig'
import axios from 'axios'
export const allMovies = () => {
  return axios.get(url.allMovies).then(res => {
    return res.data
  })
}

export const playingMovie = () => {
  return axios.get(url.nowplaying).then(res => {
    return res.data
  })
}
export const comingMovie = () => {
  return axios.get(url.comingSoon).then(res => {
    return res.data
  })
}
export const popularMovie = () => {
  return axios.get(url.latestPopular).then(res => {
    return res.data
  })
}