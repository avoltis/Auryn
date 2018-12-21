import React, { Component } from 'react';
import { View, Composition, BackHandler, TextInputRef, FocusManager } from '@youi/react-native-youi';
import { tmdb, cache } from '../actions';
import { Timeline, List, BackButton } from '../components';
import { NavigationActions, withNavigationFocus } from 'react-navigation';
import { connect } from 'react-redux';

@connect(store => ({
  data: store.tmdbReducer.search.data,
  fetched: store.tmdbReducer.search.fetched,
}))
class Search extends Component {
  constructor(props) {
    super(props);
    this.state = { query: '' };
  }

  componentDidMount() {
    this.props.navigation.addListener('didFocus', () => {
      this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.navigateBack);
    });
    this.props.navigation.addListener('didBlur', () => this.backHandler.remove());
  }

  navigateBack = () => {
    this.outTimeline.play().then(() => this.props.navigation.goBack(null));
    return true;
  }

  onPressItem = (id, type) => {
    console.log(id);
    const navigateAction = NavigationActions.navigate({
      routeName: 'PDP',
      params: {
        id,
        type,
      },
      key: id,
    });
    this.props.dispatch(tmdb.getDetailsByIdAndType(id, type));
    this.props.navigation.dispatch(navigateAction);
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.query !== nextState.query) {
      this.search();
      return false;
    }

    return true;
  }

  onFocusItem = (ref, id, type) => this.props.dispatch(cache.saveDetailsByIdAndType(id, type));

  search = () => this.props.dispatch(tmdb.search(this.state.query));

  render() { // eslint-disable-line max-lines-per-function
    if (!this.props.isFocused)
      return <View />;
    const { data, fetched } = this.props;
    let movies = [];
    let tv = [];
    if (fetched && this.state.query) {
      movies = data.filter(it => it.media_type === 'movie').slice(0, 10);
      tv = data.filter(it => it.media_type === 'tv').slice(0, 10);
    }
    return (
      <Composition source="Auryn_Search">
        <BackButton
          focusable={this.props.isFocused}
          onPress={this.navigateBack}
        />
        <TextInputRef
          ref={ref => this.searchText = ref}
          onLoad={() => {
            FocusManager.focus(this.searchText);
          }}
          name="TextInput"
          secureTextEntry={false}
          onChangeText={text => this.setState({ query: text })}
          defaultValue={this.state.query}
        />

        <List
          name="List-PDP"
          type="Shows"
          data={tv}
          focusable={this.props.isFocused}
          onPressItem={this.onPressItem}
          onFocusItem={this.onFocusItem}
        />
        <List
          name="List-Movies"
          type="Shows"
          data={movies}
          focusable={this.props.isFocused}
          onPressItem={this.onPressItem}
          onFocusItem={this.onFocusItem}
        />

        <Timeline name="SearchOut" ref={timeline => this.outTimeline = timeline} />

        <Timeline name="SearchIn"
          ref={timeline => this.searchinTimeline = timeline}
          onLoad={timeline => timeline.play()}
        />
      </Composition>
    );
  }
}

export default withNavigationFocus(Search);
