import { app } from "electron";
import path from "path";

export default (filename): string => {
  let base = app.getAppPath();
  base = base.replace("\\app.asar", "");
  base = base.replace("/app.asar", "");
  return path.resolve(base, `${filename}`);
};
