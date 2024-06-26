import fs from 'fs';
import path from 'path';
import FileError from '../errors/file-error';
import FileType from '../enums/file-type';
import filePaths from '../config/filePaths';

export default class FileSystemHelper {
  private static writeFileDirs = [`${filePaths.citizenUsers}/`, `${filePaths.userCookies}/`];
  
  static exists = (filePath: string) => fs.existsSync(filePath);

  private static mkDir = (filePath: string) => {
    const dirPath = path.dirname(filePath);
    if(!this.exists(filePath)) {
      fs.mkdirSync(dirPath, {recursive: true});
    }
  };

  private static encode = (data: any, fileType: FileType): any => {
    switch(fileType) {
      case FileType.JSON:
        return JSON.stringify(data);
    }
  };

  private static decode = (data: Buffer,  fileType: FileType): any => {
    switch(fileType) {
      case FileType.JSON:
        return JSON.parse(data.toString('utf8'));
    }
  };

  private static canWrite = (filePath: string) => {
    let canWrite = false;
    for(const writeFileDir of this.writeFileDirs) {
      if(filePath.startsWith(writeFileDir)) {
        canWrite = true;
        break;
      }
    }
    return canWrite;
  };

  private static isValid = (filePath: string, fileType: FileType) => {
    return filePath.endsWith(`.${fileType.toLowerCase()}`);
  };

  static readFile = (filePath = '', fileType: FileType): any => {
    if (this.exists(filePath)) {
      const data = fs.readFileSync(filePath);
      return this.decode(data, fileType);
    }
    throw new FileError(`Failed to read ${fileType} with path ${filePath}. File path is invalid or does not exist.`);
  };

  static writeFile = (data: any, filePath = '', fileType: FileType): void => {
    if (!filePath) {
      throw new FileError('File path cannot be an empty string');
    }
    if (!this.isValid(filePath, fileType)) {
      throw new FileError(`File path ${filePath} should end with .${fileType}`);
    }
    if (!this.canWrite(filePath)) {
      throw new FileError(`Cannot write ${fileType} to file path ${filePath}`);
    }
    data = this.encode(data, fileType);
    this.mkDir(filePath);
    fs.writeFileSync(filePath, data);
  };
  
  static delete = (path = '') => {
    try {
      if (!path) {
        throw new FileError('Folder/File path cannot be an empty string');
      }
      if (!this.canWrite(path)) {
        throw new FileError(`Cannot delete folder/file from path ${path}`);
      }
      const stats = fs.lstatSync(path);

      if (stats.isDirectory()) {
        fs.rmSync(path, { recursive: true, force: true });
        console.log(`Successfully deleted folder with path ${path}`);
      } else {
        fs.unlinkSync(path);
        console.log(`Successfully deleted file with path ${path}`);
      }
    } catch (error: any) {
      if (error.code === 'ENOENT') {
        console.log(error.message);
      } else {
        console.log(error);
      }
    }
  };

}