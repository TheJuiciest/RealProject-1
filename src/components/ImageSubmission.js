import React, {Component} from 'react';
import $ from 'jquery';
import ReactDom from 'react-dom'
var config = require('../../config');



module.exports = React.createClass({
    uploadFile: function (e) {
        var fd = new FormData();    
        console.log(this.refs)
        fd.append('dogPhoto', ReactDom.findDOMNode(this.refs.file).files[0]);

        $.ajax({
            url: config.apiServer +'/api/lostImg',
            data: fd,
            processData: false,
            contentType: false,
            type: 'POST',
            success: function(data){
                alert(data);
            } 
        });
        e.preventDefault()
    },
    render: function() {
        return (
            <div>                
               <form ref="uploadForm" className="uploader" encType="multipart/form-data" >
                   <input ref="file" type="file" name="file" className="upload-file"/>
                   <input type="button" ref="button" value="Upload" onClick={this.uploadFile} />
               </form>                
            </div>
        );
    }
});




// class ImageUpload extends Component {
  /*constructor(props) {
    super(props);
    this.state = {file: '',imagePreviewUrl: ''};
  }*/

  /*handleSubmit(e) {
    e.preventDefault();
    // TODO: do something with -> this.state.file
    console.log('handle uploading-', this.state.file);
  }

  handleImageChange(e) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      });
    }

    reader.readAsDataURL(file)
  }*/
    // uploadFile (e) {
    //     e.preventDefault()
    //     var fd = new FormData();    
    //     fd.append('file', this.refs.file.getDOMNode().files[0]);

    //     $.ajax({
    //         method: 'POST',
    //         url: config.apiServer +'/api/lostImg',
    //         data: fd,
    //         processData: false,
    //         contentType: 'multipart/form-data',
    //         success: function(data){
    //             alert(data);
    //         } 
    //     });
        
    // }

 /*submitImage() {
    console.log('hiii')
    var input = document.querySelector('input[type="file"]');
   // var data = new FormData()
    //data.append('dogPhoto', input.files[0])

    var data = new FormData();

  $.each($('#file')[0].files, function(i, file) {
    data.append('file-'+i, file);
  });
    $.ajax ({
      method: 'POST',
      url: config.apiServer +'/api/lostImg', 
      cache: false,
      contentType: false,
      processData: false,
      body: data,
      credentials: 'same-origin'
    })
    .done(function(result){
      console.log(result)
    })  
  }*/
//     render() {
//         return (
//             <div>                
//                <form ref="uploadForm" className="uploader" encType="multipart/form-data" >
//                    <input ref="file" type="file" name="file" className="upload-file"/>
//                    <input type="submit" ref="button" value="Upload" onClick={this.uploadFile.bind(this)} />
//                </form>                
//             </div>
//         );
//     }
// };
  /*render() {
    let {imagePreviewUrl} = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = (<img src={imagePreviewUrl} />);
    } else {
      $imagePreview = (<div className="previewText">Please select an Image for Preview</div>);
    }

    return (
      <div className="imgSubmissionContainer">
        <div className="previewComponent">
          <form onSubmit={(e)=>this.handleSubmit(e)}>
            <input id='file' className="fileInput" 
              type="file"
              name="dogPhoto" 
              onChange={(e)=>this.handleImageChange(e)} />
            <button className="submitButton" 
              type="submit" 
              onClick={this.submitImage.bind(this)}>Upload Image</button>
          </form>
          <div className="imgPreview">
            {$imagePreview}
          </div>
        </div>
      </div>
    )
  }
}*/

// export default ImageUpload 
  