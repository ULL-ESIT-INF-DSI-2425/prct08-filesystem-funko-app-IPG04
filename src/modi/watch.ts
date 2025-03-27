import { log } from 'console'
import { watch, access, copyFile, lstat, stat, mkdir } from 'fs'
import path from 'path'

export function watchMonitor(watchedPath: string, securityPath: string) {
  access(watchedPath, (error) => {
    if (error) {
      mkdir(watchedPath, {recursive: true}, (err) => {
        if (err) {
          console.log('Not possible create directory')
        }
      })
    }
  })
  watch(watchedPath, {recursive: true}, (_, filename) => {
    setTimeout(() => {
      if (filename) {
        const file = path.join(watchedPath, filename);
        commit(filename, file, securityPath)
      }
    }, 100);
  })
}


export function commit(filename: string, file: string, securityPath: string) {
  const newSecurityPath = path.join(securityPath, path.dirname(filename));
  let time = "";
  lstat(file, (_, stats) => {
    time = stats.mtimeMs.toString().split(" ").join("");
  });
  access(newSecurityPath, (error) => {
    if (error) {
      mkdir(newSecurityPath, {recursive: true}, (err) => {
        if (err) {
          console.log('Not possible create security directory')
        }
      })
    }
  })
  setTimeout(() => {
    const newFileName = [filename, time, 'bak'].join(".");
    const newFileInDir = path.join(securityPath, newFileName)
    // console.log(file, newFileInDir)
    setTimeout(() => {
      copyFile(file, newFileInDir, (err) => {
        if (err) {
          console.log('Not possible save file')
        }
      })
    }, 200)
      
  }, 100)
    
}

watchMonitor('./src/modi/lookdir/', './src/modi/.version/')
