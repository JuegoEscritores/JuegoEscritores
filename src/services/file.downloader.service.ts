import FileSaver from 'file-saver'

export class FileDownloader {

    /**
     * allows download files
     * @param fileName
     */
    downloadFile = (fileName: string) => {
        FileSaver.saveAs("resources/" + fileName, fileName);
    }

}