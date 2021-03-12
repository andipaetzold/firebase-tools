import { promptOnce } from "../../prompt";
import fsutils = require("../../fsutils");
import clc = require("cli-color");
import { RemoteConfigTemplate } from "../../remoteconfig/interfaces";
import Config = require("../../config");

interface RemoteConfig {
  template?: RemoteConfigTemplate;
}
interface SetUpConfig {
  remoteconfig: RemoteConfig;
}
interface RemoteConfigSetup {
  config: SetUpConfig;
}

/**
 * Function retrieves names for parameters and parameter groups
 * @param setup Input is of RemoteConfigSetup defined in interfaces above
 * @param config Input is of type Config
 * @return {Promise} Returns a promise and writes the project file for remoteconfig template when initializing
 */
export async function doSetup(setup: RemoteConfigSetup, config: Config): Promise<void> {
  setup.config.remoteconfig = {};
  const jsonFilePath = await promptOnce({
    type: "input",
    name: "template",
    message: "What file should be used for your Remote Config template?",
    default: "remoteconfig.template.json",
  });
  if (fsutils.fileExistsSync(jsonFilePath)) {
    const msg =
      "File " +
      clc.bold(jsonFilePath) +
      " already exists." +
      " Do you want to overwrite the existing Remote Config template?";
    const overwrite = await promptOnce({
      type: "confirm",
      message: msg,
      default: false,
    });
<<<<<<< HEAD
    // TODO(github.com/firebase/firebase-tools/issues/3137)
    // We should abort if the user chooses not to overwrite.
    if (overwrite == true) {
      setup.config.remoteconfig.template = jsonFilePath;
    } else {
      setup.config.remoteconfig.template = jsonFilePath;
=======
    if (!overwrite) {
      return;
>>>>>>> origin/master
    }
  }
  setup.config.remoteconfig.template = jsonFilePath;
  config.writeProjectFile(setup.config.remoteconfig.template, "{}");
}
