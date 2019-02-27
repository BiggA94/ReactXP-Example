import {ComponentBase} from 'resub';
import * as RX from 'reactxp';
import * as React from 'react';
import {NavigationItem, NavigationRouteId} from './NavigationComponent';
import AuthStore from '../../stores/AuthStore';

interface NavigationPanelProps extends RX.CommonProps {
    onPressNavigate: (routeId: NavigationRouteId) => void;
    navigationItems: NavigationItem[];
}

const _styles = {
    navButtonStyle: RX.Styles.createButtonStyle({
        backgroundColor: '#eeeeee',
        padding: 20,
        marginBottom: 10,
        alignContent: 'center',
    }, true),
    navButtonTextStyle: RX.Styles.createTextStyle({
        color: 'black',
        fontSize: 20,
        alignContent: 'center',
    }, true),
};

export class NavigationPanel extends ComponentBase<NavigationPanelProps, RX.Stateless> {

    public render(): React.ReactElement<any> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        const navItems: Array<React.ReactElement<RX.Button>> = [];

        this.props.navigationItems.forEach((navItem) => {
            navItems.push(
                <RX.Button key={navItem.navId} onPress={this.navButtonClicked.bind(this, navItem.navId)} style={_styles.navButtonStyle}>
                    <RX.Text style={_styles.navButtonTextStyle}>{navItem.label}</RX.Text>
                </RX.Button>,
            );
        });

        return (
            <RX.View>
                {navItems}

                <RX.Button onPress={this.appInfo} style={_styles.navButtonStyle}>
                    <RX.Text style={_styles.navButtonTextStyle}>App Info</RX.Text>
                </RX.Button>
                <RX.Button onPress={this.logOut} style={_styles.navButtonStyle}>
                    <RX.Text style={_styles.navButtonTextStyle}>LOGOUT</RX.Text>
                </RX.Button>
            </RX.View>
        );
    }

    private navButtonClicked(navId: NavigationRouteId) {
        this.props.onPressNavigate(navId);
    }

    private logOut = () => {
        AuthStore.logOut();
    };

    private appInfo = () => {
        RX.Alert.show('ReactXPSample', 'ReactXP Beispiel-App für das Seminar von Alexander Weidt');
    };
}
