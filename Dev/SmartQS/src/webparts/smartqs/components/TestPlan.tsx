import * as React from "react";
import element from "./element";
import Element from "./element";
import ElementsModal from "./ElementsModal";
import TestPlanModal from "./TestPlanModal";

interface TestPlanProps {
  data: TestPlanModal;
}
interface TestPlanState extends TestPlanModal {
  elementsMap: Map<number, ElementsModal>;
}

export default class TestPlan extends React.Component<
  TestPlanProps,
  TestPlanState
> {
  constructor(props) {
    super(props);

    this.state = {
      title: this.props.data.title,
      createdOn: this.props.data.createdOn,
      elements: null, // not needed anymore
      elementsMap: this.initializeMap(this.props.data.elements),
    };
  }

  initializeMap(elements: ElementsModal[]): Map<number, ElementsModal> {
    var map: Map<number, ElementsModal> = new Map();
    elements.map((value, index) => {
      map.set(index, value);
    });
    return map;
  }

  updateElements(key, value) {
    var map: Map<number, ElementsModal> = this.state.elementsMap;
    map.set(key, value);
    this.setState({ elementsMap: map });
  }

  public render(): React.ReactElement<TestPlanProps> {
    const { title, createdOn, elementsMap } = this.state;

    return (
      <>
        {elementsMap.forEach((value, index) => {
          console.log("value", value);

          return (
            <Element
              onclick={this.updateElements}
              key={index}
              text={value.title}
              status={value.status}
            />
          );
        })}
      </>
    );
  }
}
