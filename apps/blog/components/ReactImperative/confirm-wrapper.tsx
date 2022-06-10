import React from 'react';

type CB = (value?: any) => void;

export interface IInjectProps {
  proceed: CB;
  cancel: CB;
  dismiss: CB;
  show: boolean;
}

const confirmable = (Component) =>
  class ConfirmWrapper extends React.Component<{
    dispose: CB;
    reject: CB;
    resolve: CB;
  }> {
    state: { show: true };
    constructor(props) {
      super(props);
      this.state = {
          show : true
      }
    }
    dismiss = ()=> {
      this.setState(
        {
          show: false,
        },
        () => {
          this.props.dispose();
        },
      );
    }
    cancel = (value) => {
      this.setState(
        {
          show: false,
        },
        () => {
          this.props.reject(value);
        },
      );
    }
    proceed = (value) => {
      this.setState(
        {
          show: false,
        },
        () => {
          this.props.resolve(value);
        },
      );
    }
    render() {
      return (
        <Component
          proceed={this.proceed}
          cancel={this.cancel}
          dismiss={this.dismiss}
          show={this.state?.show}
          {...this.props}
        />
      );
    }
  };

export default confirmable;
