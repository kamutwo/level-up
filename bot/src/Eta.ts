import {
  Client,
  ClientOptions,
  Collection,
  RESTPostAPIChatInputApplicationCommandsJSONBody,
  Routes,
} from "discord.js";
import { resolve } from "path";
import { glob } from "glob";
import CommandBuilder from "./builder/CommandBuilder";

export default class Eta extends Client {
  commands: Collection<string, CommandBuilder> = new Collection();

  constructor(options: ClientOptions) {
    super(options);

    this.loadEvents();
  }

  async loadEvents(): Promise<void> {
    (
      await glob(`${resolve(__dirname, "events").replace(/\\/g, "/")}/**/*.js`)
    ).forEach(async (file) => {
      delete require.cache[require.resolve(file)];
      (await import(file)).default(this);
    });
  }

  async loadCommands(): Promise<void> {
    const commandsPayload: RESTPostAPIChatInputApplicationCommandsJSONBody[] =
      [];

    await Promise.all(
      (
        await glob(
          `${resolve(__dirname, "commands").replace(/\\/g, "/")}/**/*.js`
        )
      ).map(async (file) => {
        delete require.cache[require.resolve(file)];
        const command: CommandBuilder = (await import(file)).default;

        this.commands.set(command.name, command);
        commandsPayload.push(command.toJSON());
      })
    );

    await this.rest.put(
      Routes.applicationCommands(this.application?.id as string),
      { body: commandsPayload }
    );
  }
}
