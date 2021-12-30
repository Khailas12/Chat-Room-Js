const moment = require('moment');


const formatMessage = ((username, text) => {
    const time = moment().format('h:mm a')
    
    return {
        username,
        text,
        time: time 
    }
});

module.exports = formatMessage;