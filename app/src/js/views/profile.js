import { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Context } from "../store/appContext";

const Profile = () => {

    const { store, actions } = useContext(Context);
    const history = useHistory();

    useEffect(() => {
        actions.loadProfile();
        if (store.currentUser === null) history.push('/login');
    }, [])

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12 d-flex justify-content-center">
                    <form className="m-5" style={{ width: '450px' }} onSubmit={(e) => actions.updateProfile(e)}>
                        <div className="row mb-3">
                            <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">
                                Email:
                            </label>
                            <div className="col-sm-10">
                                <input type="email" className="form-control" id="email" name="email" value={store.email} onChange={actions.defineparams} />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">
                                Password:
                            </label>
                            <div className="col-sm-10">
                                <input type="password" className="form-control" id="password" name="password" value={store.password} onChange={actions.defineparams} />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">
                                Name:
                            </label>
                            <div className="col-sm-10">
                                <input type="text" className="form-control" id="name" name="name" value={store.name} onChange={actions.defineparams} />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">
                                Lastname:
                            </label>
                            <div className="col-sm-10">
                                <input type="text" className="form-control" id="lastname" name="lastname" value={store.lastname} onChange={actions.defineparams} />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">
                                Username:
                            </label>
                            <div className="col-sm-10">
                                <input type="text" className="form-control" id="username" name="username" value={store.username} onChange={actions.defineparams} />
                            </div>
                        </div>
                        <div className="d-grid">
                            <button type="submit" className="btn btn-secondary">
                                Update Profile
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Profile;