async function scheduleHtmlProvider() {
    var s = localStorage,
        u = s.getItem('userId'),
        t = s.getItem('curTermId'),
        i = document.getElementById('taskId').value;
    if (!window.Swal) {
        await new Promise(function(r) {
            var sc = document.createElement('script');
            sc.src = 'https://cdn.jsdelivr.net/npm/sweetalert2@11';
            sc.onload = r;
            document.head.appendChild(sc);
        });
    }
    var res = await fetch('https://course.chaoxing.com/svcourse/new/showTable/getTaskByTerm?type=4&termId=' + t + '&userId=' + u);
    var tj = JSON.parse(await res.text());
    var wd = JSON.parse(tj.data.weekData);
    var wn = wd.length;
    var cs = [];
    Swal.fire({title: '读取课表', html: '进度:<b>0</b>%', allowOutsideClick: false, didOpen: function() { Swal.showLoading(); }});
    for (var k = 1; k <= wn; k++) {
        var cr = await fetch('https://course.chaoxing.com/svcourse/new/timetable/getIssuedCourseInfo?type=4&taskId=' + i + '&parameter=' + u + '&weekNum=' + k + '&weeks=&custom=false&actual=false&needShowByCampus=1');
        var cj = JSON.parse(await cr.text()).data.data;
        Array.prototype.push.apply(cs, cj);
        Swal.getHtmlContainer().querySelector('b').textContent = Math.round(k / wn * 100);
    }
    Swal.close();
    return { timesection: tj.data, courses: cs };
}