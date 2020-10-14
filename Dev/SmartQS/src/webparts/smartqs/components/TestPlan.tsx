import * as React from "react";
import Element from "./element";
import ElementsModal from "./ElementsModal";
import TestPlanModal from "./TestPlanModal";
import * as _ from "lodash";

interface TestPlanProps {
  data: TestPlanModal;
}
interface TestPlanState extends TestPlanModal {}

export default class TestPlan extends React.Component<
  TestPlanProps,
  TestPlanState
> {
  constructor(props) {
    super(props);

    this.state = {
      title: this.props.data.title,
      createdOn: this.props.data.createdOn,
      elements: this.props.data.elements,
    };
  }

  /*   initializeMap(elements: ElementsModal[]): Map<number, ElementsModal> {
    var map: Map<number, ElementsModal> = new Map();
    elements.map((value, index) => {
      map.set(index, value);
    });
    return map;
  } */

  updateElements = (index: number, element: ElementsModal) => {
    const newElements = this.state.elements.slice(); //copy the array
    newElements[index] = element; //execute the manipulations
    this.setState({ elements: newElements }); //set the new state
  };

  public render(): React.ReactElement<TestPlanProps> {
    const { title, createdOn, elements } = this.state;
    console.log("elementsMap", elements);

    return (
      <>
        {elements.map((value, index) => {
          console.log("index", index);
          console.log("value", value);

          return (
            <Element
              onclick={this.updateElements}
              key={index}
              index={index}
              element={value}
            />
          );
        })}
      </>
    );
  }
}
