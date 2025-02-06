import serve from 'koa-static';
import koa from 'koa';
import WebSocket, { WebSocketServer } from 'ws';
import buildSite, { buildIndex, buildSinglePost, getPostIdByPath } from './build_site_new.js';
import directory from './utils/directory.js';
import chokidar from 'chokidar';

let WSServer;

const notifyReload = (path)=>{
    if(!WSServer) return;
    WSServer.clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN) {
            client.send(`reload: ${path}`);
        }
    });
};

const articleList = await buildSite(true);

const srcDir = directory.SRC;
const dataDir = directory.ARTICLES;
const draftDir = directory.DRAFT;
chokidar.watch([srcDir,dataDir,draftDir],{ ignoreInitial : true }).on('all', async (event, path) => {
  console.log(event, path);

  let itemPath = "";

  if(path.includes(directory.ARTICLES)){
    itemPath = path.replace(directory.ARTICLES,'');
  }else if(path.includes(directory.DRAFT)){
    itemPath = path.replace(directory.DRAFT,'');
  }

  if(event === "change"){
    const hotReloadArticle = [];
    await buildSinglePost(hotReloadArticle,true,true)({ item : itemPath });
    if(!hotReloadArticle.length)return;
    const targetIndex = articleList.findIndex(a=>a.id === hotReloadArticle[0].id);
    if(targetIndex === -1){
        articleList.push(hotReloadArticle[0]);
    }else{
        articleList.splice(targetIndex,1,hotReloadArticle[0]);
    }
    await buildIndex(articleList,true);
    notifyReload(path);
  }
  if(event === "unlink"){
    const id = getPostIdByPath(itemPath);
    const index = articleList.findIndex(a=>a.id === id);
    if(index > -1){
        articleList.splice(index,1);
    }
  }
  if(event === "add"){
    const hotReloadArticle = [];
    await buildSinglePost(hotReloadArticle,true)({ item : itemPath });
    articleList.push(hotReloadArticle[0]);
    await buildIndex(articleList,true);
    notifyReload(path);
  }
});

const app = new koa();
const staticPath = './build'
app.use(serve(staticPath,{extensions: ['.html']}))

const server = app.listen(3000, () => {
    let port = server.address().port
    console.log('应用实例，访问地址为 http://localhost:' + port)
})

WSServer = new WebSocketServer({ server });