import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import './css/Signup.css'

const Reg = () => {

    const [id, idchange] = useState("");
    const [name, namechange] = useState("");
    const [password, passwordchange] = useState("");
    const [email, emailchange] = useState("");
    const [phone, phonechange] = useState("");
    const [country, countrychange] = useState("india");
    const [address, addresschange] = useState("");
    const [gender, genderchange] = useState("female");

    const navigate = useNavigate();

    const IsValidate = () => {
        let isproceed = true;
        let errormessage = 'Please enter the value in ';
        if (id === null || id === '') {
            isproceed = false;
            errormessage += ' Username';
        }
        if (name === null || name === '') {
            isproceed = false;
            errormessage += ' Fullname';
        }
        if (password === null || password === '') {
            isproceed = false;
            errormessage += ' Password';
        }
        if (email === null || email === '') {
            isproceed = false;
            errormessage += ' Email';
        }

        if(!isproceed){
            toast.warning(errormessage)
        }else{
            if(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email)){

            }else{
                isproceed = false;
                toast.warning('Please enter the valid email')
            }
        }
        return isproceed;
    }
    const handlesubmit = (e) => {
            e.preventDefault();
            let regobj = { id, name, password, email, phone, country, address, gender };
            if (IsValidate()) {
            fetch("http://localhost:8000/user", {
                method: "POST",
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(regobj)
            }).then((res) => {
                toast.success('Registered successfully.')
                navigate('/login');
            }).catch((err) => {
                toast.error('Failed :' + err.message);
            });
        }
    }
    return (
        <div>
            <div className="form">
                <form className="formdata" onSubmit={handlesubmit}>
                    <div>
                        <div >
                            <h1>Sign up</h1>
                        </div>
                        <div>
                            <div>
                                <div >
                                    <div >
                                        <label>User Name </label>
                                        <input value={id} onChange={e => idchange(e.target.value)} placeholder="name"></input>
                                    </div>
                                </div>
                                <div >
                                    <div >
                                        <label>Password</label>
                                        <input value={password} onChange={e => passwordchange(e.target.value)} placeholder="password" type="password"></input>
                                    </div>
                                </div>
                                <div >
                                    <div>
                                        <label>Full Name</label>
                                        <input value={name} onChange={e => namechange(e.target.value)} placeholder="fullname"></input>
                                    </div>
                                </div>
                                <div >
                                    <div >
                                        <label>Email</label>
                                        <input value={email} onChange={e => emailchange(e.target.value)} placeholder="Enter your email"></input>
                                    </div>
                                </div>
                                <div >
                                    <div>
                                        <label>Phone <span className="errmsg"></span></label>
                                        <input  type="number" value={phone} onChange={e => phonechange(e.target.value)} placeholder="number"></input>
                                    </div>
                                </div>
                                <div>
                                    <div >
                                        <label>Country </label>
                                        <select value={country} onChange={e => countrychange(e.target.value)}>
                                            <option value="india">India</option>
                                            <option value="usa">USA</option>
                                            <option value="singapore">Singapore</option>
                                            <option value="singapore">Uk</option>
                                        </select>
                                    </div>
                                </div>
                                <div >
                                    <div >
                                        <label>Address</label>
                                        <input value={address} onChange={e => addresschange(e.target.value)} placeholder="Enter Address"></input>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <button type="submit">Register</button>
                            <Link to='/login'>Login</Link>
                        </div>
                    </div>
                </form>
            </div>
</div>
    );
}

export default Reg;