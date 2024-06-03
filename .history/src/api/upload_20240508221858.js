import request from '@/utils/request'

// 植物方法
export function upload(data) {
    return request({
      url: '/upload.php',
      method: 'post',
      data: data
    })
  }