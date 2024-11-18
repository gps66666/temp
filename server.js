const http = require('http')
const querystring = require('querystring')
const server = http.createServer((request,response)=>{
    if(request.method === 'POST')//===表示类型、值完全相等
    {
        let postdata = "";
        request.on('data',chunk=>{
            postdata+=chunk.tostring();
        })
        request.on('end',()=>{
            console.log("数据接收完毕");
            response.end(JSON.stringify('状态：接收完毕'));
        })
        console.log('postdata:',postdata)
    }
});
server.listen(5000,()=>{
    console.log('server running at port 5000');
});