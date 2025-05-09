const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://mcp-todo-backend:5000',
      changeOrigin: true,
    })
  );
};
