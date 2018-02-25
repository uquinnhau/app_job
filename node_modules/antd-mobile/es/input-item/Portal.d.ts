/// <reference types="react" />
import React from 'react';
export default class Portal extends React.Component<{
    getContainer: Function;
}, any> {
    _container: any;
    constructor(props: any);
    shouldComponentUpdate(): boolean;
    render(): any;
}
