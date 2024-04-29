import fs from 'fs'
import FileError from '../errors/file-error';
import FileType from '../models/FileType';

export default class FileSystemHelper {
  private static writeFileDirs = ['playwright/fixtures/.citizen-users/', 'playwright/fixtures/.cookies/'];
  
  static exists = (filePath: string) => fs.existsSync(filePath);

  private static encode = (data: any, fileType: FileType): any => {
    switch(fileType) {
      case FileType.JSON:
        return JSON.stringify(data);
    }
  }

  private static decode = (data: Buffer,  fileType: FileType): any => {
    switch(fileType) {
      case FileType.JSON:
        return JSON.parse(data.toString('utf8'));
    }
  }

  private static canWrite = (filePath: string) => {
    let canWrite = false;
    for(const writeFileDir of this.writeFileDirs) {
      if(filePath.startsWith(writeFileDir)) {
        canWrite = true;
        break;
      }
    }
    return canWrite;
  }

  private static isValid = (filePath: string, fileType: FileType) => {
    return filePath.endsWith(`.${fileType.toLowerCase()}`);
  }

  static readFile = (filePath = '', fileType: FileType) => {
    if (this.exists(filePath)) {
      const data = fs.readFileSync(filePath);
      return this.decode(data, fileType);
    }
    return null;
  }

  static writeFile = (data: any, filePath = '', fileType: FileType): void => {
    if (!filePath) {
      throw new FileError("File path cannot be an empty string");
    }
    if (!this.isValid(filePath, fileType)) {
        throw new FileError(`File path ${filePath} should end with .${fileType}`);
    }
    if (!this.canWrite(filePath)) {
        throw new FileError(`Cannot write ${fileType} to file path ${filePath}`);
    }
    data = this.encode(data, fileType);
    fs.writeFileSync(filePath, data);
}
  
  static deleteFile = (filePath = '') => {
    try {
      if (!filePath) {
        throw new FileError("File path cannot be an empty string");
      }
      if (!this.canWrite(filePath)) {
        throw new FileError(`Cannot delete file from file path ${filePath}`);
      }
      fs.unlinkSync(filePath);
    } catch(error) {
      if(error.code === 'ENOENT') {
        console.log(error.stack);
      } else {
        console.log(error);
      }
    }
  };

  static deleteFiles = (...filePaths: (string|undefined)[] ) => {
    for (const filePath of filePaths) {
      this.deleteFile(filePath);
    }
  }
}