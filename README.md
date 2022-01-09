# Brown-Town
A Discord welcome bot (with plans to be a moderation bot in the future as well)

The current feature list follows:

### Features

Note that Brown Town is still early in development. Things are bound to change.

- [x] Send a welcome message when someone joins your Discord guild
- [x] Set a custom status for the bot

### Planned Features

- [ ] Add an option to send a DM to new guild members
- [ ] Add naughty word filters
- [ ] More to come

### Using the bot in your server
Currently, I don't host the bot publicly for people to use however, you can host it yourself.
To do that, simply run change the discord token in the .env file (for example `nano .env`) to the token for the bot you created in the Discord developer portal.
If you don't know how to create a bot in the Discord developer portal you can look it up, there are many guides. Next, you need to edit index.js, find the line that says const channelId and then change the ID there to your channel ID. Now simply run `node index.js` and then you're done.