/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React from 'react-native';
const {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
} = React;

import { RadioButtons, SegmentedControls } from './lib';

class Examples extends React.Component {
  constructor(){
    super();
    this.state = {};
  }
  render() {
    return (<View>
      {this.renderbasic()}
      {this.renderSegmentControlClone()}
      {this.renderVerticalSegmentControlClone()}
      {this.renderCustomSegmentControlClone()}
    </View>);
  }
  // Super basic example
  renderbasic(){

    const options = [
      "Option 1",
      "Option 2"
    ];

    function setSelectedOption(selectedOption){
      this.setState({
        selectedOption
      });
    };

    function renderOption(option, selected, onSelect, index){
      const style = selected ? { fontWeight: 'bold'} : {}

      return (
        <TouchableWithoutFeedback onPress={onSelect} key={index}>
          <Text style={style}>{option}</Text>
        </TouchableWithoutFeedback>
      );
    }

    function renderContainer(optionNodes){
      return <View>{optionNodes}</View>;
    }

    return (
      <View style={{margin: 20}}>
        <RadioButtons
          options={ options }
          onSelection={ setSelectedOption.bind(this) }
          selectedOption={this.state.selectedOption }
          renderOption={ renderOption }
          renderContainer={ renderContainer }
        />
        <Text>Selected option: {this.state.selectedOption || 'none'}</Text>
      </View>);
  }
  renderSegmentControlClone(){
    const options = [
      'Paid',
      'Free',
      'Top grossing',
    ];

    function setSelectedOption(selectedSegment){
      this.setState({
        selectedSegment
      });
    }

    return (
      <View style={{margin: 20}}>
        <SegmentedControls
          options={ options }
          onSelection={ setSelectedOption.bind(this) }
          selectedOption={this.state.selectedOption }
        />
        <Text style={{marginTop: 10}}>Selected option: {this.state.selectedSegment || 'none'}</Text>
      </View>);
  }
  renderVerticalSegmentControlClone(){
    const options = [
      'So',
      'Many',
      'Choices',
      'It',
      'Is',
      'Hard',
      'To',
      'Pick',
      'One',
    ];

    function setSelectedOption(selectedVerticalSegment){
      this.setState({
        selectedVerticalSegment
      });
    }

    return (
      <View style={{margin: 20}}>
        <SegmentedControls
          direction={'column'}
          options={ options }
          onSelection={ setSelectedOption.bind(this) }
          selectedOption={this.state.selectedOption }
        />
        <Text style={{marginTop: 10}}>Selected option: {this.state.selectedVerticalSegment || 'none'}</Text>
      </View>);
  }
  renderCustomSegmentControlClone(){
    const options = [
      { label:'We' },
      { label:'Love' },
      { label:'Music' },
    ];

    function setSelectedOption(option){
      this.setState({
        selectedCustomSegment: option,
      });
    }

    return (
      <View style={{marginTop: 10, padding: 20, backgroundColor: 'white'}}>
        <Text style={{paddingBottom: 10, fontWeight:'bold'}}>SegmentedControl (custom colors)</Text>
        <SegmentedControls
          tint= {'#f80046'}
          selectedTint= {'white'}
          backTint= {'#1e2126'}
          options={ options }
          onSelection={ setSelectedOption.bind(this) }
          selectedOption={ this.state.selectedCustomSegment }
          extractText={ (option) => option.label }
          testOptionEqual={ (a, b) => {
            if (!a || !b) {
              return false;
            }
            return a.label === b.label
          }}
        />
        <Text style={{marginTop: 10}}>Selected option: {this.state.selectedCustomSegment&& this.state.selectedCustomSegment.label || 'none'}</Text>
      </View>);
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('examples', () => Examples);
