import React, {Component} from 'react';
import ScrollUpButton  from 'react-scroll-up-button';
//import LoginForm from './LoginForm';

class DownImage extends Component{

  render() {

    return (
            <div>
                <br/>
                <div className="down-image down-text text-center" style={{height:"50px"}}>
                <br/><br/>
                    <h1>Get Your Travel</h1>
                    <h1>Plan Now.</h1>
                <br/><br/>
                <ScrollUpButton /><br/>
                </div>

              </div>

        );

}
}

export default DownImage;