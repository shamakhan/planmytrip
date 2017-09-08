import React, { Component, PropTypes } from 'react';

class Affix extends Component {

  propTypes : {
    offset: PropTypes.number,
  };

  defaultProps: {
    offset: 0,
  };

  constructor() {
    super();
    this.state = {
      affix: false,
    };

    this.handleScroll=this.handleScroll.bind(this);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll()  {
    const affix = this.state.affix;
    const offset = this.props.offset;
   
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
//console.log(scrollTop+' '+bottomOffset);
    if (!affix && scrollTop >= offset) {
      this.setState({
        affix: true,
      });
    }
    else if (affix && scrollTop < offset) {
      this.setState({
        affix: false,
      });
    }
  };

  render() {
    const affix = this.state.affix ? 'affix' : '';
    const { className, ...props } = this.props;

    return (
      <div {...props} className={`${className || ''} ${affix}`}>
        {this.props.children}
      </div>
    );
  }
}

export default Affix;