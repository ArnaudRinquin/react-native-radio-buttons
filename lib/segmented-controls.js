'use strict';
import React from 'react-native';
import RadioButtons from './';
import assign from 'object-assign';

const {
  Text,
  TouchableWithoutFeedback,
  View,
  Platform
} = React;

class SegmentedControls extends React.Component {

  render(){
    const config = this.getConfig();

    return (
      <RadioButtons {...this.props}
        renderOption={ this.renderOption.bind(this, config) }
        renderContainer={ this.renderContainer.bind(this, config) }
      />
    );
  }

  getConfig(){

    const tint = this.props.tint || DEFAULTS.tint;
    const backTint = this.props.backTint || DEFAULTS.backTint;
    const colors = {
      tint: tint,
      selectedTint: backTint,
      backgroundColor: backTint,
      selectedBackgroundColor: tint,
      containerBorderTint: tint,
      separatorTint: tint,
    };
    return assign({}, DEFAULTS, colors, this.props);
  }

  renderContainer(config, options){
    var containerStyle = {
      flexDirection: config.direction,
      backgroundColor: config.backgroundColor,
      borderColor: config.containerBorderTint,
      borderWidth: config.containerBorderWidth,
      overflow: 'hidden',
      height:config.height,
      borderBottomColor:config.containerBorderBottomColor,
      borderBottomWidth:config.containerBorderBottomWidth
  };

    // overflow hidden does not clip subviews: https://github.com/facebook/react-native/issues/3198
    if (Platform.OS !== "android") {
      containerStyle.borderRadius = config.containerBorderRadius;
    }

    return <View style={containerStyle}>{options}</View>;
  }

  renderOption(config, option, selected, onSelect, index){

    const baseStyle = {
      textAlign: config.textAlign,
    };

    const selectedStyle = [baseStyle, this.props.optionStyle, {
      color: config.selectedTint,
      backgroundColor: config.selectedBackgroundColor,
      fontSize:config.fontSize
    }];

    const baseColor = selected? config.selectedBackgroundColor: config.backgroundColor;

    const baseOptionContainerStyle = {
      flex: 1,
      paddingTop: config.paddingTop,
      paddingBottom: config.paddingBottom,
      backgroundColor: baseColor,
      height:config.height,
      justifyContent:config.justifyContent,
      alignItems:config.alignItems,
      alignSelf:config.alignSelf,
  };

    const normalStyle = [baseStyle, this.props.optionStyle, {
      color: config.tint,
      backgroundColor: config.backgroundColor,
      fontSize:config.fontSize
    }];

    const borderStyles = config.direction === 'row' ?
      {
        borderLeftWidth: config.separatorWidth,
        borderLeftColor: config.separatorTint,
      } : {
        borderTopWidth: config.separatorWidth,
        borderTopColor: config.separatorTint,
      };
    const bottomBarStyles = {
      borderBottomWidth: config.borderBottomWidth,
      borderBottomColor: config.borderBottomColor,
      };
    const separatorStyle = [baseOptionContainerStyle, borderStyles];

    const style = selected ? selectedStyle : normalStyle;

    const label = this.props.extractText ? this.props.extractText(option) : option;

    // Default to true for undefined - like RN currently does
    const scaleFont = (this.props.allowFontScaling === false) ? false : true;

    return (
      <TouchableWithoutFeedback onPress={onSelect} key={index} style={{height:config.height}}>
        <View style={[index > 0 ? separatorStyle : baseOptionContainerStyle,selected?bottomBarStyles:null]}>
          {typeof this.props.renderOption === 'function' ? this.props.renderOption.call(this, option, selected) : (
            <Text allowFontScaling={scaleFont} style={style}>{label}</Text>
          )}
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const IOS_BLUE = '#007AFF';
const IOS_WHITE = '#ffffff';

const DEFAULTS = {
  direction: 'row',

  tint: IOS_BLUE,
  backTint: IOS_WHITE,

  paddingTop: 5,
  paddingBottom: 5,
  textAlign: 'center',

  selectedTint: IOS_WHITE,
  selectedBackgroundColor: IOS_WHITE,

  separatorTint: IOS_BLUE,
  separatorWidth: 1,

  containerBorderTint: IOS_BLUE,
  containerBorderWidth: 1,
  containerBorderRadius: 5,

  containerBorderBottomWidth:1,
  containerBorderBottomColor:IOS_BLUE,


  borderBottomWidth:3,
  borderBottomColor:IOS_BLUE,
  backgroundColor:IOS_WHITE,

  height:30,
  justifyContent:'center',
  alignItems:'center',
  alignSelf:'center',
  fontSize:16,

};
export default SegmentedControls;
