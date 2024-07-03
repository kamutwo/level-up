import Eta from "./Eta";
import dotenv from "dotenv";
dotenv.config();

const client = new Eta({ intents: 3276543 });

// client.once("ready", (client) => {
// 	console.log(client.user?.username + " is ready!");
// });

client.login(process.env.BOT_TOKEN);
