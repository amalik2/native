import * as stream from "stream";
import * as fs from "fs";
import { promisify } from "util";
import axios from "axios";

const finished = promisify(stream.finished);

export const downloadFile = async (
    downloadUrl: string,
    outputFilePath: string
): Promise<void> => {
    const writer = fs.createWriteStream(outputFilePath);
    const response = await axios({
        method: "get",
        url: downloadUrl,
        responseType: "stream"
    });

    response.data.pipe(writer);
    await finished(writer);
};
