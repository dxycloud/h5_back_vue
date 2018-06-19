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
    upload: 'upload'
  },
  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFkbWluIiwicGFzc3dkX2hhc2giOiIwMTkyMDIzYTdiYmQ3MzI1MDUxNmYwNjlkZjE4YjUwMCIsImlhdCI6MTUyOTM4MTE5OSwiZXhwIjoxNTI5NDI0Mzk5fQ.r-eiG8X_u2sqpFwh9uOGEeWZhmNsxIZeN_FDuXpgS1I'
}