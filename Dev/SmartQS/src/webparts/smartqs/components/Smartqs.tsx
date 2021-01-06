import * as React from "react";
import { ISmartqsProps } from "./ISmartqsProps";
import { ISmartqsState } from "./ISmartqsState";
import { escape } from "@microsoft/sp-lodash-subset";
import { HashRouter } from "react-router-dom";
import SmartQSNav from "./smartQSNav";
import styles from "./Smartqs.module.scss";

class Smartqs extends React.Component<ISmartqsProps, ISmartqsState> {
  constructor(props) {
    super(props);
  }

  public render(): React.ReactElement<ISmartqsProps> {
    return (
      <div className={styles.smartqs}>
        <HashRouter>
          <SmartQSNav />
        </HashRouter>
      </div>
    );
  }
}

export default Smartqs;
