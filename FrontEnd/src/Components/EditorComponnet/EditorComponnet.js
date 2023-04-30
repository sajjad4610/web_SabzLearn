
import React, {  useRef } from 'react';
import JoditEditor from 'jodit-react';

export default function EditorComponnet({InputValueHtmlHandler , vlueHtml ,defaultValue}) {
  	const editor = useRef(null);




	const config = 
		{
			readonly: false, // all options from https://xdsoft.net/jodit/doc/,
			placeholder:'مقاله و اینجا بنویس ...',
			uploader: {
				url: 'https://xdsoft.net/jodit/finder/?action=fileUpload',


			},
			filebrowser: {
				ajax: {
					url: 'https://xdsoft.net/jodit/finder/'
				},
				height: 580,
			}
		}
		

const getHtml=(newContent)=>{
  InputValueHtmlHandler(newContent)
}


  return (
    <div>
      		<JoditEditor
			ref={editor}
			value={defaultValue}
			config={config}
			tabIndex={1} // tabIndex of textarea
			onBlur={getHtml} // preferred to use only this option to update the content for performance reasons
			// onChange={(newContent) => {setchange(newContent)}}
		/>
    </div>
  )
}
