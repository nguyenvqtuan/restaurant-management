import { CFormInput, CFormLabel } from '@coreui/react';
import { useState } from 'react';

interface InputFileProps {
  onChange?: any;
  value?: string | null;
}

const FileInput = (props: InputFileProps) => {
  const { onChange, value } = props;
  const [imagePreview, setImagePreview] = useState(value || null);

  const handleChange = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        onChange(file); // Pass the file up to the parent form
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <CFormLabel htmlFor="inputName">Name</CFormLabel>
      <CFormInput type="file" accept="image/*" onChange={handleChange} />
      <div className="mt-2 border" style={{ height: '150px', width: '200px' }}>
        {imagePreview && (
          <img
            src={imagePreview}
            alt="Preview"
            style={{ width: '200px', height: '150px' }}
          />
        )}
      </div>
    </>
  );
};

export default FileInput;
