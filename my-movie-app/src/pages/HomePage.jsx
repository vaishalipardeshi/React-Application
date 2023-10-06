import {
  Link
} from 'react-router-dom';

const HomePage = () => {
  return (
    <div>
      <h1>Welcome to the Pokemon App!</h1>
      <Link to="/HomePage">Go to Home</Link><br/>
    </div>
  );
};

export default HomePage;