var React = require('react-native');

const {
  Text,
  TouchableWithoutFeedback,
  View,
} = React;

const propTypes = {
  options: React.PropTypes.array.isRequired,
  testOptionEqual: React.PropTypes.func,
  renderOption: React.PropTypes.func,
  renderContainer: React.PropTypes.func,
  onSelection: React.PropTypes.func,
};

class RadioButtons extends React.Component {
  constructor(){
    super();
    this.state = {
      selectedOption: null
    };
  }

  componentWillMount(){
    this.setState({
      selectedOption: this.props.selectedOption
    });
  }

  selectOption(selectedOption){
    this.setState({
      selectedOption
    });
    this.props.onSelection(selectedOption);
  }

  render() {
    const {selectedOption} = this.state;

    const children = this.props.options.map(function(option, index){
      const isSelected = this.props.testOptionEqual(selectedOption, option);
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
