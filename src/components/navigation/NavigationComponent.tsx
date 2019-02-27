import * as RX from 'reactxp';
import {ComponentBase} from 'resub';
import Navigator, {NavigatorDelegateSelector as DelegateSelector, Types} from 'reactxp-navigation';
import * as React from 'react';
import {NavigationPanel} from './NavigationPanel';
import {LocationComponent} from '../location/LocationComponent';

export enum NavigationRouteId {
    NavigationPanel,
    LocationPanel,
}

export interface NavigationItem {
    navId: NavigationRouteId,
    label: string
}

const _styles = {
    // Standard navigator style should be an object. So we have to disable caching here.
    navCardStyle: RX.Styles.createViewStyle({
        backgroundColor: '#f5fcff',
    }, false),
    navContent: RX.Styles.createViewStyle({
        padding: 10,
    }, false),
    backButtonBar: RX.Styles.createViewStyle({
        backgroundColor: '#666c6e',
        flexDirection: 'row',
    }, true),
    backButtonStyle: RX.Styles.createButtonStyle({
        backgroundColor: '#323537',
        paddingLeft: 10,
        margin: 20,
        borderColor: 'gray',
        borderWidth: 1,
        maxWidth: 100,
        minWidth: 45,
    }, true),
    backButtonTextStyle: RX.Styles.createTextStyle({
        color: 'white',
        fontSize: 25,
        fontWeight: '900',
    }, true),
    serviceName: RX.Styles.createTextStyle({
        color: 'white',
        fontSize: 30,
        justifyContent: 'flex-end',
        position: 'absolute',
        right: 20,
        top: 20,
    }, true),
};

const navItems: NavigationItem[] = [{label: 'Location Service', navId: NavigationRouteId.LocationPanel}];

export class NavigationComponent extends ComponentBase<RX.CommonProps, RX.Stateless> {
    private _navigator: Navigator | undefined;

    public componentDidMount() {
        if (this._navigator) {
            this._navigator.immediatelyResetRouteStack([{
                routeId: NavigationRouteId.NavigationPanel,
                sceneConfigType: Types.NavigatorSceneConfigType.Fade,
            }]);
        }
    }

    public render(): React.ReactElement<any> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        return (
            <Navigator
                delegateSelector={DelegateSelector}
                cardStyle={_styles.navCardStyle}
                renderScene={this._renderScene}
                ref={this._onNavigatorRef}
            />
        );
    }

    private _onNavigatorRef = (navigator: Navigator) => {
        this._navigator = navigator;
    };

    private _renderScene = (navigatorRoute: Types.NavigatorRoute) => {
        switch (navigatorRoute.routeId) {
            case NavigationRouteId.NavigationPanel:
                return (
                    (<NavigationPanel onPressNavigate={this._onPressNavigate} navigationItems={navItems}/>)
                );

            case NavigationRouteId.LocationPanel:
                return (
                    this.backButton(<LocationComponent onNavigateBack={this._onPressBack}/>, 'Location Service')
                );
        }

        return null;
    };

    private backButton(element: React.ReactElement<any>, componentName: string) {
        return (
            <RX.View>
                <RX.View style={_styles.backButtonBar}>
                    <RX.Button style={_styles.backButtonStyle} onPress={this._onPressBack}>
                        <RX.Text style={_styles.backButtonTextStyle}>{'←'}</RX.Text>
                    </RX.Button>
                    <RX.Text style={_styles.serviceName}>{componentName}</RX.Text>
                </RX.View>
                <RX.View style={_styles.navContent}>
                    {element}
                </RX.View>
            </RX.View>
        );
    }

    private _onPressNavigate = (routeId: NavigationRouteId) => {
        if (this._navigator) {
            this._navigator.push({
                sceneConfigType: Types.NavigatorSceneConfigType.FloatFromRight,
                routeId,
            });
        }
    };

    private _onPressBack = () => {
        if (this._navigator) {
            this._navigator.pop();
        }
    };
}
