/**
 * 小爱课程表 Provider 函数
 * 负责从教务系统页面获取课表 HTML 源码
 */
async function scheduleHtmlProvider(dom) {
    if (!dom) { dom = document; }
    
    // 核心逻辑：从 document 或 frame 中提取 ID 为 timetable 的课表表格
    var pickHtml = function(doc) {
        if (!doc) return '';
        var kb = doc.getElementById('timetable');
        if (kb) return kb.outerHTML;
        var box = doc.getElementsByClassName('content_box');
        if (box && box.length > 0) return box[0].outerHTML;
        return '';
    };

    // 尝试从当前页面获取
    var html = pickHtml(dom);
    if (html) return html;

    // 如果主页面没有，遍历所有 iframe 递归寻找
    var iframes = dom.getElementsByTagName('iframe');
    for (var i = 0; i < iframes.length; i++) {
        try {
            var d = iframes[i].contentDocument || iframes[i].contentWindow.document;
            html = pickHtml(d);
            if (html) return html;
        } catch (e) {}
    }
    
    // 最后兜底：返回整个页面的 HTML 源码
    return dom.documentElement ? dom.documentElement.outerHTML : '';
}
