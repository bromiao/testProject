var performance = window.performance;

function appUseMb(size) {
    return Math.floor(size/1024/1024, 4) + 'MB';
}

function getTimeSec(time) {
    return time/1000 + 's';
}

console.log('内存占用：' + appUseMb(performance.memory.usedJSHeapSize));
console.log('tcp链接耗时：' + getTimeSec(performance.timing.connectEnd - performance.timing.connectStart));
console.log('响应耗时：' + getTimeSec(performance.timing.responseEnd - performance.timing.responseStart));

window.onload = function () {
    console.log('DOM渲染耗时：' + getTimeSec(performance.timing.domComplete - performance.timing.domLoading));
}
