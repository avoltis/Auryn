import React, { Component } from 'react';
import {
    View,
} from 'react-native';
import {
    ButtonRef,
    TextRef,
    TimelineRef,
    ViewRef,
    Fragment,
} from 'react-native-youi';

class Button extends Component {
    constructor(props) {
        super(props);

        this.state = {
            toggled: true
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.toggled != prevState.toggled) {
            if (this.state.toggled)
                this.toggleOnTimeline.play();
            else
                this.toggleOffTimeline.play();
        }
    }

    render() {
        let toggleTimelines = this.props.toggle ? (
            <Fragment>
                <TimelineRef name="Toggle-On"
                onLoad={(timeline) => {
                    this.toggleOnTimeline=timeline;
                    if (this.state.toggled)
                    timeline.play();
                }}/>
                <TimelineRef name="Toggle-Off"
                onLoad={(timeline) => {
                    this.toggleOffTimeline=timeline;
                }}/>
            </Fragment>
        ) : null
        let button =
            <Fragment>
            <ButtonRef
                name={this.props.name}
                onClick={() => {
                    this.props.onClick()
                    if (this.props.toggle) {
                        this.setState({toggled: !this.state.toggled})
                    }
                    this.focusInTimeline.play();
            }}>
            <TimelineRef name="FocusIn"
                onLoad={(timeline) => { this.focusInTimeline=timeline }}
            />
            {toggleTimelines}
            </ButtonRef>
            </Fragment>
        let container = this.props.container ? (
            <ViewRef name={this.props.container}>
                <TimelineRef name="In"
                    ref={(timeline) => { this.inTimeline = timeline }}
                    onLoad={(t) => t.play()}
                />
                {button}
            </ViewRef>
        ) : [button]
        return (
            [container]
        )
    }
}

export default Button
