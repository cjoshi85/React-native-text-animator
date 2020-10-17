import React, { Component } from 'react';
import { View, StyleSheet, Text, Animated } from 'react-native';

export default class TextAnimator extends Component {
  animatedValues = [];

  constructor(props) {
    super(props);
    const textArr = this.props.textContent.split(' ');
    textArr.forEach((item, index) => {
      this.animatedValues[index] = new Animated.Value(0);
    });
    this.textArr = textArr;
    this.textHide = false;
  }

  componentDidMount() {
    this.animateText();
  }

  animateText = (toValue = 1) => {
    const {duration, onFinish, hideText} = this.props;
    const animations = this.textArr.map((item, index) => {
      return Animated.timing(this.animatedValues[index], {
        toValue,
        duration,
        useNativeDriver: true
      });
    });
    Animated.stagger(duration / 5, toValue === 0 ? animations.reverse() : animations).start(() => {
      if (hideText && !this.textHide) {
        this.textHide = true;
        setTimeout(() => this.animateText(toValue === 0 ? 1 : 0), 1000);
      }
      if (onFinish) {
        onFinish();
      }
    });
  };

  render() {
    const {textStyle} = this.props;
    console.log('ths', this.textArr);
    return (
      <View style={styles.textWrapper}>
        {this.textArr.map((item, index) => {
          return (
            <Animated.Text
              key={`${item}_${index}`}
              style={[textStyle,
                {
                  opacity: this.animatedValues[index],
                  transform: [{
                    translateY: Animated.multiply(
                      this.animatedValues[index],
                      new Animated.Value(-5)
                    )
                  }]
                }
              ]}>{item}{index < this.textArr.length ? ' ' : ''}</Animated.Text>
          )
        })}
      </View>
    );
  }
};

const styles = StyleSheet.create({
  textWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center'
  }
});
