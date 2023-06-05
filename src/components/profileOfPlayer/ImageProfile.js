import styles from './ImageProfile.module.css';
import photo from '../../pictures/photo.jpg';

function ImageProfile() {
  return (
    <div className={styles.backgroundImage}>
      <img src={photo} />
    </div>
  );
}

export default ImageProfile;
