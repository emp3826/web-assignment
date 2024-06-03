import request from '@/utils/request'

// 植物方法
export function plant(data) {
    return request({
      url: '/upload.php',
      method: 'post',
      data: data
    })
  }