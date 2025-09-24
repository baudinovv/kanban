import { NavLink, useNavigate } from 'react-router';
import { MyButton } from '../../7__shared/ui/MyButton';
import { useLocation } from 'react-router';
import { useEffect, useState  } from 'react';
import { useUserStore } from '../../1__App/store/store'
import { MyInput } from '../../7__shared/ui/MyInput';
import { ThemeSwitch } from '../../5__features/ThemeSwitch/ThemeSwitch';

import { login } from './api/login';
import { register } from './api/register';
const Auth = () => {
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const setLogin = useUserStore((state) => state.setLogin);
  const isLogged = useUserStore((state) => state.isLogged);

  const [isLoginError, setError] = useState(false);


  useEffect(() => {
    if(isLogged){
      navigate("/");
    }
  }, [isLogged, navigate])

  return (
    <section className="max-w-94 transition h-full flex flex-col items-center gap-2 justify-center m-auto bg-background px-10">

      <ThemeSwitch />

      <h2 className='text-theme-text text-2xl font-bold flex items-center text-center flex-wrap'>
        {location.pathname === '/login' ? "Войдите в аккаунт" : "Зарегестрируйтесь"}
        <img 
          className='size-8'
          src="./src/4__widgets/MyHeader/assets/trellologo.png" alt="" />
      </h2>

      <MyInput
        type="email"
        onChange={(event) => setEmail(event.target.value)}
        placeholder='Почта'
        className="mt-8" 
      />

      <MyInput
        onChange={(event) => setPassword(event.target.value)}
        type="password"
        placeholder='Пароль'
        className="mb-4" 
      />

      <MyButton
        onClick={async () => {
          if (location.pathname === '/login') {
            await login(setLogin, setError, email, password);
          } else {
            await register(setLogin, setError, email, password);
          }
          if(isLoginError){
            navigate("/")
          }
        }}
        >
        {location.pathname === '/login' ? "Войти" : "Зарегестрироваться"}
      </MyButton>
      
        {location.pathname === '/login' ? 
          <h4 className='text-theme-text text-xm'>Или можете зарегистрироваться <NavLink to="/register" className='cursor-pointer underline font-bold'>тут</NavLink></h4>
          : 
          <h4 className='text-theme-text text-xm'>Уже есть аккаунт? Можете войти <NavLink to="/login" className='cursor-pointer underline font-bold'>здесь</NavLink></h4>
        }
        
        {isLoginError ? 
          <section className="transition text-theme-text text-center bg-red-500/40 p-5 border-x-4 border-red-500 rounded">
            Введенный логин и пароль неверен. Попробуйте еще раз
          </section> : <></>
        }


    </section>
  )

}

export default Auth;