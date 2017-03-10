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




