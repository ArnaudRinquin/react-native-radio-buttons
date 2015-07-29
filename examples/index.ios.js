/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
} = React;

var RadioButtons = require('./radio-buttons');

var examples = React.createClass({
  getInitialState: function(){
    return {};
  },
  render: function() {
    return (<View>
      {this.renderbasic()}
      {this.renderSegmentControlClone()}
      {this.renderVerticalSegmentControlClone()}
    </View>);
  },
  // Super basic example
  renderbasic:function(){

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
  },
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

    const AppleBlueTint = '#007AFF';
    const baseStyle = {
      paddingTop: 5,
      paddingBottom: 5,
      textAlign: 'center',
    };

    const normalStyle = [baseStyle, {
      color: AppleBlueTint,
      backgroundColor: 'white',
    }];
    const selectedStyle = [baseStyle, {
      color: 'white',
      backgroundColor: AppleBlueTint,
    }];

    const baseOptionContainerStyle = {
      flex: 1,
    };

    const separatorStyle = [baseOptionContainerStyle, {
      borderLeftWidth: 1,
      borderLeftColor: AppleBlueTint,
    }];

    function renderOption(option, selected, onSelect, index){
      const style = selected ? selectedStyle : normalStyle;



      return (
        <TouchableWithoutFeedback onPress={onSelect} key={index}>
          <View style={index > 0 ? separatorStyle : baseOptionContainerStyle}>
            <Text style={style}>{option}</Text>
          </View>
        </TouchableWithoutFeedback>
      );
    }

    const containerStyle = {
      flexDirection: 'row',
      backgroundColor: 'white',
      borderColor: AppleBlueTint,
      borderWidth: 1,
      borderRadius: 5,
      overflow: 'hidden',
    };

    function renderContainer(options){
      return <View style={containerStyle}>{options}</View>;
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
        <Text style={{marginTop: 10}}>Selected option: {this.state.selectedSegment || 'none'}</Text>
      </View>);
  },
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

    const AppleBlueTint = '#007AFF';
    const baseStyle = {
      paddingTop: 5,
      paddingBottom: 5,
      textAlign: 'center',
    };

    const normalStyle = [baseStyle, {
      color: AppleBlueTint,
      backgroundColor: 'white',
    }];
    const selectedStyle = [baseStyle, {
      color: 'white',
      backgroundColor: AppleBlueTint,
    }];

    const baseOptionContainerStyle = {
      flex: 1,
    };

    const separatorStyle = [baseOptionContainerStyle, {
      borderTopWidth: 1,
      borderTopColor: AppleBlueTint,
    }];

    function renderOption(option, selected, onSelect, index){
      const style = selected ? selectedStyle : normalStyle;



      return (
        <TouchableWithoutFeedback onPress={onSelect} key={index}>
          <View style={index > 0 ? separatorStyle : baseOptionContainerStyle}>
            <Text style={style}>{option}</Text>
          </View>
        </TouchableWithoutFeedback>
      );
    }

    const containerStyle = {
      flexDirection: 'column',
      backgroundColor: 'white',
      borderColor: AppleBlueTint,
      borderWidth: 1,
      borderRadius: 5,
      overflow: 'hidden',
    };

    function renderContainer(options){
      return <View style={containerStyle}>{options}</View>;
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
        <Text style={{marginTop: 10}}>Selected option: {this.state.selectedVerticalSegment || 'none'}</Text>
      </View>);
  }

});

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

AppRegistry.registerComponent('examples', () => examples);
