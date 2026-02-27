async function scheduleHtmlProvider() {
  const response = await fetch(
    'https://newjwxs.hgu.edu.cn/student/courseSelect/thisSemesterCurriculum/ajaxStudentSchedule/callback',
  );
  const result = await response.text();
  const resultJson = JSON.parse(result);
  if(resultJson.allUnits) {
    return {
      timesection: resultJson['jcsjbs'],
      courses: resultJson['xkxx'][0],
    }
  }
}
