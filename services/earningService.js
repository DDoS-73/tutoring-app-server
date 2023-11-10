const { Event } = require('../models/Event');
const {getMondayAndSunday} = require('./eventService');
const getMonthEarnings = async (req, res) => {
    const dayOfMonth = new Date(req.query.dayOfMonth);
    const year = dayOfMonth.getFullYear();
    const month = dayOfMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    firstDay.setHours(0);
    firstDay.setMinutes(0);
    firstDay.setSeconds(0);
    lastDay.setHours(23);
    lastDay.setMinutes(59);
    lastDay.setSeconds(59);
    const predictedMonthEarnings = await Event.aggregate([
        {$match: {date: {
                    $gte: firstDay,
                    $lte: lastDay
                }}},
        { $group: { _id: 0, sum : { $sum: "$price" } } }
    ]);

    const actualMonthEarnings = await Event.aggregate([
        {
            $match: {
                date: {
                    $gte: firstDay,
                    $lte: lastDay
                },
                isPaid: { $eq: true }
            }
        },
        {
            $group:
                { _id: 0, sum : { $sum: "$price" } }
        }
    ]);
    return res.json({ predictedEarnings: predictedMonthEarnings[0]?.sum || 0, actualEarnings: actualMonthEarnings[0]?.sum || 0 });
}

const getWeekEarnings = async (req, res) => {
    const dayOfWeek = new Date(req.query.dayOfWeek);
    const [monday, sunday] = getMondayAndSunday(dayOfWeek);
    const predictedWeekEarnings = await Event.aggregate([
        {$match: {date: {
                    $gte: monday,
                    $lte: sunday
                }}},
        { $group: { _id: 0, sum : { $sum: "$price" } } }
    ]);
    const actualWeekEarnings = await Event.aggregate([
        {
            $match: {
                date: {
                    $gte: monday,
                    $lte: sunday
                },
                isPaid: { $eq: true }
            }
        },
        { $group: { _id: 0, sum : { $sum: "$price" } } }
    ]);
    return res.json({ predictedEarnings: predictedWeekEarnings[0]?.sum || 0, actualEarnings: actualWeekEarnings[0]?.sum || 0});
}

module.exports = {
    getWeekEarnings,
    getMonthEarnings,
}
