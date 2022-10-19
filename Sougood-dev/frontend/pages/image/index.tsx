import { uploadImage } from "../../lib/images";
import { useState, useEffect } from "react";
import { styled, ThemeProvider, createTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { CloudService } from "../../config/config";
import { CloudinaryImage } from "@cloudinary/url-gen";
import { AdvancedImage } from "@cloudinary/react";

const Input = styled('input')({
  display: 'none',
});

const theme = createTheme({
  palette: {
    primary: {
      main: '#ffff'
    }
  }
});

const Index: React.FC = () => {
  const [image, setImage] = useState<File>();
  const [cloudImage, setCloudImage] = useState<CloudinaryImage>();

  useEffect(() => {
    console.log(cloudImage);
  }, [cloudImage]);

  const handleOnClick = () => {
    if (image) uploadImage(image).then(imageUrl => setCloudImage(CloudService.image(imageUrl)));
  }

  const handleOnChangeImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const images = event.target.files;
    if (images) setImage(images[0]);
  }
  return (
    <>
      <label htmlFor="contained-button-file">
        <Input onChange={handleOnChangeImage} accept="image/*" id="contained-button-file" multiple type="file" />
        <ThemeProvider theme={theme}>
          <Button color="primary" variant="contained" component="span">
            Upload
          </Button>
          <span>{image && image.name}</span>
        </ThemeProvider>
      </label>

      <button onClick={handleOnClick} >Submit</button>

      {
        cloudImage &&
        <AdvancedImage className={""} cldImg={cloudImage} /> 
      }
    </>
  );
};

export default Index;
