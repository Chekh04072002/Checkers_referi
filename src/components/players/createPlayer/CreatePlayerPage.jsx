import styles from './CreatePlayerPage.module.css';
import CreatePlayerForm from './CreatePlayerForm';


const CreatePlayerPage = () => {
  
  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Регистрация игрока</h1>
      <CreatePlayerForm />
    </div>
  );
};


export default CreatePlayerPage;
