import { CommandInteraction } from "discord.js";
import CommandBuilder from "../builder/CommandBuilder";

export default new CommandBuilder()
  .setName("ping")
  .setDescription("pong.")
  .setRunnable(async (interaction: CommandInteraction) => {
    interaction.reply("pong!");
  });
