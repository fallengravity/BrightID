// @flow

import * as React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import RNFS from 'react-native-fs';
import { groupCirclePhotos } from '@/utils/groups';
import { DEVICE_LARGE } from '@/utils/constants';

const photoStyle = (photo) => {
  const style = { ...styles.photo };
  if (photo.faded) {
    style.opacity = 0.25;
  }
  return {
    ...style,
  };
};

const GroupPhoto = ({ group }) => {
  if (group.photo?.filename) {
    return (
      <View style={styles.container}>
        <Image
          source={{
            uri: `file://${RNFS.DocumentDirectoryPath}/photos/${group.photo.filename}`,
          }}
          style={styles.bigPhoto}
        />
      </View>
    );
  } else {
    const circlePhotos = groupCirclePhotos(group).map((item) => {
      if (item.photo?.filename) {
        item.source = {
          uri: `file://${RNFS.DocumentDirectoryPath}/photos/${item.photo?.filename}`,
        };
      } else {
        item.source = require('@/static/default_profile.jpg');
      }
      return item;
    });

    return (
      <View style={styles.container}>
        <View style={styles.topPhotos}>
          {circlePhotos[0] && (
            <Image
              source={circlePhotos[0].source}
              style={photoStyle(circlePhotos[0])}
            />
          )}
        </View>
        <View style={styles.bottomPhotos}>
          {circlePhotos[1] && (
            <Image
              source={circlePhotos[1].source}
              style={photoStyle(circlePhotos[1])}
            />
          )}
          {circlePhotos[2] && (
            <Image
              source={circlePhotos[2].source}
              style={photoStyle(circlePhotos[2])}
            />
          )}
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  bigPhoto: {
    borderRadius: 30,
    width: 60,
    height: 60,
    backgroundColor: '#d8d8d8',
  },
  photo: {
    borderRadius: 20,
    width: DEVICE_LARGE ? 40 : 32,
    height: DEVICE_LARGE ? 40 : 32,
    backgroundColor: '#d8d8d8',
  },
  faded: {
    opacity: 0.25,
  },
  topPhotos: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginBottom: -3.3,
  },
  bottomPhotos: {
    marginTop: -3.3,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
});

export default connect()(GroupPhoto);
