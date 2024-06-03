import request from '@/utils/request'

// 注册方法
export function login(data) {
    return request({
      url: '/plant/index.php',
      method: 'post',
      data: data
    })
  }