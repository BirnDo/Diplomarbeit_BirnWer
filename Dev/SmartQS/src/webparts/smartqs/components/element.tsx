import * as React from "react";
import styles from "./element.module.scss";
import * as _ from "lodash";
import SuccessIcon from "../../../assets/ico_success.svg";
import FailureIcon from "../../../assets/ico_failure.svg";
import { values } from "office-ui-fabric-react";
import ElementsModal from "./ElementsModal";

export interface IElementProps {
  key: number;
  index: number;
  onclick: any;
  element: ElementsModal;
}
export interface IElementState {
  active: boolean;
}

export default class element extends React.Component<
  IElementProps,
  IElementState
> {
  constructor(props) {
    super(props);

    this.state = {
      active: true,
    };
  }

  updateStatus = (index: number, element: ElementsModal, status: boolean) => {
    const newElement = element;
    element.status = status;
    this.props.onclick(newElement, index);
  };

  public render(): React.ReactElement<IElementProps> {
    const { element, index } = this.props;

    const successButton = (
      <svg
        onClick={() => {
          this.updateStatus(index, element, true);
        }}
        width="96"
        height="96"
        viewBox="0 0 96 96"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="48" cy="48" r="48" fill="#0BAB09" />
        <g clip-path="url(#clip0)">
          <path
            d="M17 53.0418L38.9164 75.0001L81 32.9581L74.9582 26.9998L38.9164 62.9998L22.9581 47.0416L17 53.0418Z"
            fill="white"
          />
        </g>
        <defs>
          <clipPath id="clip0">
            <rect
              width="64"
              height="64"
              fill="white"
              transform="translate(17 19)"
            />
          </clipPath>
        </defs>
      </svg>
    );

    const failureButton = (
      <svg
        onClick={() => {
          this.updateStatus(index, element, false);
        }}
        width="96"
        height="96"
        viewBox="0 0 96 96"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M48 96C74.5097 96 96 74.5097 96 48C96 21.4903 74.5097 0 48 0C21.4903 0 0 21.4903 0 48C0 74.5097 21.4903 96 48 96Z"
          fill="#E91021"
        />
        <path
          d="M76 24.7611L70.2389 19L47.4999 41.739L24.7611 19L19 24.7611L41.739 47.4999L19 70.2389L24.7611 76L47.4999 53.261L70.2389 76L76 70.2389L53.261 47.4999L76 24.7611Z"
          fill="white"
        />
      </svg>
    );

    let status_img = null;
    let status_button = (
      <div className={styles.Button}>
        <div className={styles.Group}>
          {successButton}
          {failureButton}
        </div>
      </div>
    );

    if (element.status != null) {
      status_img = status ? (
        <img src={SuccessIcon} alt="success" className={styles.Status} />
      ) : (
        <img src={FailureIcon} alt="failure" className={styles.Status} />
      );
      status_button = null;
    }

    return (
      <div className={styles.Element}>
        <div className={styles.Content}>
          <div className={styles.Counter}>{index + 1}</div>
          <div className={styles.Text}>{element.title}</div>
          {status_img}
        </div>
        {status_button}
      </div>
    );
  }
}
