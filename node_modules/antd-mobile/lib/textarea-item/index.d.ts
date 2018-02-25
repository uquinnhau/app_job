/// <reference types="react" />
import React from 'react';
import BasePropsType from './PropsType';
export interface TextareaItemProps extends BasePropsType {
    prefixCls?: string;
    prefixListCls?: string;
    className?: string;
    onClick?: Function;
}
export interface TextareaItemState {
    focus?: boolean;
    value?: string;
}
export default class TextareaItem extends React.Component<TextareaItemProps, TextareaItemState> {
    static defaultProps: {
        prefixCls: string;
        prefixListCls: string;
        autoHeight: boolean;
        editable: boolean;
        disabled: boolean;
        placeholder: string;
        clear: boolean;
        rows: number;
        onChange: () => void;
        onBlur: () => void;
        onFocus: () => void;
        onErrorClick: () => void;
        error: boolean;
        labelNumber: number;
    };
    textareaRef: any;
    private debounceTimeout;
    private scrollIntoViewTimeout;
    constructor(props: TextareaItemProps);
    focus: () => void;
    componentWillReceiveProps(nextProps: any): void;
    componentDidMount(): void;
    componentDidUpdate(): void;
    reAlignHeight: () => void;
    componentWillUnmount(): void;
    onChange: (e: any) => void;
    onBlur: (e: any) => void;
    onFocus: (e: any) => void;
    onErrorClick: () => void;
    clearInput: () => void;
    render(): JSX.Element;
}
