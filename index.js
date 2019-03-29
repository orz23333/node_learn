const server = require('./server')
const route = require('./router')
const handle = require('./requestHandlers')

server(route, handle) //最后合成的分支

