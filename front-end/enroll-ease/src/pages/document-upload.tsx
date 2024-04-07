import React, {useState} from 'react';
import axios from 'axios';

export default function DocumentUploadPage() {
  const [file, setFile] = useState<File>()


  function handleChange(event:any) {
    setFile(event.target.files[0])
  }

  function handleSubmit(event:any) {
    event.preventDefault()
    const url = 'http://localhost:4000/llm/upload';
    const formData = new FormData();
    formData.append('file', file!);
    formData.append('fileName', file!.name);
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };
    axios.post(url, formData, config).then((response) => {
      console.log(response.data);
    });

  }
  return(
    <form onSubmit={handleSubmit}>
      <h1>React File Upload</h1>
      <input type="file" onChange={handleChange}/>
      <button type="submit">Upload</button>
    </form>
  );
}