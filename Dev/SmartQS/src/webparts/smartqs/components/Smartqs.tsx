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

class Smartqs extends React.Component<ISmartqsProps, ISmartqsState> {
  constructor(props) {
    super(props);

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

  public render(): React.ReactElement<ISmartqsProps> {
    return (
      <div className={styles.smartqs}>
        <HashRouter>
          <SmartQSNav
            teamsContext={
              this.props.context.sdks.microsoftTeams
                ? this.props.context.sdks.microsoftTeams.context
                : null
            }
            serverURL={this.props.serverURL}
          />
        </HashRouter>
      </div>
    );
  }
}

export default Smartqs;
