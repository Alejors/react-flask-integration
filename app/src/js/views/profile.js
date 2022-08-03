import { useContext, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import { Context } from "../store/appContext";

const Profile = () => {

    const { store, actions } = useContext(Context);
    const history = useHistory();

    useEffect(() => {
        if (store.currentUser === null) history.push('/login');
        actions.loadProfile();
    }, [])

    useEffect(() => {
        actions.loadProfile();
    }, [store])

    return (
        <div className="container-fluid">
            <table className="mt-4 table table-light">
                <thead>
                    <tr className="table-light">
                        <th scope="col">You this is</th>
                        <th scope="col"/>
                    </tr>
                </thead>
                <tbody>
                    <tr className="table-light">
                        <th scope="row">Email</th>
                        <td>{store.email}</td>
                    </tr>
                    <tr className="table-light">
                        <th scope="row">Name</th>
                        <td>{store.name}</td>
                    </tr>
                    <tr className="table-light">
                        <th scope="row">Lastname</th>
                        <td>{store.lastname}</td>
                    </tr>
                    <tr className="table-light">
                        <th scope="row">Username</th>
                        <td>{store.username}</td>
                    </tr>
                </tbody>
            </table>
            <Link to='/updateprofile' className="btn btn-secondary">Update personal information</Link>
        </div>
    )
}

export default Profile;