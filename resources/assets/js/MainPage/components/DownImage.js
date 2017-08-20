import React, {Component} from 'react';
//import LoginForm from './LoginForm';

class DownImage extends Component{

  render() {
    const imgStyle={
      height : "200px"
    }

    return (
            <div>
                <br/>
                <div className="down-image down-text text-center" style={imgStyle}>
                <br/><br/>
                    <h1>Get Your Travel Plan Now.</h1>
                <br/><br/>
                <a type="button" className="btn btn-lg btn-info" href="/login">Login&nbsp;<span className="glyphicon glyphicon-chevron-right"></span></a>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                        <a type="button" className="btn btn-lg btn-info" href="/register">Register&nbsp;<span className="glyphicon glyphicon-chevron-right"></span></a>

                </div>

              </div>

        );

}
}

export default DownImage;