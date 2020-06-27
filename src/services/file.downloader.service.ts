import FileSaver from 'file-saver'
import {Keys} from "../keys";

export class FileDownloader {

    //env: string = "http://localhost:3000/";
    env: string = Keys.ENV;
    /**
     * allows download files
     * @param fileName
     */
    downloadFile = (fileName: string) => {
        FileSaver.saveAs("resources/" + fileName, fileName);
    }

}