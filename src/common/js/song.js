export default class Song {
  constructor({ id, mid, singer, name, album, duration, image, url }) {
    // 歌曲抽象出一个类，好处在于代码可以在一个地方进行维护，类的扩展性比对象强很多，这是一种面向对象的编程模式
    this.id = id
    this.mid = mid
    this.singer = singer
    this.name = name
    this.album = album
    this.duration = duration
    this.image = image
    this.url = url
  }
}
// 抽象出一个工厂方法，因为在抓取其他接口获取数据的时候musicData这个数据名称很多 不直接调用new返回一个实例
export function createSong(musicData) {
  return new Song({
    id: musicData.songid,
    mid: musicData.songmid,
    singer: filterSinger(musicData.singer), // 合唱的歌手名字 设计稿上有这个两个名字中间是用/分开的所以filterSinger方法中用到了join('/')
    name: musicData.songname,
    album: musicData.albumname,  // 专辑的名称
    duration: musicData.interval, // 歌曲的时长
    image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`,
    url: `http://ws.stream.qqmusic.qq.com/${musicData.songid}.m4a?fromtag=46`
  })
}
function filterSinger(singer) {
  let ret = []
  if (!singer) {
    return ''
  }
  singer.forEach((s) => {
    ret.push(s.name)
  })
  return ret.join('/')
}