import { useState } from "react"
import {useNavigate} from "react-router-dom"
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";

export const Login =() => {

  const [user, setUser] = useState({
    email:"",
    password:"",
  });



  const navigate = useNavigate();
  const {storeTokenInLS} = useAuth();
  
  // handling the input value
  const handleInput = (e) => {
    console.log(e);
    let name = e.target.name;
    let value = e.target.value;

    setUser({
      ...user,
      [name]:value, 
    })
    
  }; 

  //handling form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user);
    //connecting to backend 
    try { 
    const response = await fetch(`http://localhost:5000/api/auth/login`,{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
      },
      body:JSON.stringify(user),
    });

    console.log("login form",response);

    const res_data = await response.json();
    if(response.ok){

      // stores token in local storage
      storeTokenInLS(res_data.token);

      setUser({email:"",password:"",});
      toast.success("Login done successfully");
      navigate("/home");
    }else{
      toast.error(res_data.extraDetails ? res_data.extraDetails : res_data.message );
      console.log("Invalid Credentials");
    }

    console.log(response);

    } catch (error) {
      console.log("error from register",error);
    }
  };
  
  return (
    <>
      <section>
        <main>
          <div className="section-registration">
            <div className="container grid grid-two-cols">
              <div className="registration-image">
                <img 
                  src="/images/images/login.png" 
                  alt="login image"
                  width="470" height="500" />
              </div>

              {/* our main registration code  */}
              <div className="registration-form">
                <h1 className="main-heading mb-3">Login form</h1>

                <br />
                
                <form onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="email">email</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="enter your email id"
                      id="email"
                      required
                      autoComplete="off"
                      value={user.email}
                      onChange={handleInput}
                    />
                  </div>
                  <div>
                    <label htmlFor="password">password</label>
                    <input
                      type="password"
                      name="password"
                      placeholder="password"
                      id="password"
                      required
                      autoComplete="off"
                      value={user.password}
                      onChange={handleInput}
                    />
                  </div>
                  <br />
                  <button type="submit" className="btn btn-submit">
                    Login Now
                  </button>
                </form>
              </div>
            </div>
          </div>
        </main>
      </section>
    </>
  )
}