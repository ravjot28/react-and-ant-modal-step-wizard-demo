import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import "./index.css";
import { Modal, Steps, Button, message } from "antd";

const { Step } = Steps;

const steps = [
  {
    title: "First",
    component: "First-content"
  },
  {
    title: "Second",
    component: "Second-content"
  },
  {
    title: "Last",
    component: "Last-content"
  },
  {
    title: "First",
    component: "final"
  }
];

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
      loading: false,
      visible: false
    };
  }
  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  next() {
    const current = this.state.current + 1;
    this.setState({ current });
  }

  prev() {
    const current = this.state.current - 1;
    this.setState({ current });
  }

  getComponent = componentName => {
    if (componentName === "First-content") {
      return <h1>First</h1>;
    } else if (componentName === "Second-content") {
      return <h1>Second</h1>;
    } else if (componentName === "final") {
      return <h1>Final</h1>;
    } else if (componentName === "Last-content") {
      return <h1>Third</h1>;
    } else {
      return null;
    }
  };

  finishingAction = () => {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false, visible: false });
      message.success("Processing complete!");
    }, 3000);
  };

  render() {
    const { current } = this.state;
    const { visible, loading } = this.state;

    return (
      <div>
        <Button type="primary" onClick={this.showModal}>
          Open Modal with customized footer
        </Button>
        <Modal
          visible={visible}
          title="Title"
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button key="back" onClick={this.handleCancel}>
              Close
            </Button>
          ]}
        >
          <Steps current={current}>
            {steps.map(item => (
              <Step key={item.title} title={item.title} />
            ))}
          </Steps>
          <div className="steps-content">
            {this.getComponent(steps[current].component)}
          </div>
          <div className="steps-action">
            {current < steps.length - 1 && (
              <Button type="primary" onClick={() => this.next()}>
                Next
              </Button>
            )}
            {current === steps.length - 1 && (
              <Button
                type="primary"
                onClick={() => this.finishingAction()}
                loading={loading}
              >
                Done
              </Button>
            )}
            {current > 0 && (
              <Button style={{ marginLeft: 8 }} onClick={() => this.prev()}>
                Previous
              </Button>
            )}
          </div>
        </Modal>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("container"));
