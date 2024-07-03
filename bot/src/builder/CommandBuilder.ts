import { SlashCommandBuilder } from "discord.js";

export default class CommandBuilder extends SlashCommandBuilder {
  public fn!: CommandFunction;

  public setRunnable(fn: CommandFunction): this {
    this.fn = fn;
    return this;
  }
}
