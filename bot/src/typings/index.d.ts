interface CommandFunction {
  (interaction: CommandInteraction): Promise<void>;
}
