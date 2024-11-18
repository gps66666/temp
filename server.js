const http = require('http')
const querystring = require('querystring')
const server = http.createServer((request,response)=>{
    const method = request.method;
    const url = request.url;
    console.log('method:',method);
    console.log('url:',url);
    request.query = querystring.parse(url.split('?')[1]);
    console.log('query:',request.query);
    //转JSON返回
    response.end(
        JSON.stringify(request.query)
    );
});
server.listen(5000,()=>{
    console.log('server running at port 5000');
});