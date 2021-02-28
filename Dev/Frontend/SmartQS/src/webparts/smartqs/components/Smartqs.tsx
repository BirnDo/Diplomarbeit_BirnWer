import * as React from "react";
import { ISmartqsProps } from "./ISmartqsProps";
import { ISmartqsState } from "./ISmartqsState";
import { escape } from "@microsoft/sp-lodash-subset";
import { HashRouter } from "react-router-dom";
import SuccessIcon from "../../../assets/SvgIcoSuccess";
import FailureIcon from "../../../assets/SvgIcoFailure";
import { registerIcons } from "@uifabric/styling";
import SmartQSNav from "./SmartQSNav/SmartQSNav";
import styles from "./Smartqs.module.scss";
import { Web } from "@pnp/sp/webs";
import { sp, SPHttpClient } from "@pnp/sp";

import { personaPresenceSize } from "office-ui-fabric-react";
import { StorageEntityService } from "../services/StorageEntityService";

class Smartqs extends React.Component<ISmartqsProps, ISmartqsState> {
  constructor(props) {
    super(props);

    this.state = {
      serverURL: "",
    };
    // registers icons for usage in navbar
    registerIcons({
      style: {
        fontSize: "50px",
      },
      icons: {
        success: <SuccessIcon />,
        failure: <FailureIcon />,
      },
    });
  }

  async componentDidMount() {
    this.loadTenantProperty();
  }

  async loadTenantProperty() {
    let spService: StorageEntityService = new StorageEntityService(
      this.props.context
    );
    const prop: string = await spService.GetStorageEntity("smartqsserviceurl");
    if (!prop) window.alert("smartqsserviceurl tenant property is empty");
    this.setState({ serverURL: prop });
  }

  public render(): React.ReactElement<ISmartqsProps> {
    const { serverURL } = this.state;
    return (
      <div className={styles.smartqs}>
        <HashRouter>
          <SmartQSNav
            teamsContext={
              this.props.context.sdks.microsoftTeams
                ? this.props.context.sdks.microsoftTeams.context
                : null
            }
            serverURL={serverURL}
            enableDrillDown={this.props.enableDrillDown}
            enableStatisticsChart={this.props.enableStatisticsChart}
          />
        </HashRouter>
      </div>
    );
  }
}

export default Smartqs;
