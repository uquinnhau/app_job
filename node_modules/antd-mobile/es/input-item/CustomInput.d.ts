/// <reference types="react" />
import React from 'react';
declare class NumberInput extends React.Component<any, any> {
    static defaultProps: {
        onChange: () => void;
        onFocus: () => void;
        onBlur: () => void;
        placeholder: string;
        disabled: boolean;
        editable: boolean;
        prefixCls: string;
        keyboardPrefixCls: string;
    };
    private container;
    private inputRef;
    constructor(props: any);
    onChange: (value: any) => void;
    componentWillReceiveProps(nextProps: any): void;
    componentDidMount(): void;
    addBlurListener: () => void;
    removeBlurListener: () => void;
    componentWillUnmount(): void;
    saveRef: (el: any) => void;
    getComponent(): any;
    getContainer(): Element;
    renderCustomKeyboard(): void;
    doBlur: (ev: any) => void;
    unLinkInput: () => void;
    onInputBlur: (value: any) => void;
    onInputFocus: () => void;
    onKeyboardClick: (KeyboardItemValue: any) => void;
    onFakeInputClick: () => void;
    focus: () => void;
    renderPortal(): JSX.Element | null;
    render(): JSX.Element;
}
export default NumberInput;
