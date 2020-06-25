import FileSaver from 'file-saver'

export class FileDownloader {

    /**
     * allows download files
     * @param fileName
     */
    downloadFile = (fileName: string) => {
        FileSaver.saveAs("http://localhost:3000/resources/" + fileName, fileName);
    }

}