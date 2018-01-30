import {getLyric} from 'api/song'
import { ERR_OK } from 'api/config'
import {Base64} from 'js-base64'
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
  getLyric() {
    // 在这里对getLyric进行了重新的封装 用到了promise
    // promise是一个异步操作的过程，按照我的理解 因为请求数据是异步的
    // promise 分为两个状态，一个是resolve 一个是reject
    // resolve表示解决 reject表示出错
    // 主要是这种思路到底什么时候可以用promise  这是个难题 完全想不到啊
    if (this.lyric) {
      return Promise.resolve(this.lyric)
    }
    return new Promise((resolve, reject) => {
      getLyric(this.mid).then((res) => {
        if (res.retcode === ERR_OK) {
          this.lyric = Base64.decode(res.lyric)
          resolve(this.lyric)
        } else {
          reject('no lyric')
        }
      })
    })
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
    url: `http://thirdparty.gtimg.com/C100${musicData.songmid}.m4a?fromtag=38`

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