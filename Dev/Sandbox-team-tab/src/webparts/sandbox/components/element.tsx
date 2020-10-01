import * as React from "react";
import styles from "./element.module.scss";
import * as ico_success from "../../../assets/ico_success.png";
import * as ico_failure from "../../../assets/ico_failure.png";
import * as _ from "lodash";

export interface IElementProps {
  counter: number;
  text: string;
  status: boolean;
}
export interface IElementState {
  counter: number;
  text: string;
  status: boolean;
}

export default class element extends React.Component<
  IElementProps,
  IElementState
> {
  constructor(props) {
    super(props);

    this.state = {
      counter: this.props.counter,
      text: this.props.text,
      status: this.props.status,
    };
  }
  public render(): React.ReactElement<IElementProps> {
    const { status, counter, text } = this.state;
    let status_icon: string = null;

    if (status != null) {
      if (status) status_icon = ico_success;
      else status_icon = ico_failure;
    }

    return (
      <>
        <div className={styles.Element}>
          <div className={styles.Content}>
            <div className={styles.Counter}>{counter}</div>
            <div className={styles.Text}>{text}</div>
            <img className={styles.Status} src={status_icon}></img>
          </div>
        </div>
        <div className={styles.Button}>
          <button
            onClick={() => {
              this.setState({ status: true });
            }}
          >
            <img src={ico_success}></img>
          </button>
          <button
            onClick={() => {
              this.setState({ status: false });
            }}
          >
            <img src={ico_failure}></img>
          </button>
        </div>
      </>
    );
  }
}
