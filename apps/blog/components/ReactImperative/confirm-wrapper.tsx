import React from 'react';

type CB = (value?: any) => void;

export interface IInjectProps {
  /** 用于弹窗正常关闭，并需要返回操作结果给调用者 */
  proceed: CB;
  /** 用于弹窗非正常关闭，返回非正常关闭原因给调用者 */
  cancel: CB;
  /** 不需要获取返回值，纯展示弹窗关闭 */
  dismiss: CB;
  /** 当前弹窗显示与否的状态值 */
  show: boolean;
}

/**
 * 
 * 桥接 make-imperative 与 react 组件
 * 1. 使 make-imperative 注入的属性更易读
 * 2. 维护一个 show 状态 方便调用 现有的 Dialog Toast 等声明式组件
 * 
 * @param Component
 * @returns 
 */
const confirmable = (Component : React.ElementType<IInjectProps>) =>
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
