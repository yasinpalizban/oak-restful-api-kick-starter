import {IOpeningServer} from "../interfaces/opening.server.interface.ts";

const openingServeEvent = (event: any) => {
    const item: IOpeningServer = event;
    console.log(
        `Listening on: ${item.secure ? "https://" : "http://"}${
            item.hostname ??
            "localhost"
        }:${item.port}`,
    );
};

export default openingServeEvent;