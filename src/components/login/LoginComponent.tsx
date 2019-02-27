import * as RX from 'reactxp';
import {ComponentBase} from 'resub';
import * as React from 'react';
import {commonStyles} from '../../styles/Common';
import AuthStore from '../../stores/AuthStore';

const _styles = {
    textInput: RX.Styles.createTextInputStyle({
        borderWidth: 1,
        backgroundColor: '#fff4e0',
        justifyContent: 'center',
        margin: 20,
        padding: 20,
        width: RX.UserInterface.measureWindow().width - 50,
    }, true),
    loginView: RX.Styles.createViewStyle({
        flex: 1,
        justifyContent: 'space-around',
    }, true),
    button: RX.Styles.createButtonStyle({
        backgroundColor: 'lightgrey',
        margin: 5,
        padding: 5,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: 'black',
    }, true),
};

interface LoginState {
    username?: string;
    password?: string;
}

export class LoginComponent extends ComponentBase<RX.CommonProps, LoginState> {
    public render(): React.ReactElement<any> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        return (
            <RX.View style={[commonStyles.main, _styles.loginView]}>
                <RX.View>
                    <RX.Text style={commonStyles.title}>Welcome to <RX.Text style={commonStyles.name}>ReactXP</RX.Text></RX.Text>
                </RX.View>
                <RX.TextInput
                    style={_styles.textInput}
                    onChangeText={this.setUsername}
                    value={this.state.username}
                    placeholder={'Username'}
                    autoFocus={true}
                />
                <RX.TextInput
                    style={_styles.textInput}
                    onChangeText={this.setPassword}
                    value={this.state.password}
                    placeholder={'Password'}
                    autoFocus={true}
                />

                <RX.Button onPress={this.login} style={_styles.button}>
                    <RX.Text style={commonStyles.title}>Login</RX.Text>
                </RX.Button>
                <RX.Button onPress={this.debugLogin} style={_styles.button}>
                    <RX.Text style={commonStyles.title}>QuickLogin (DEBUG)</RX.Text>
                </RX.Button>
            </RX.View>
        );
    }

    public setUsername = (value: string) => {
        this.setState({...this.state, username: value});
    };

    public setPassword = (value: string) => {
        this.setState({...this.state, password: value});
    };

    public login = () => {
        AuthStore.logIn(this.state.username, this.state.password);
    };

    public debugLogin = () => {
        AuthStore.logIn('test', 'pass');
    };

}
