import SpotifyWebApi from 'spotify-web-api-js'
import { useStateValue } from '../StateProvider'


export const useReadableDigits = number => {
    const rNum = number?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    if (rNum && rNum.length > 0) {
        return rNum
    }
    return null
}

export const msToTime = duration => {
    var milliseconds = parseInt((duration % 1000) / 100),
      seconds = Math.floor((duration / 1000) % 60),
      minutes = Math.floor((duration / (1000 * 60)) % 60),
      hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
  
    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
  
    return minutes + ":" + seconds;
}

export const getDate = (newDate, resp = null) => {
    const _date = new Date(newDate);
    const months = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ];
    if(resp) {
        if(resp === 'year') return _date.getFullYear();
        if(resp === 'date') return _date.getDate();
        if(resp === 'month') return months[_date.getMonth()];
        return newDate
    }
    return newDate
}

export const urlSegment = segment => {
    const _path = window.location.pathname.substr(1);
    const segments = _path.split('/');
    if(segments.length > 0) {
        return segments[segment]
    }
    return null
}