'use strict';
import React from 'react';
import ReactNative from 'react-native';
import RadioButtons from './';

const {
  Text,
  TouchableWithoutFeedback,
  View,
  Platform
} = ReactNative;

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

    return {
      ...DEFAULTS,
      ...colors,
      ...this.props,
    };
  }

  renderContainer(config, options){
    var baseContainerStyle = {
      flexDirection: config.direction,
      backgroundColor: config.backgroundColor,
      borderColor: config.containerBorderTint,
      borderWidth: config.containerBorderWidth,
      overflow: 'hidden'
    };

    baseContainerStyle.borderRadius = config.containerBorderRadius;

    const containerStyle = [baseContainerStyle, this.props.containerStyle];

    return <View style={ containerStyle }>{options}</View>;
  }

  renderOption(config, option, selected, onSelect, index){

    const disabled = this.props.enabled === false;

    const baseTextStyle = {
      textAlign: config.textAlign
    };

    const normalTextStyle = [baseTextStyle, this.props.optionStyle, {
      color: config.tint
    }];

    const selectedTextStyle = [baseTextStyle, this.props.optionStyle, {
      color: config.selectedTint
    }];

    const baseColor = selected? config.selectedBackgroundColor: config.backgroundColor;
    const opacity = disabled ? 0.5 : 1.0;
    const baseOptionContainerStyle = [{
      paddingTop: config.paddingTop,
      paddingBottom: config.paddingBottom,
      backgroundColor: baseColor,
      opacity: opacity
    }, config.direction === 'row' && { flex: 1 }];

    const borderStyles = config.direction === 'row' ?
      {
        borderLeftWidth: config.separatorWidth,
        borderLeftColor: config.separatorTint,
      } : {
        borderTopWidth: config.separatorWidth,
        borderTopColor: config.separatorTint,
      };

    const separatorStyle = [baseOptionContainerStyle, borderStyles];

    const {containerBorderRadius, containerBorderWidth} = config;
    let borderRadiusStyle;

    // Workaround to get containerBorderRadius working on Android
    if (Platform.OS === "android" && containerBorderRadius) {
      const adjustedBorderRadius = containerBorderRadius - containerBorderWidth;
      if (this.props.options.length > 1) {
        if (index === 0) {
          borderRadiusStyle =  config.direction === 'row' ?
            {
              borderTopLeftRadius: adjustedBorderRadius,
              borderBottomLeftRadius: adjustedBorderRadius
            } : {
              borderTopLeftRadius: adjustedBorderRadius,
              borderTopRightRadius: adjustedBorderRadius
            };
        } else if (index === this.props.options.length - 1) {
          borderRadiusStyle =  config.direction === 'row' ?
            {
              borderTopRightRadius: adjustedBorderRadius,
              borderBottomRightRadius: adjustedBorderRadius
            } : {
              borderBottomLeftRadius: adjustedBorderRadius,
              borderBottomRightRadius: adjustedBorderRadius
            }
        }
        if (index === this.props.options.length - 2) {
          borderRadiusStyle =  config.direction === 'row' ?
            {
              borderRightWidth: config.separatorWidth,
              borderRightColor: config.separatorTint,
            } : {
              borderBottomWidth: config.separatorWidth,
              borderBottomColor: config.separatorTint,
            }
        }
      } else {
        borderRadiusStyle = {borderRadius: adjustedBorderRadius};
      }
    }

    const textStyle = selected ? selectedTextStyle : normalTextStyle;

    const label = this.props.extractText ? this.props.extractText(option) : option;

    // Default to true for undefined - like RN currently does
    const scaleFont = (this.props.allowFontScaling === false) ? false : true;

    return (
      <TouchableWithoutFeedback onPress={onSelect} key={index} disabled={disabled}>
        <View style={[index > 0 ? separatorStyle : baseOptionContainerStyle, this.props.optionContainerStyle, borderRadiusStyle]}>
          {typeof this.props.renderOption === 'function' ? this.props.renderOption.call(this, option, selected) : (
            <Text allowFontScaling={scaleFont} style={textStyle}>{label}</Text>
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

};
export default SegmentedControls;
