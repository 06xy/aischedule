async function scheduleParser(providerRes) {
    var rawData = providerRes.courses;
    var results = [];
    
    var courseList = [];
    if (Object.values) {
        courseList = Object.values(rawData);
    } else {
        for (var key in rawData) {
            if (Object.prototype.hasOwnProperty.call(rawData, key)) {
                courseList.push(rawData[key]);
            }
        }
    }

    courseList.forEach(function(course) {
        var courseName = course.courseName;
        if (!course.timeAndPlaceList || course.timeAndPlaceList.length === 0) {
            return;
        }
        
        course.timeAndPlaceList.forEach(function(tp) {
            var weeks = [];
            var cw = tp.classWeek || '';
            for (var i = 0; i < cw.length; i++) {
                if (cw.charAt(i) === '1') {
                    weeks.push(i + 1);
                }
            }

            var sections = [];
            for (var j = 0; j < tp.continuingSession; j++) {
                sections.push(tp.classSessions + j);
            }

            var uniqueWeeks = weeks.filter(function(item, index) {
                return weeks.indexOf(item) === index;
            });
            uniqueWeeks.sort(function(a, b) { return a - b; });

            results.push({
                name: courseName,
                position: (tp.teachingBuildingName + '' + tp.classroomName).replace(' ', ''),
                teacher: (course.attendClassTeacher || '').replace('*', '').trim(),
                weeks: uniqueWeeks,
                day: tp.classDay,
                sections: sections
            });
        });
    });

    return results;
}