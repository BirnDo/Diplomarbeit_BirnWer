import { AadHttpClient, AadHttpClientFactory } from "@microsoft/sp-http";
import { initializeComponentRef } from "office-ui-fabric-react";
import { StorageEntityService } from "./StorageEntityService";

export class SmartqsHttpClient {
  private static client: AadHttpClient;

  static getClient(
    aadClient: AadHttpClientFactory,
    serverURL: string
  ): AadHttpClient {
    if (!SmartqsHttpClient.client) {
      aadClient.getClient(serverURL).then((client: AadHttpClient) => {
        SmartqsHttpClient.client = client;
      });
    }

    return SmartqsHttpClient.client;
  }
}
