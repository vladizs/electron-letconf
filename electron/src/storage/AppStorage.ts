import { existsSync, mkdirSync, readFile, writeFile } from 'original-fs';
import * as path from 'path';

interface StorageArgs {
  path: string;
}

export class AppStorage {
  readonly DEFAULT_NAME = 'config.json';
  readonly APP_NAME = 'LetConf'
  private configPath: string;

  configData: any;
  
  constructor(args: StorageArgs) {
    this.configPath = path.join(args.path, this.APP_NAME, this.DEFAULT_NAME);
  }

  getConfig(): Record<string, string> | void {
    readFile(this.configPath, (err, data) => {
      if (err) {
        console.error('An error occurred when loading config:', err);
        return;
      }

      const json = (data.toJSON() as any);

      const configData = JSON.parse(json.data, (_key, value) => {
        return value && value.type === 'Buffer' ?
          Buffer.from(value) :
          value;
      });

      this.configData = configData;
      return configData;
    })
  }

  createConfig(data: unknown = {}): void {
    const configDir = path.dirname(this.configPath);

    if(!existsSync(configDir)) {
      mkdirSync(configDir, { recursive: true })
    }
    
    writeFile(this.configPath, JSON.stringify(data, null, 2), (err) => {
      if (!err) return;
      console.error('An error occurred when creating config: ', err);
    });
  }

  setConfigData(key: string, value: any): void {
    if (!this.configData) {
      this.getConfig();
    }

    this.configData[key] = value;
    this.createConfig(this.configData);
  }
}