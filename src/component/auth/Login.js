import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import './css/Login.css'

const Login = () => {
  const [username, usernameupdate] = useState('');
  const [password, passwordupdate] = useState('');

  const usenavigate = useNavigate();

  useEffect(() => {
    sessionStorage.clear()
  }, []);

  const ProceedLogin = (e) => {
    e.preventDefault();
    if (validate()) {
      fetch("http://localhost:8000/user/" + username).then((res) => {
        return res.json();
      }).then((resp) => {
        //console.log(resp)
        if (Object.keys(resp).length === 0) {
          toast.error('Please Enter valid username');
        } else {
          if (resp.password === password) {
            toast.success('Success');
            sessionStorage.setItem('username', username);
            sessionStorage.setItem('userrole', resp.role);
            usenavigate('/')
          } else {
            toast.error('Please Enter valid credentials');
          }
        }
      }).catch((err) => {
        toast.error('Login Failed due to :' + err.message);
      });
    }
  }

  const ProceedLoginusingAPI = (e) => {
    e.preventDefault();
    if (validate()) {
      ///implentation
      // console.log('proceed');
      let inputobj = {
        "username": username,
        "password": password
      };
      fetch("https://localhost:44308/User/Authenticate", {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(inputobj)
      }).then((res) => {
        return res.json();
      }).then((resp) => {
        console.log(resp)
        if (Object.keys(resp).length === 0) {
          toast.error('Login failed, invalid credentials');
        } else {
          toast.success('Success');
          sessionStorage.setItem('username', username);
          sessionStorage.setItem('jwttoken', resp.jwtToken);
          usenavigate('/')
        }
      }).catch((err) => {
        toast.error('Login Failed due to :' + err.message);
      });
    }
  }
  const validate = () => {
    let result = true;
    if (username === '' || username === null) {
      result = false;
      toast.warning('Please Enter Username');
    }
    if (password === '' || password === null) {
      result = false;
      toast.warning('Please Enter Password');
    }
    return result;
  }
  return (
    <div className="login">

        <form onSubmit={ProceedLogin} className="logindata">
            <div>
                <div>
                    <h2>User Login</h2>
                </div>
                <div>
                    <div >
                        <label>User Name <span className="errmsg"></span></label>
                        <input value={username} onChange={e => usernameupdate(e.target.value)} placeholder="Enter your name"></input>
                    </div>
                    <div >
                        <label>Password <span className="errmsg"></span></label>
                        <input type="password" value={password} onChange={e => passwordupdate(e.target.value)} placeholder="Enter password"></input>
                    </div>
                </div>
                <div >
                    <button type="submit" >Login</button>
                 <Link to={'/Signup'}>Signup</Link>
                </div>
            </div>
        </form>
    </div>

  );
}
export default Login;