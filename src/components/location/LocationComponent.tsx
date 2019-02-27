import * as RX from 'reactxp';
import {ComponentBase} from 'resub';
import * as React from 'react';
import {VirtualListViewCellRenderDetails, VirtualListViewItemInfo, VirtualListView} from 'reactxp-virtuallistview';
import LocationStore from '../../stores/LocationStore';

// Extend VirtualListViewItemInfo to include display text
interface LocationItemInfo extends VirtualListViewItemInfo {
    location: Position;
}

interface LocationComponentProps extends RX.CommonProps {
    onNavigateBack: () => void;
}

interface LocationState {
    locationItems: LocationItemInfo[];
}

const _locationHeight: number = 35;

const _styles = {
    panel: RX.Styles.createViewStyle({
        height: RX.UserInterface.measureWindow().height - 120,
        // todo: needs update on resize.. here we should use a store...
    }, false),
    addButtonText: RX.Styles.createTextStyle({
        fontSize: 20,
        color: 'white',
        alignContent: 'center',
        alignItems: 'center',
    }, true),
    addButton: RX.Styles.createButtonStyle({
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: 50,
        height: 50,
        alignContent: 'center',
        alignItems: 'center',
        backgroundColor: 'orange',
        borderRadius: 25,
    }, true),
    locationViewStyle: RX.Styles.createViewStyle({
        height: _locationHeight,
        backgroundColor: '#fff',
        alignItems: 'stretch',
        borderBottomWidth: 1,
    }, true),
};

export class LocationComponent extends ComponentBase<LocationComponentProps, LocationState> {

    public componentWillUnmount(): void {
        super.componentWillUnmount();
    }

    public componentDidMount(): void {
        super.componentDidMount();
        RX.Location.setConfiguration({skipPermissionRequests: false});
    }

    public render(): React.ReactElement<any> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        if (!this.state.locationItems || this.state.locationItems.length === 0) {
            return (
                <RX.View style={_styles.panel}>
                    <RX.Text>No locations here...</RX.Text>
                    <RX.Button style={_styles.addButton} onPress={this.addLocation}>
                        <RX.Text style={_styles.addButtonText}>+</RX.Text>
                    </RX.Button>
                </RX.View>
            );
        } else {
            return (
                <RX.View style={_styles.panel}>
                    <VirtualListView itemList={this.state.locationItems} renderItem={this.renderRow}/>
                    <RX.Button style={_styles.addButton} onPress={this.addLocation}>
                        <RX.Text style={_styles.addButtonText}>+</RX.Text>
                    </RX.Button>
                </RX.View>
            );
        }
    }

    protected _buildState(_props: LocationComponentProps, _initialBuild: boolean): Partial<LocationState> | undefined {
        const partialState: Partial<LocationState> = {};

        partialState.locationItems = LocationStore.getLocations().map((location, i) => {
            return {
                key: i.toString(),
                template: 'location',
                height: _locationHeight,
                location,
            };
        });

        return partialState;
    }

    private renderRow(details: VirtualListViewCellRenderDetails<LocationItemInfo>) {
        const item = details.item;
        return (
            <RX.View style={_styles.locationViewStyle}>
                <RX.Text>
                    latitude: {item.location.coords.latitude}, longitude: {item.location.coords.longitude} ({details.item.location.timestamp})
                </RX.Text>
            </RX.View>
        );
    }

    private addLocation = () => {
        RX.Location.getCurrentPosition({timeout: 2000, enableHighAccuracy: true, maximumAge: 100}).thenAsync((value) => {
            LocationStore.addLocation(value);
        }).catch((error) => RX.Alert.show('Problem with your location data..', error));
    }
}
