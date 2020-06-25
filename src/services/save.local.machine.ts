import fs from "fs";

export class writeMachine{
    writeFile(info:string){
        fs.appendFile('2pac.txt', "hola a todos", (err) => {
            // throws an error, you could also catch it here
            if (err) throw err;

            // success case, the file was saved
            console.log('Lyric saved!');
        });
    }
}