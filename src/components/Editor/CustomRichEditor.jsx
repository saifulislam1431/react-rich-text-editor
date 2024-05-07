import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const CustomRichEditor = () => {
  const [content, setContent] = useState('');


  const Size = ReactQuill.Quill.import('attributors/style/size');
  Size.whitelist = ['8px', '10px', '12px', '14px', '16px', '18px', '20px', '24px', '32px', '48px', '64px'];
  ReactQuill.Quill.register(Size, true);


  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' },
      { 'indent': '-1' }, { 'indent': '+1' }],
      [{ 'direction': 'rtl' }],
      [{ 'size': ['8px', '10px', '12px', '14px', '16px', '18px', '20px', '24px', '32px', '48px', '64px'] }],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'font': [] }],
      [{ 'align': ['right', 'center', false, 'justify'] }],
      [{ 'script': 'sub' }, { 'script': 'super' }],
      ['link', 'image', 'video'],
      ['clean']
    ],

  };

  const handleChange = (value) => {
    setContent(value);
  };

  const convertListStyles = (htmlContent) => {
    // Replace ul with proper styling
    htmlContent = htmlContent.replace(/<ul>/g, '<ul style="list-style-type: disc;">');
    // Replace ol with proper styling
    htmlContent = htmlContent.replace(/<ol>/g, '<ol style="list-style-type: decimal;">');
    return htmlContent;
  };

  // Convert Quill alignment classes to inline styles
  const convertAlignment = (htmlContent) => {
    // Image Alignment
    htmlContent = htmlContent.replace(/<([a-z]+) class="ql-align-center">(.*?)<img(.*?)><\/\1>/g, '<$1 style="text-align: center;"><img$3 style="margin: auto;"></$1>');
    htmlContent = htmlContent.replace(/<([a-z]+) class="ql-align-right">(.*?)<img(.*?)><\/\1>/g, '<$1 style="text-align: center;"><img$3 style="float: right;"></$1>');


    // Text Alignment
    htmlContent = htmlContent.replace(/<([a-z]+) class="ql-align-center">/g, '<$1 style="text-align: center;">');
    htmlContent = htmlContent.replace(/<([a-z]+) class="ql-align-right">/g, '<$1 style="text-align: right;">');
    htmlContent = htmlContent.replace(/<([a-z]+) class="ql-align-justify">/g, '<$1 style="text-align: justify;">');
    return htmlContent;
  };

  // Assuming content is the HTML content from the text editor
  const jsxContent = (
    <div dangerouslySetInnerHTML={{ __html: convertAlignment(convertListStyles(content)) }} />
  );



  return (
    <div>
      <ReactQuill
        theme="snow"
        value={content}
        onChange={handleChange}
        modules={modules}
        placeholder='Write something...'
      />
      <div className="html-output p-10">{jsxContent}</div>
      {/* <div>{content}</div> */}
    </div>
  );
};

export default CustomRichEditor;
