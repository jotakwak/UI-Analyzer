import React from 'react';
export default React.createClass({

  // getInitialState() {
  //   return {
  //     mouseX: 0,
  //     mouseY: 0
  //   };
  // },
  
  componentDidMount() {

    Element.prototype.remove = function() {
        this.parentElement.removeChild(this);
    }

    NodeList.prototype.remove = HTMLCollection.prototype.remove = function() {
        for(var i = this.length - 1; i >= 0; i--) {
            if(this[i] && this[i].parentElement) {
                this[i].parentElement.removeChild(this[i]);
            }
        }
    }
    var activateMouseShutter = function () {
      document.getElementById('testLayer').style.zIndex = '-20';
      setTimeout(function(){
        document.getElementById('testLayer').style.zIndex = '20';
      }, 50);
    };

    console.log('component did mount');
    setInterval(activateMouseShutter , 600)
  },

  trackMouse(event) {
    var x = event.pageX;
    var y = event.pageY;
    console.log('mousecoordinate', x, y);
  },

  // handleClick(event) {
  //   var x = event.pageX;
  //   var y = event.pageY;
  //   console.log('mousecoordinate', x, y);
  //   document.getElementById('testOverlay').parentElement.removeChild(this);
  //   }, 1);
  // },

  captureOnLoad() {
    console.log('capturing the screen');
    var documentHeight = document.getElementById('testLayer').scrollHeight;
    documentHeight = documentHeight.toString() + 'px';
    console.log('originContainer height :', documentHeight);
    document.getElementById('testOverlay').style.height = documentHeight;
  },

  render() {
    return (
    <div id="testingPage">
      <div>
      <iframe id="testLayer" width="100%" height="5000px" frameBorder="0" src="http://www.hackreactor.com" onLoad={this.captureOnLoad}/>
      <div id="testOverlay" onMouseOver={this.trackMouse}>
      </div>
      </div>
    </div>
    )
  }

});