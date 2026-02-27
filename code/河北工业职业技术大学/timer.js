async function scheduleTimer(params) {
    var p = params.providerRes.timesection;
    var st = new Date(p.termStartTime).getTime().toString();
    var ts = JSON.parse(p.times);
    var wd = JSON.parse(p.weekData);
    var s = [];
    var f = 0, a = 0, n = 0;

    for (var i = 0; i < ts.length; i++) {
        var t = ts[i];
        s.push({
            section: parseInt(t.curriNum),
            startTime: t.begin,
            endTime: t.end
        });
        var h = parseInt(t.begin.split(':')[0]);
        if (h < 12) f++;
        else if (h < 18) a++;
        else n++;
    }

    return {
        totalWeek: wd.length,
        startSemester: st,
        startWithSunday: false,
        showWeekend: true,
        forenoon: f,
        afternoon: a,
        night: n,
        sections: s
    };
}