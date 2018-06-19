const base = 'http://localhost:3000/api/1.0/';

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
  upload_img_path: 'http://localhost:3000/img/',
  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFkbWluIiwicGFzc3dkX2hhc2giOiIwMTkyMDIzYTdiYmQ3MzI1MDUxNmYwNjlkZjE4YjUwMCIsImlhdCI6MTUyOTQwNzM3NCwiZXhwIjoxNTMxOTk5Mzc0fQ.2tgtUfgWpWQda-IMLM9ZFpsb3PCrMSLEPsD7VkAr9IE'
}