const {Client} = require('discord.js')
const mongoose = require('mongoose')
const config = require('../../config.json')

module.exports = {
    name: 'ready',
    once: true,

    async execute(client) {
        try {
            mongoose.set('strictQuery', false);
            await mongoose.connect(process.env.MONGODB)

            if (mongoose.connect) {
                console.log('MongoDB connection successful.')
            }

            console.log(`${client.user.username} is now online.`)
        }
        catch (error) {
            console.log(`Error ${error}`)
        }

		console.log(`Logged in as ${client.user.tag}!`)


    }
}