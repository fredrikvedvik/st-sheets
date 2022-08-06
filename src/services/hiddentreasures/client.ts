import { Client } from "hiddentreasures-js";
import auth from "../auth";

export default new Client({
    getToken: async () => (await auth.getToken()) ?? "",
});
