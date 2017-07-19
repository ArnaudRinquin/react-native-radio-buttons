'use strict';
var React = require('react');
var ReactNative = require('react-native');
var PropTypes = require('prop-types');

const {
  Text,
  TouchableWithoutFeedback,
  View,
} = ReactNative;

const propTypes = {
  options: PropTypes.array.isRequired,
  testOptionEqual: PropTypes.func,
  renderOption: PropTypes.func,
  renderContainer: PropTypes.func,
  onSelection: PropTypes.func,
};

class RadioButtons extends React.Component {
  constructor(){
    super();
    this.state = {
      selectedOption: null,
      selectedIndex: null,
    };
  }

  copySelectedOptionFromProps({selectedOption, selectedIndex}){
    this.setState({
      selectedOption,
      selectedIndex,
    });
  }

  componentWillMount(){
    this.copySelectedOptionFromProps(this.props);
  }

  componentWillReceiveProps(newProps){
    this.copySelectedOptionFromProps(newProps);
  }

  selectOption(selectedOption, selectedIndex){
    this.setState({
      selectedOption,
      selectedIndex,
    });
    this.props.onSelection(selectedOption, selectedIndex);
  }

  render() {
    const {selectedOption, selectedIndex} = this.state;

    const children = this.props.options.map(function(option, index){
      const isSelected = selectedIndex === index || this.props.testOptionEqual(selectedOption, option);
      const onSelection = this.selectOption.bind(this, option, index);

      return this.props.renderOption(option, isSelected, onSelection, index);
    }.bind(this));

    return this.props.renderContainer(children);
  }

  static getTextOptionRenderer(normalStyle, selectedStyle, extractText) {
    return function renderOption(option, selected, onSelect, index){
      const style = selected ? selectedStyle : normalStyle;
      const label = extractText ? extractText(option) : option;
      return (
        <TouchableWithoutFeedback onPress={onSelect} key={index}>
          <Text style={style}>{label}</Text>
        </TouchableWithoutFeedback>
      );
    };
  }
  static getViewContainerRenderer(style) {
    return function renderContainer(options){
      return <View style={style}>{options}</View>;
    };
  }
}

RadioButtons.renderHorizontalContainer = RadioButtons.getViewContainerRenderer({
  flexDirection: 'row',
});

RadioButtons.renderVerticalContainer = RadioButtons.getViewContainerRenderer({
  flexDirection: 'column'
});

RadioButtons.defaultProps = {
  testOptionEqual(a, b){
    return a === b;
  },
  renderOption: RadioButtons.getTextOptionRenderer({}, { fontWeight: 'bold' }),
  renderContainer: RadioButtons.renderVerticalContainer,
  onSelection(option){}
};
RadioButtons.propTypes = propTypes;

module.exports = RadioButtons;
