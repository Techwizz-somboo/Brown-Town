# Brown-Town
A Discord welcome and moderation bot.

The current features are listed below:

### Features

Note that Brown Town is still early in development. Things are bound to change.

- [x] Send a welcome message when someone joins your Discord guild
- [x] Set a custom status for the bot
- [x] Naughty word filter
- [x] 3 lists that can be added to and removed from in real-time (badwords, potential-badwords, and whitelist)
- [x] Has support for `!bot` commands
- [x] Can DM moderators that choose to enable it

### Planned Features

- [ ] Add an option to send a DM to new guild members
- [ ] More to come

### Using the bot in your server
Currently, I don't host the bot publicly for people to use however, you can host it yourself. To do that, simply modify .env to your needs. [Creating a Discord token](https://www.writebots.com/discord-bot-token/) (give it admin permissions or tweak it to your needs). Now simply run `node index.js` or start `start.sh` and then you're done.

### Systemd (optional)
I included a sample Systemd service for your convience. Modify `/path/to/start.sh` in `brown-town.service` to the path of `start.sh`. Copy `brown-town.service` to `/etc/systemd/system/` or a local path if you'd prefer. Make sure `start.sh` is executable `chmod +x start.sh` then start the service with `systemctl start brown-town.service`.
