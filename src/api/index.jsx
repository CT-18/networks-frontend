export const getStreams = () => Promise.resolve([{
  name: 'Raspberry',
  url: 'http://10.8.0.3:8080/cam/live.m3u8'
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
