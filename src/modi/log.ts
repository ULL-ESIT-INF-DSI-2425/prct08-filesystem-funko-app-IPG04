import path from "path";
import { read, readdir } from "fs";

export function log(filename: string, securityPath: string) {
  const pathDir = path.dirname(filename);
  const searchDir = path.join(securityPath, pathDir);
  const searchFile = path.basename(filename);
  setTimeout(() => {
    readdir(searchDir, {recursive: true}, (_,files) => {
      files.forEach((file) => {
        if (file.includes(searchFile, 0)) {
          console.log(file);
        }
      })
    })
  }, 100)
}

log('src2/file3 copy.txt', 'src/modi/.version/')