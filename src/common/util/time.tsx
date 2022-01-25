export function date2str(x, y) {
    var z = {
        M: x.getMonth() + 1,
        d: x.getDate(),
        h: x.getHours(),
        m: x.getMinutes(),
        s: x.getSeconds()
    };
    y = y.replace(/(M+|d+|h+|m+|s+)/g, function (v) {
        return ((v.length > 1 ? "0" : "") + z[v.slice(-1)]).slice(-2)
    });

    return y.replace(/(y+)/g, function (v) {
        return x.getFullYear().toString().slice(-v.length)
    });
}
export function parseTimeInterval(time: string): string {
    let date = (new Date().getTime() / 1000) - parseInt(time)
    date = (date / (60 * 60 * 24))
    if (date >= 30)
        return `${(date / 30).toFixed(0)}月前`
    else
        return `${date.toFixed(0)}天前`
}
export function getGreeting(hour: number): string {
    if (hour >= 3 && hour < 6) return "快睡吧"
    if (hour >= 6 && hour < 10) return "早上好"
    if (hour >= 10 && hour < 14) return "中午好"
    if (hour >= 14 && hour < 18) return "下午好"
    else return "晚上好"
}