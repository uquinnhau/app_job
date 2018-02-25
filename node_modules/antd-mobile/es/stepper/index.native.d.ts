/// <reference types="react" />
import BasePropsType from './PropsType';
import React from 'react';
import styles from 'rmc-input-number/lib/styles';
export interface StepProps extends BasePropsType {
    styles?: typeof styles;
}
export default class Stepper extends React.Component<StepProps, any> {
    static defaultProps: StepProps;
    render(): JSX.Element;
}
