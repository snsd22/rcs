import * as React from 'react';
import { FieldProps } from 'formik';
import { Button } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import { ReactNativeFile } from 'apollo-upload-client';

export class PictureField extends React.Component<FieldProps<any> & { title: string }> {
  onPress = async () => {
    const { status } = await Permissions.getAsync(Permissions.CAMERA_ROLL);
    if (status !== 'granted') {
      await Permissions.askAsync(Permissions.CAMERA_ROLL);
    }
    const imageResult = await ImagePicker.launchImageLibraryAsync({});
    if (!imageResult.cancelled) {
      const file = new ReactNativeFile({
        uri: imageResult.uri,
        type: imageResult.type,
        name: 'picture',
      });
      const {
        field: { name },
        form: { setFieldValue },
      } = this.props;
      setFieldValue(name, file);
    }
  };

  render() {
    const { ...props } = this.props;
    return <Button {...props} onPress={this.onPress} />;
  }
}
