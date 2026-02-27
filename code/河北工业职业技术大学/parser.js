async function scheduleParser(providerRes) {
    var cs = providerRes.courses;
    var m = {};
    var rs = [];
    for (var i = 0; i < cs.length; i++) {
        var c = cs[i];
        var k = c.subjectName + c.building + c.classroom + c.teacherNames + c.weekDay;       
        if (!m[k]) {
            m[k] = {
                name: c.subjectName,
                position: (c.building || '') + (c.classroom || ''),
                teacher: c.teacherNames || '未知',
                weeks: [],
                day: parseInt(c.weekDay),
                sections: []
            };
        }
        for (var w = 0; w < c.weekNumList.length; w++) {
            var wn = parseInt(c.weekNumList[w]);
            if (m[k].weeks.indexOf(wn) === -1) m[k].weeks.push(wn);
        }
        var sn = parseInt(c.curricNum);
        if (m[k].sections.indexOf(sn) === -1) m[k].sections.push(sn);
    }
    for (var x in m) {
        m[x].sections.sort(function(a, b) { return a - b; });
        rs.push(m[x]);
    }
    return rs;
}