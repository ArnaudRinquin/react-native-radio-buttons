import React from 'react';
import { StyleSheet, Text, ScrollView, View, TouchableWithoutFeedback } from 'react-native';

import { RadioButtons, SegmentedControls } from 'react-native-radio-buttons';

export default class App extends React.Component {

  state = {}

  render() {
    return (
      <ScrollView style={styles.container}>
        {this.renderbasic()}
        {this.renderCheckList()}
        {this.renderSegmentControlClone()}
        {this.renderVerticalSegmentControlClone()}
        {this.renderCustomSegmentControlClone()}
      </ScrollView>
    );
  }

  renderCheckList() {
    const options = [
      "American",
      "Australian",
      "British",
    ];

    function setSelectedOption(checkListOption){
      this.setState({
        checkListOption,
      });
    }

    function renderOption( option, selected, onSelect, index) {

      const textStyle = {
        paddingTop: 10,
        paddingBottom: 10,
        color: 'black',
        flex: 1,
        fontSize: 14,
      };
      const baseStyle = {
        flexDirection: 'row',
      };
      var style;
      var checkMark;

      if (index > 0) {
        style = [baseStyle, {
          borderTopColor: '#eeeeee',
          borderTopWidth: 1,
        }];
      } else {
        style = baseStyle;
      }

      if (selected) {
        checkMark = <Text style={{
          flex: 0.1,
          color: '#007AFF',
          fontWeight: 'bold',
          paddingTop: 8,
          fontSize: 20,
          alignSelf: 'center',
        }}>✓</Text>;
      }

      return (
        <TouchableWithoutFeedback onPress={onSelect} key={index}>
          <View style={style}>
            <Text style={textStyle}>{option}</Text>
            {checkMark}
          </View>
        </TouchableWithoutFeedback>
      );
    }

    function renderContainer(options){
      return (
        <View style={{
          backgroundColor: 'white',
          paddingLeft: 20,
          borderTopWidth: 1,
          borderTopColor: '#cccccc',
          borderBottomWidth: 1,
          borderBottomColor: '#cccccc',
        }}>
          {options}
        </View>
      );
    }

    return (
      <View style={{flex: 1}}>
        <View style={{marginTop: 10, backgroundColor: 'white'}}>
          <Text style={{padding: 20, fontWeight:'bold'}}>VerticalSelect</Text>

          <View style={{
            backgroundColor: '#eeeeee',
            paddingTop: 5,
            paddingBottom: 5,
          }}>
            <Text style={{
              color: '#555555',
              paddingLeft: 20,
              marginBottom: 5,
              marginTop: 5,
              fontSize: 12,
            }}>ACCENT</Text>
            <RadioButtons
              options={ options }
              onSelection={ setSelectedOption.bind(this) }
              selectedOption={ this.state.checkListOption }
              renderOption={ renderOption }
              renderContainer={ renderContainer }
            />
          </View>
          <Text style={{
            margin: 20,
          }}>Selected accent: {this.state.checkListOption || 'none'}</Text>
        </View>
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
          <View><Text style={style}>{option}</Text></View>
        </TouchableWithoutFeedback>
      );
    }

    function renderContainer(optionNodes){
      return <View>{optionNodes}</View>;
    }

    return (
      <View style={{marginTop: 10, padding: 20, backgroundColor: 'white'}}>
        <Text style={{paddingBottom: 10, fontWeight:'bold'}}>Super basic</Text>
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
      <View style={{marginTop: 10, padding: 20, backgroundColor: 'white'}}>
        <Text style={{paddingBottom: 10, fontWeight:'bold'}}>SegmentedControl</Text>
        <SegmentedControls
          options={ options }
          onSelection={ setSelectedOption.bind(this) }
          selectedOption={ this.state.selectedSegment }
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
      <View style={{marginTop: 10, padding: 20, backgroundColor: 'white'}}>
        <Text style={{paddingBottom: 10, fontWeight:'bold'}}>SegmentedControl (direction={'column'})</Text>
        <SegmentedControls
          direction={'column'}
          options={ options }
          onSelection={ setSelectedOption.bind(this) }
          selectedOption={this.state.selectedVerticalSegment }
        />
        <Text style={{marginTop: 10}}>Selected option: {this.state.selectedVerticalSegment || 'none'}</Text>
      </View>);
  }
  renderCustomSegmentControlClone(){
    const options = [
      { label:'We', value: 'Do' },
      { label:'Love', value: 'You'},
      { label:'Music', value: '?' },
    ];

    function setSelectedOption(option){
      this.setState({
        selectedCustomSegment: option,
      });
    }

    return (
      <View style={{marginTop: 10, padding: 20, backgroundColor: 'white'}}>
        <Text style={{paddingBottom: 10, fontWeight:'bold'}}>SegmentedControl (custom colors and option format)</Text>
        <SegmentedControls
          tint= {'#f80046'}
          selectedTint= {'white'}
          backTint= {'#1e2126'}
          optionStyle= {{
            fontSize: 30,
            fontWeight: 'bold',
            fontFamily: 'Snell Roundhand'
          }}
          containerStyle= {{
            marginLeft: 10,
            marginRight: 10,
          }}
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
        <Text style={{marginTop: 10}}>Selected option: {this.state.selectedCustomSegment&& this.state.selectedCustomSegment.value || 'none'}</Text>
      </View>);
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
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
