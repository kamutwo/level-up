import Eta from "../Eta";

module.exports = (client: Eta) => {
  client.on("ready", async (client): Promise<void> => {
    await (client as Eta).loadCommands();
    console.log(client.user.username, "Is ready");
  });
};
