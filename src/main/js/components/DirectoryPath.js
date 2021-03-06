import React, {Component} from 'react';
import Arrow from './Arrow';

export default class DirectoryPath extends Component {
	
	constructor() {
	    super();
	    this.state = {
	    	path: <nav className="nav nav-pills align-items-center"><button type="button" className="btn btn-link" >Home</button></nav>
	    };
	}
	
	createFilePathHandler = (file) => {
		this.createFilePathHandler(file, false)
	}
	
	createFilePathHandler = (file, isSearching) => {
		if (file == null) {
			if (isSearching) {
				this.setState ({
			    	path: <nav className="nav nav-pills align-items-center"><button type="button" className="btn btn-link" onClick={(e) => this.loadDir(e)} >Home</button><Arrow /><button type="button" className="btn btn-link" >Search Results</button></nav>
			    });
			} else {
				this.setState ({
			    	path: <nav className="nav nav-pills align-items-center"><button type="button" className="btn btn-link" onClick={(e) => this.loadDir(e)} >Home</button></nav>
			    });
			}
			
		} else if (file.isFile) {
			return;
		} else {
			let filePath = file.path;
			let keyCount = 0;
			let resultPath = [<button key={keyCount++} type="button" className="btn btn-link" onClick={(e) => this.loadDir(e) } >Home</button>];
			
			if (filePath != '') {
				let filePathArray = filePath.split('/');
				let curPath;
				
				for (let ind in filePathArray) {
					if (curPath == undefined) {
						curPath = '';
					} else {
						curPath += '/'
					}
					curPath += filePathArray[ind]
					
					resultPath.push(<Arrow key={keyCount++} />);
					resultPath.push(<button key={keyCount++} type="button" className="btn btn-link" dir={curPath} onClick={(e) => this.loadDir(e) }>{filePathArray[ind]}</button>);
					
				}
			}
			
			if (isSearching) {
				resultPath.push(<Arrow key={keyCount++} />);
				resultPath.push(<button key={keyCount++} type="button" className="btn btn-link" >Search Results</button>);
			}
			
			this.setState({
				path: <nav className="nav nav-pills align-items-center">{resultPath}</nav>
			})
		}
	}
	
	loadDir = (e) => {
		let dir = e.target.getAttribute('dir')
		this.props.dirPathClickHandler(dir)
	}
	
	render () {
		return (
			<div className="col-md-12">
				{this.state.path}
			</div>
		);
	}
}
