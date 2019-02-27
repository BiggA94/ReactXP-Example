import RX from 'reactxp';
import * as React from 'react';
import {NavigationComponent} from '../navigation/NavigationComponent';
import {ComponentBase} from 'resub';
import AuthStore from '../../stores/AuthStore';
import {LoginComponent} from '../login/LoginComponent';

interface AppState {
    isLoggedIn: boolean;
}

export class App extends ComponentBase<RX.CommonProps, AppState> {
    public render() {
        if (!this.state.isLoggedIn) {
            return (
                <LoginComponent/>
            );
        } else {
            return (
                <NavigationComponent/>
            );
        }
    }

    protected _buildState(_props: RX.CommonProps<React.Component>, _initialBuild: boolean): Partial<AppState> | undefined {
        return {
            isLoggedIn: AuthStore.isLoggedIn(),
        };
    }
}
