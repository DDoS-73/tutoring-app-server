const { Event } = require('../models/Event');
const { Client } = require('../models/Client');
const createEvent = async (req, res) => {
    let event = req.body;
    const hours = event.startTime.split(':')[0];
    event.date = new Date(event.date);
    event.date.setMinutes(0);
    event.date.setHours(hours);
    let eventDB;
    if (event.client._id) {
        eventDB = new Event(event);
    } else {
        const clientFromDB = await createClient(event.client.name);
        event = {...event, client: clientFromDB};
        eventDB = new Event(event);
    }
    await eventDB.save();
    if (event.repeatable) {
        const events = [];
        for (let i = 7; i < 21 * 7; i += 7) {
            const sevenDaysLater = new Date();
            sevenDaysLater.setDate(new Date(event.date).getDate() + i);
            events.push({...event, date: sevenDaysLater});
        }
        await Event.create(events);
    }
    const newEvent = await Event.findOne({_id: eventDB._id}).populate('client').exec();
    return res.status(201).json(newEvent);
};

const getEventsByWeek = async (req, res) => {
    const [monday, sunday] = getMondayAndSunday(new Date(req.query.weekDay));
    const events = await Event.find({date: {
            $gte: monday,
            $lte: sunday
        }}).populate('client').exec();
    res.json(events);
}

const changePaidStatus = async (req, res) => {
    const { _id } = req.body;

    let newEvent = await Event.findOne({ _id }).exec();
    newEvent.isPaid = !newEvent.isPaid;
    await newEvent.save();
    newEvent = await Event.findOne({ _id }).populate('client').exec();

    return res.json(newEvent);
}

const createClient = async (name) => {
    const client = await Client.findOne({ name }).exec();
    if (client) {
        return client;
    }
    return await new Client({name}).save();
}

const getMondayAndSunday = (date) => {
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    const currentDayOfWeek = date.getDay();
    const daysSinceMonday = currentDayOfWeek === 0 ? 6 : currentDayOfWeek - 1;
    const mostRecentMonday = new Date(date);
    mostRecentMonday.setDate(date.getDate() - daysSinceMonday);
    const mostClosestSunday = new Date(mostRecentMonday);
    mostClosestSunday.setDate(mostRecentMonday.getDate() + 6);
    mostClosestSunday.setHours(23);
    mostClosestSunday.setMinutes(59);
    mostClosestSunday.setSeconds(59);
    return [mostRecentMonday, mostClosestSunday];
}

module.exports = {
    createEvent,
    getEventsByWeek,
    getMondayAndSunday,
    changePaidStatus
};
