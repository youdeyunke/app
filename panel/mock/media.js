export default [
  {
    url: '/api/admin/media_files',
    type: 'post',
    response() {
      return {
        status: 0,
        data: 'ok'
      }
    }
  },
  {
    url: '/api/admin/media_files',
    type: 'get',
    response(config) {
      const {parent_id, filetype} = config.body
      const total = 10
      const data = [...Array(total)].map((_, index) => ({
        url: 'http://t7.baidu.com/it/u=3204887199,3790688592&fm=79&app=86&f=JPEG?w=4610&h=2968',
        size: 1,
        filename: `美丽风景${index + 1}`,
        filetype,
        parent_id,
        can_delete: true,
        can_move: true,
        can_create_dir: true,
        is_dir: index < 3 // 前三个是目录
      }))
      return {
        status: 0,
        data,
        total
      }
    }
  }
]