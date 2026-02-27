async function scheduleTimer(params) {
    var providerRes = params.providerRes;
    var timeData = providerRes['timesection'] || [];

    var formatTime = function(timeStr) {
        if (!timeStr || timeStr.length !== 4) return timeStr;
        return timeStr.substring(0, 2) + ':' + timeStr.substring(2);
    };

    var forenoon = 0;
    var afternoon = 0;
    var night = 0;

    var sections = timeData.map(function(item) {
        var startHour = parseInt(item.kssj.substring(0, 2));
        if (startHour < 12) {
            forenoon++;
        } else if (startHour >= 12 && startHour < 18) {
            afternoon++;
        } else {
            night++;
        }

        return {
            section: parseInt(item.jc),
            startTime: formatTime(item.kssj),
            endTime: formatTime(item.jssj)
        };
    });

    return {
        totalWeek: 20,
        startSemester: new Date().getTime().toString(),
        startWithSunday: false,
        showWeekend: true,
        forenoon: forenoon,
        afternoon: afternoon,
        night: night,
        sections: sections
    };
}