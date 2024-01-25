

import LoginForm from './components/LoginForm.tsx'
import Footer from '@/components/Footer.tsx'


const Login = () => {
    return (
      <div className='wrapper container' style={{height: '100%'}}>
          <LoginForm />
          <Footer />
      </div>
      );
}

export default Login;