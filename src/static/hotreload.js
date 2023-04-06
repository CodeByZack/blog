var ws = new WebSocket('ws://localhost:3000/')
ws.onopen = function () {
    console.log('dev-server connected')
}
ws.onmessage = function (e) {
    console.log(e.data);
    if(e.data.includes("reload")){
        location.reload();
    }
}