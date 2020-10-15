import * as React from "react";
import styles from "./element.module.scss";
import * as _ from "lodash";
import SuccessIcon from "../../../assets/SvgIcoSuccess";
import FailureIcon from "../../../assets/SvgIcoFailure";
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
    console.log("element", element);

    const renderStatusButton = () => {
      if (element.status == null) {
        return (
          <div className={styles.Button}>
            <div className={styles.Group}>
              <SuccessIcon
                onClick={() => {
                  this.updateStatus(index, element, true);
                }}
              />
              <FailureIcon
                onClick={() => {
                  this.updateStatus(index, element, false);
                }}
              />
            </div>
          </div>
        );
      }
      return <></>;
    };

    const renderStatus = () => {
      if (element.status != null) {
        if (element.status) return <SuccessIcon className={styles.Status} />;
        else return <FailureIcon className={styles.Status} />;
      }
      return <></>;
    };

    return (
      <div className={styles.Element}>
        <div className={styles.Content}>
          <div className={styles.Counter}>{index + 1}</div>
          <div className={styles.Text}>{element.title}</div>
          {renderStatus()}
        </div>
        {renderStatusButton()}
      </div>
    );
  }
}
