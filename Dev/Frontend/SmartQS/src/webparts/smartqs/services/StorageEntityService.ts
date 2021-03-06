import { WebPartContext } from "@microsoft/sp-webpart-base";
import { SPHttpClientResponse, SPHttpClient } from "@microsoft/sp-http";

interface IStorageEntityService {
  GetStorageEntity(storageKey: string): Promise<string>;
}

export class StorageEntityService implements IStorageEntityService {
  private context: WebPartContext = undefined;
  /**
   *
   */
  constructor(context: WebPartContext) {
    this.context = context;
  }

  public GetStorageEntity = async (storageKey: string): Promise<string> => {
    return new Promise<string>(async (resolve, reject) => {
      // Get the page context
      const { absoluteUrl } = this.context.pageContext.web;
      // Construct the storage key URL
      const apiUrl: string = `${absoluteUrl}/_api/web/GetStorageEntity('${storageKey}')`;

      // Get the response
      const response: SPHttpClientResponse = await this.context.spHttpClient.get(
        apiUrl,
        SPHttpClient.configurations.v1
      );

      // Read the value from the JSON
      const json: any = await response.json();

      // Return the value
      resolve(json.Value);
    });
  };
}
