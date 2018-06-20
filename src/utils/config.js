const base = 'https://118.24.177.55:3000/api/1.0/';

module.exports = {
  api: {
    user: {
      login: base + 'user/login',
    },
    shop: {
      fetch: base + 'shop/findAll',
      delete: base + 'shop/delete',
      add: base + 'shop/add'
    },
    upload: base + 'upload'
  },
  upload_img_path: 'https://118.24.177.55:3000/img/',
  token: ''
}