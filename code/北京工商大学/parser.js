/**
 * 小爱课程表 Parser 函数
 * 负责对 Provider 传入的 HTML 字符串进行深度解析。
 */
async function scheduleParser(html) {
    // 创建虚拟 DOM 容器来解析字符串
    var parser = new DOMParser();
    var doc = parser.parseFromString(html, 'text/html');
    // 同时支持 kbcontent 和 kbcontent1 以兼容不同显示模式（强智系统特征）
    var cells = doc.querySelectorAll('.kbcontent, .kbcontent1');
    var result = [];

    for (var i = 0; i < cells.length; i++) {
        var cell = cells[i];
        var id = cell.getAttribute('id') || '';
        var idParts = id.split('-');
        
        // ID 特征提取星期几
        if (idParts.length >= 3) {
            var day = parseInt(idParts[1]);
            if (day >= 1 && day <= 7) {
                // 遍历单元格内的所有 font 标签以提取名称、周次、教师等信息
                var fonts = cell.getElementsByTagName('font');
                var current = null;
                for (var j = 0; j < fonts.length; j++) {
                    var f = fonts[j];
                    var title = f.getAttribute('title');

                    if (!title) { // 没有 title 的通常是课程名称
                        // 克隆节点以避免修改原始 DOM
                        var tempNode = f.cloneNode(true);
                        // 寻找并移除包含课程编号的 .kchConfig 元素
                        var kchElements = tempNode.getElementsByClassName('kchConfig');
                        while(kchElements.length > 0) {
                            kchElements[0].parentNode.removeChild(kchElements[0]);
                        }
                        // 提取课程名 清理正则残余
                        var name = tempNode.textContent.replace(/课程编号\s*[:：]?\s*[A-Z0-9]+/gi, '').trim();
                        name = name.replace(/^[A-Z0-9]{5,}\s*/i, '').trim();

                        if (name && name !== '----------------------') {
                            if (current) result.push(current);
                            current = { name: name, position: '', teacher: '', weeks: [], day: day, sections: [] };
                        }
                    } else if (current) {
                        var text = f.textContent.trim();
                        // title 属性匹配字段
                        if (title.indexOf('\u6559\u5E08') !== -1) {
                            current.teacher = text;
                        } else if (title.indexOf('\u5468\u6B21') !== -1) {
                            // 周次解析逻辑
                            var weekPart = text.split('(')[0];
                            var weekSegs = weekPart.split(',');
                            for (var wIdx = 0; wIdx < weekSegs.length; wIdx++) {
                                var seg = weekSegs[wIdx].trim();
                                if (seg.indexOf('-') !== -1) {
                                    var range = seg.match(/(\d+)-(\d+)/);
                                    if (range) {
                                        for (var w = parseInt(range[1]); w <= parseInt(range[2]); w++) {
                                            current.weeks.push(w);
                                        }
                                    }
                                } else {
                                    var singleW = parseInt(seg);
                                    if (!isNaN(singleW)) current.weeks.push(singleW);
                                }
                            }
                            // 节次解析逻辑，多节连上
                            var secMatch = text.match(/\[(.*)节\]/);
                            if (secMatch) {
                                var secSegs = secMatch[1].split('-');
                                for (var sIdx = 0; sIdx < secSegs.length; sIdx++) {
                                    var sNum = parseInt(secSegs[sIdx]);
                                    if (!isNaN(sNum)) current.sections.push(sNum);
                                }
                            }
                        } else if (title.indexOf('\u6559\u5BA4') !== -1) {
                            current.position = text;
                        }
                    }
                }
                if (current) result.push(current);
            }
        }
    }
    
    // 数据去重
    var finalResult = [];
    var seen = {};
    for (var k = 0; k < result.length; k++) {
        var item = result[k];
        if (!item.name || item.weeks.length === 0 || item.sections.length === 0) continue;
        var key = item.name + '|' + item.day + '|' + item.weeks.join(',') + '|' + item.sections.join(',');
        if (!seen[key]) {
            seen[key] = true;
            finalResult.push(item);
        }
    }
    return finalResult;
}
