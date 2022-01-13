import React, {forwardRef, useRef, useImperativeHandle} from 'react'
import RBSheet, {RBSheetProps} from 'react-native-raw-bottom-sheet'
import ImagePickerCropper from 'react-native-image-crop-picker';
import Icon from 'react-native-vector-icons/Feather';
import {
  Container,
  ButtonSelected,
  ButtonSelectedText
} from './styles';



interface ImagemPickerProps  extends RBSheetProps{
  onFileSelected: (data : object) => void

}

// export interface ImagePickerRBSheetProps {
//   open : () => void
//   close: () => void
// }




const ImagePicker : React.RefForwardingComponent<RBSheet, ImagemPickerProps> = ({onFileSelected},ref) =>{

  const RBSheetRef = useRef<RBSheet>(null)

  // useImperativeHandle(ref, () => ({
  //   open () {
  //     RBSheetRef.current?.open()
  //   },
  //   close() {
  //     RBSheetRef.current?.close()
  //   }
  // }))

  const options = [
    {
      name: 'Tiara foto camera',
      icon: <Icon size={21} name="camera" />,
      onPress: () => {
        ImagePickerCropper.openCamera({
          width: 300,
          height: 300,
          cropping: true,
          freeStyleCropEnabled: true,
        })
          .then((images) => {
            onFileSelected(images);
            RBSheetRef.current?.close()
          })
          .catch((error) => console.log(error));
      },
    },
    {
      name: 'Abir galeria',
      icon: <Icon name="image" size={21} />,
      onPress: () => {
        ImagePickerCropper.openPicker({
          width: 300,
          height: 300,
          cropping: true,
          freeStyleCropEnabled: true,
        })
          .then((images) => {
            
            onFileSelected(images);
            RBSheetRef.current?.close()
          })
          .catch((error) => console.log(error));
      },
    },
  ]
  return (
    <RBSheet
      ref={ref}
      height={140}
      openDuration={100}
      dragFromTopOnly
      closeOnDragDown
      customStyles={{
        container: {
          borderTopRightRadius: 20,
          borderTopLeftRadius: 20,
        },
      }}
    >
      {options.map(({ onPress, name, icon }) => (
        <Container key={name}>
          <ButtonSelected onPress={onPress}>
            {icon}
            <ButtonSelectedText>{name}</ButtonSelectedText>
          </ButtonSelected>
        </Container>
      ))}
    </RBSheet>
  );

}

export default forwardRef(ImagePicker);
