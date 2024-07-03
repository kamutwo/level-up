import { CacheType, Interaction, InteractionType } from "discord.js";
import Eta from "../Eta";

module.exports = (client: Eta) => {
  client.on(
    "interactionCreate",
    async (interaction: Interaction<CacheType>): Promise<void> => {
      switch (interaction.type) {
        case InteractionType.ApplicationCommand: {
          const command = client.commands.get(interaction.commandName);
					if (command == undefined) break;

					await command.fn(interaction);
          break;
        }
        default:
          break;
      }
    }
  );
};
