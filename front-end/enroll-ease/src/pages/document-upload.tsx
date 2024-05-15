import React, {useState} from 'react';
import axios from 'axios';
import styles from './document-upload.module.css'


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
      alert("File uploaded successfully")
    });

  }
  return(
    <>
    <form onSubmit={handleSubmit}>
      <div className={styles.frame}>
        <div className={styles.center}>
          <div className={styles.title}>
            <h1 className={styles.h1}>Upload Documents to the Large Language Model</h1>
            <br/>
            <br/>
          </div>

          <div className={styles.dropzone}>
            <img src="http://100dayscss.com/codepen/upload.svg" className={styles.uploadIcon} />
            <input type="file" className={styles.uploadInput} onChange={handleChange}/>
          </div>

          <button type="button" className={styles.btn} name="uploadbutton" onClick={handleSubmit}>Upload file</button>

        </div>
      </div>
    </form>
    </>
  );
}