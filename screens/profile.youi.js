import React, { Component } from 'react';
import { Composition, BackHandler, ButtonRef, TextRef } from '@youi/react-native-youi';
import { Timeline } from '../components';

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = { activeButton: 1 };
    BackHandler.addEventListener('onBackButtonPressed', this.navigateBack);
  }

  //playing animations before calling out seems to break 'back handling', it continues to reference old screens/timelines
  navigateBack = () => {
    this.outTimeline.play().then(() => this.props.navigation.goBack(null));
  }

  //navigateBack = () => {
  //  this.props.navigation.goBack(null);
  //}

  onPress = i => this.setState({ activeButton: i })

  render = () => {
    const buttons = new Array(3).fill().map((_, i) =>
      <ButtonRef key={i} name={`Btn-Profile${i + 1}`} onPress={() => this.onPress(i + 1)} >
        <TextRef name="Active User" text={this.state.activeButton === i + 1 ? 'Active User' : ''} />
      </ButtonRef>);

    return (
      <Composition source="Auryn_Profile">
        <Timeline name="ProfileIn" onLoad={timeline => timeline.play()} />
        <Timeline name="ProfileOut" ref={timeline => this.outTimeline = timeline} />
        {buttons}
      </Composition>
    );
  }
}
