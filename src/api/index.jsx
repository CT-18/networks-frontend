import axios from 'axios'
import { getBalancer, getApiURL, setApiURL } from 'state'

const rawGet = endpoint => axios.get(endpoint).then(response => {
    const data = response.data
    if (data.error) {
      return Promise.reject(
        new Error(data.error)
      )
    }
    return data.result
  }).catch(e => console.log(e))

export const fetchApiUrl = () => {
  const balancer = getBalancer()
  if (balancer) {
    return rawGet(`${balancer}/balancer/`)
      .then(api => setApiURL(api.result))
  } else {
    return Promise.reject(new Error('No balancer set'))
  }
}

const get = endpoint => {
  const apiUrl = getApiURL()
  if (apiUrl) {
    return rawGet(apiUrl + endpoint)
  } else {
    return fetchApiUrl().then(() => get(endpoint))
  }
}



export const getStreams = () => get('/streams/')
  .then(({streams}) => streams.map(({name, fragment}) => ({
    name,
    url: `${getApiURL()}/streams/${name}/${fragment}`,
  })))
  .catch(e => [])

export const getStreamsFixed = () => Promise.resolve([{
  name: 'Raspberry',
  url: 'http://10.8.0.3/live.m3u8'
}, {
  name: 'Parcour in Greece',
  url: 'https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8'
}, {
  name: 'Big Buck Bunny',
  url: 'http://184.72.239.149/vod/smil:BigBuckBunny.smil/playlist.m3u8'
}, {
  name: 'Sintel',
  url: 'https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8'
}])
