import React from 'react';
import { View } from '@youi/react-native-youi';
import ListItem from './listitem.youi';

export default function DiscoverContainer(props) {
  if (props.data.length !== 3) return null;
  if (props.index % 2) {
    return (
      <View>
        <View style={{ flexDirection: 'row' }}>
          <ListItem
            focusable={props.focusable} onPress={props.onPressItem}
            imageType="Backdrop" size="Small"
            data={props.data[0]}
          />
          <ListItem
            focusable={props.focusable} onPress={props.onPressItem}
            imageType="Backdrop" size="Small"
            data={props.data[1]}
          />
        </View>
        <ListItem
          focusable={props.focusable} onPress={props.onPressItem}
          imageType="Backdrop" size="Large"
          data={props.data[2]}
        />
      </View>
    );
  }
  return (
    <View>
      <ListItem
        focusable={props.focusable} onPress={props.onPressItem}
        imageType="Backdrop" size="Large"
        data={props.data[0]}
      />
      <View style={{ flexDirection: 'row' }}>
        <ListItem
          focusable={props.focusable} onPress={props.onPressItem}
          imageType="Backdrop" size="Small"
          data={props.data[1]}
        />
        <ListItem
          focusable={props.focusable} onPress={props.onPressItem}
          imageType="Backdrop" size="Small"
          data={props.data[2]}
        />
      </View>
    </View>
  );
}
