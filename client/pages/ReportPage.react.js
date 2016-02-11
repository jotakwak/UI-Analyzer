import React, { Component } from 'react';
import { connect } from 'react-redux';
// import ReactHeatmap from 'react-heatmap';
import { setFocus, pageState, getsMouseTracking, getsComment } from '../redux/actions';
import Note from '../components/testingPageComponents/notesView/Note';
{/*Note is a shared component and can be placed in a shared component place*/}

class ReportPage extends Component {
  constructor (props) {
    super(props);
    this.state = {
      reportImages : [],
      currentIndex: 0
    };
  };

  componentWillMount () {
    this.props.dispatch(getsMouseTracking({ imageId: this.props.currentFocus.image.id }));

    $(document).on('keydown', (event) => {
      if (this.props.stateRouter.pageState === 'reportView' && event.keyCode === 39) {
        if (this.state.reportImages[this.state.currentIndex + 1] !== undefined) {
          this.componentDidMount();
          var currentIndx = this.state.currentIndex;
          this.setState({ currentIndex: currentIndx + 1 });
          this.props.dispatch(setFocus('image', this.state.reportImages[this.state.currentIndex]));
          this.props.dispatch(getsMouseTracking({ imageId: this.props.currentFocus.image.id }));
          this.props.dispatch(getsComment({ imageId: this.props.currentFocus.image.id }));
        } else { //at the end of the array
          this.setState({ currentIndex: 0 });
          this.props.dispatch(pageState('authenticated'));
          $(document).off('keydown');
        }
      }
    });

    $(document).keypress('d', (event) => {
      if (event.ctrlKey) {
        this.props.dispatch(pageState('authenticated'))
        $(document).off('keydown');
        $(document).off('keypress');
      }
    });

    this.props.dispatch(getsMouseTracking({ imageId: this.props.currentFocus.image.id }));

    const findImages = {
      testId : this.props.currentFocus.test.id
    };

    $.ajax({
      url: 'http://localhost:8000/api/image',
      data: findImages,
      headers: { 'x-access-token': JSON.parse(localStorage.getItem('Scrutinize.JWT.token')).token },
      method: 'GET',
      timeout: 1000,
      success: (data, textStatus, jqXHR) => {
        // this.state.reportImages = data;
        this.setState({ reportImages : data });
        this.props.dispatch(setFocus('image', this.state.reportImages[0]));
      }
    })
  };

  componentDidMount () {
    this.props.dispatch(getsComment({ imageId: this.props.currentFocus.image.id }));
    //this is done twice, if once, wrong comments appear occasionally
    this.props.dispatch(getsComment({ imageId: this.props.currentFocus.image.id }));

    setTimeout(() => {
      let replay = function (cursor, path) {
        var i = 0;
        var timeInterval;
        var length = path.length;
        var move = function () {
          var position = path[i];
          cursor.css({
            top: position.y,
            left: position.x
          });
          if (i > 1){
            timeInterval = path[i + 1].timestamp - path[i].timestamp || 0;
          } else {
            timeInterval = 0;
          }
          i++;
          if ( i === length) {
            return;
          } else {
            setTimeout(move, timeInterval);
          }
        };
        move();
      };

      let path = JSON.parse(this.props.mouseTrackings.list[0].data);
      this.props.mouseTrackings.list.forEach((cursorData) => {
        console.log('cursorData: ', cursorData);
        var cursor = '#' + cursorData.id;
        var path = JSON.parse(cursorData.data);
        replay($(cursor), path);
      });
   }, 1500)
  };

  render () {
    let divStyle = {
      //background image will come from the database
      position: 'relative',
      height: '100%',
      width: '100%',
      backgroundSize: 'cover'
    };

    let data = [{ x: 10, y: 15, value: 5}, { x: 50, y: 50, value: 2}]

    let createImage = (imageObj) => {
      if ( imageObj.id === this.props.currentFocus.image.id ) {
        return <img key = { imageObj.url } src = { 'data:image/jpeg;base64,' + imageObj.image } ></img>
      }
    };

    const colorObj = {};
    this.props.mouseTrackings.list.forEach(function (el) {
      var color = '#' + (function co(lor) {
        return (lor += [0,1,2,3,4,5,6,7,8,9,'a','b','c','d','e','f'][Math.floor(Math.random() * 16)]) && (lor.length == 6) ?  lor : co(lor); })('');
      colorObj[el.id] = color;
    });

    let createCursor = (data) => {
      let divStyle = {
        background: colorObj[data.id]
      };
      return <div key = { data.id } id = { data.id } className = "cursor" style = { divStyle }> </div>
    };

    {/*each note is mapped to one createItem upon rendering*/}
    let createComment = function (comment) {
      return <Note key = { comment.id } x = { comment.x } y = { comment.y } commentText = { comment.commentText } commentType = { comment.commentType }/>;
    };

    return (
      <div>
        <div id = 'critiqueImage' style = { divStyle } >
          { this.state.reportImages.map(createImage) }
          { this.props.mouseTrackings.list.map(createCursor) }
          { this.props.comments.list.map(createComment) }
        </div>
      </div>
    );
  };
}

function mapStateToProps(state) {
  return {
    mouseTrackings: state.mouseTrackings,
    comments: state.comments,
    currentFocus: state.currentFocus,
    stateRouter: state.stateRouter
  }
}

export default connect(mapStateToProps)(ReportPage);