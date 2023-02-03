const {model, Schema} = require('mongoose');

let Suggestion = new Schema({
    GuildId: String,
    MessageId: String,
    Details: Array
});

module.exports = model('Suggestion', Suggestion);