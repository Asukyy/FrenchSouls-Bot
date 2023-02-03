const {model, Schema} = require('mongoose');

let ticketSchema = new Schema({
    GuildID: String,
    MemberID: String,
    TicketID: String,
    ChannelID: String,
    ClosedID: Boolean,
    LockedID: Boolean,
    TypeID: String,
});

module.exports = model('Ticket', ticketSchema);
