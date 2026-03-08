/**
 * 小爱课程表 Timer 函数
 * 配置学期总周数和每节课的具体上课时间点。
 */
async function scheduleTimer(params) {
    return {
        totalWeek: 16, // 总周数
        startSemester: '', // 开学时间戳
        startWithSunday: false, // 周日为起始日
        showWeekend: false, // 显示周末
        forenoon: 5, // 上午节数
        afternoon: 5, // 下午节数
        night: 3, // 晚上节数
        // 具体的节次时间表
        sections: [
            { section: 1, startTime: '08:00', endTime: '08:45' },
            { section: 2, startTime: '08:50', endTime: '09:35' },
            { section: 3, startTime: '09:50', endTime: '10:35' },
            { section: 4, startTime: '10:40', endTime: '11:25' },
            { section: 5, startTime: '11:30', endTime: '12:15' },
            { section: 6, startTime: '13:40', endTime: '14:25' },
            { section: 7, startTime: '14:30', endTime: '15:15' },
            { section: 8, startTime: '15:30', endTime: '16:15' },
            { section: 9, startTime: '16:20', endTime: '17:05' },
            { section: 10, startTime: '17:10', endTime: '17:55' },
            { section: 11, startTime: '18:45', endTime: '19:30' },
            { section: 12, startTime: '19:35', endTime: '20:20' },
            { section: 13, startTime: '20:25', endTime: '21:10' }
        ]
    };
}
