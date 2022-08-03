import { useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Context } from "../store/appContext";

const Register = () => {
    
    const { store, actions } = useContext(Context);
    const history = useHistory();

    useEffect(() => {
        if(store.currentUser !== null) history.push('/');
    }, [store])

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12 d-flex justify-content-center text-light">
                    <form className="col-md-6 m-5" autoComplete="off" onSubmit={(e) =>  actions.register(e, history)}>
                        <h1>Registration</h1>
                        <div className="row mb-3">
                            <div className="col-sm-10">
                                <input type="email" className="form-control" placeholder='darthvader@deathstar.com' id="email" name="email" value={store.email} onChange={actions.defineparams} />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col-sm-10">
                                <input type="password" placeholder='Password' className="form-control" id="password" name="password" value={store.password} onChange={actions.defineparams}/>
                            </div>
                        </div>
                        <div className="d-grid col-md-10">
                            <button type="submit" className="btn btn-secondary">
                                Register
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register;