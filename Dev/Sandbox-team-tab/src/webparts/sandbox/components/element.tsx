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
  active: boolean;
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
      active: true,
    };
  }
  public render(): React.ReactElement<IElementProps> {
    const { status, counter, text } = this.state;
    let status_img = null;

    if (status != null) {
      status_img = status ? (
        <img className={styles.Status} src={ico_success}></img>
      ) : (
        <img className={styles.Status} src={ico_failure}></img>
      );
    }

    return (
      <div className={styles.Element}>
        <div className={styles.Content}>
          <div className={styles.Counter}>{counter}</div>
          <div className={styles.Text}>{text}</div>
          {status_img}
        </div>
        <div className={styles.Button}>
          <div className={styles.Group}>
            <img
              onClick={() => {
                this.setState({ status: true });
              }}
              src={ico_success}
            ></img>
            <img
              onClick={() => {
                this.setState({ status: false });
              }}
              src={ico_failure}
            ></img>
          </div>
        </div>
      </div>
    );
  }
}
