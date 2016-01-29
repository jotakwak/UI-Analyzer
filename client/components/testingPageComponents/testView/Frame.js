import React from 'react';
var Frame = React.createClass({

  render: function() {
    return <iframe className="testLayer" width="100%" height="100%" frameBorder="0" />;
  },
  componentDidMount: function() {
    this.renderFrameContent();
  },
  renderFrameContents: function() {
    var doc = this.getDOMNode().contentDocument
    if(doc.readyState === 'complete') {
       React.renderComponent(this.props.children, doc.body);
    } else {
       setTimeout(this.renderFrameContents, 0);
    }
  },
  componentDidUpdate: function() {
    this.renderFrameContents();
  },
  componentWillUnmount: function() {
    React.unmountComponentAtNode(this.getDOMNode().contentDocument.body);
  }
});

export Frame;