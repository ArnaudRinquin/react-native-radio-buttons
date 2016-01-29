'use strict';
var React = require('react-native');

const {
  Text,
  TouchableWithoutFeedback,
  View,
} = React;

const propTypes = {
  options: React.PropTypes.array.isRequired,
  testOptionInArray: React.PropTypes.func,
  renderOption: React.PropTypes.func,
  renderContainer: React.PropTypes.func,
  onSelection: React.PropTypes.func,
};

class Checkboxes extends React.Component {
  constructor(){
    super();
    this.state = {
      selectedOptions: []
    };
  }

  copySelectedOptionFromProps({selectedOption}){
    let clonedSelectedOptions = this.state.selectedOptions.slice(),
    	idxOfSelectedOption = clonedSelectedOptions.indexOf(selectedOption);

    if (idxOfSelectedOption !== -1) {
      clonedSelectedOptions.splice(idxOfSelectedOption, 1)
    } else {
      clonedSelectedOptions.push(selectedOption);
    }

    this.setState({
      selectedOptions: clonedSelectedOptions
    });
  }

  componentWillMount(){
    this.copySelectedOptionFromProps(this.props);
  }

  componentWillReceiveProps(newProps){
    this.copySelectedOptionFromProps(newProps);
  }

  selectOption(selectedOption){
    let clonedSelectedOptions = this.state.selectedOptions.slice(),
    	idxOfSelectedOption = clonedSelectedOptions.indexOf(selectedOption);
    	
    if (idxOfSelectedOption !== -1) {
      clonedSelectedOptions.splice(idxOfSelectedOption, 1)
    } else {
      clonedSelectedOptions.push(selectedOption);
    }

    this.setState({
      selectedOptions: clonedSelectedOptions
    });
    this.props.onSelection(selectedOption);
  }

  render() {
    const {selectedOptions} = this.state;

    const children = this.props.options.map(function(option, index){
      const isSelected = this.props.testOptionInArray(selectedOptions, option);
      const onSelection = this.selectOption.bind(this, option);

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

Checkboxes.renderHorizontalContainer = Checkboxes.getViewContainerRenderer({
  flexDirection: 'row',
});

Checkboxes.renderVerticalContainer = Checkboxes.getViewContainerRenderer({
  flexDirection: 'column'
});

Checkboxes.defaultProps = {
  testOptionInArray(a, b){
    return a.indexOf(b) !== -1;
  },
  renderOption: Checkboxes.getTextOptionRenderer({}, { fontWeight: 'bold' }),
  renderContainer: Checkboxes.renderVerticalContainer,
  onSelection(option){}
};
Checkboxes.propTypes = propTypes;

module.exports = Checkboxes;
