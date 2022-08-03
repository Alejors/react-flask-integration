const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            apiURl: 'http://127.0.0.1:5000',
            email: '',
            password: '',
            username: '',
            name: '',
            lastname: '',
            errors: null,
            currentUser: null,
            favorites: {
                'characters': [],
                'planets': []
            },
            liked: []
        },
        actions: {
            defineparams: e => {
                const { name, value } = e.target;
                setStore({
                    [name]: value
                })
            },
            register: async (e, history) => {

                e.preventDefault();

                const { apiURl, email, password } = getStore();

                const response = await fetch(`${apiURl}/api/register`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        'email': email,
                        'password': password
                    })
                });

                const { status, data, message } = await response.json();

                if (status === 'failed') {

                    window.alert(message);
                }

                if (status === 'success') {

                    sessionStorage.setItem('currentUser', JSON.stringify(data));

                    setStore({
                        currentUser: data,
                        password: ''
                    })

                    history.push('/');
                }
            },
            receiveLogin: async (e, history) => {

                e.preventDefault();

                const { apiURl, email, password } = getStore();

                const response = await fetch(`${apiURl}/api/login`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        'email': email,
                        'password': password
                    })
                });

                const { status, data, message } = await response.json();

                if (status === 'failed') {

                    window.alert(message);
                }

                if (status === 'success') {

                    sessionStorage.setItem('currentUser', JSON.stringify(data));

                    setStore({
                        currentUser: data,
                        password: ''
                    })

                    history.push('/profile');
                }
            },
            loadProfile: () => {
                const { currentUser } = getStore();
                setStore({
                    name: currentUser?.user?.profile?.name,
                    lastname: currentUser?.user?.profile?.lastname,
                    username: currentUser?.user?.profile?.username
                })
            },
            updateProfile: async (e, history) => {
                
                e.preventDefault();

                const { apiURl, email, password, name, lastname, username, currentUser } = getStore();
                
                const response = await fetch(`${apiURl}/api/profile`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${currentUser?.access_token}`
                    },
                    body: JSON.stringify({
                        'email': email,
                        'password': password,
                        'name': name,
                        'lastname': lastname,
                        'username': username
                    })
                });

                const { status, data, message } = await response.json();

                if (status === 'failed') {

                    window.alert(message);
                }

                if (status === 'success') {

                    sessionStorage.setItem('currentUser', JSON.stringify(data));

                    setStore({
                        currentUser: data,
                        password: ''
                    })

                    history.push('/profile');
                }
            },
            logout: (history) => {

                sessionStorage.removeItem('currentUser');
                setStore({
                    email:'',
                    currentUser: null
                });

                history.push('/login');

            },
            // addFavorite: (location, index) => {
            // 	const store = getStore();
            // 	const actions = getActions();
            // 	const aux = store.favorites;
            // 	const favorite = {
            // 		'name': `${store[location][index].name}`,
            // 		'url': `/${location}/${index}`
            // 	};
            // 	let found = aux.find((element) => element.name == favorite.name);
            // 	if(!found){
            // 	aux.push(favorite);
            // 	setStore({ favorites: aux });
            // 	actions.includeliked(location, index);
            // 	}
            // },

            // deleteFavorite: (index) => {
            // 	const store = getStore();
            // 	const actions = getActions();
            // 	const aux = [...store.favorites];
            // 	const favaux = aux[index].url.replace(/\//g,"");
            // 	aux[index] = null;
            // 	const filtered = aux.filter(ele => ele !== null);
            // 	actions.deleteliked(favaux);
            // 	setStore({favorites: filtered});
            // },

            // includeliked: (location, index) => {
            // 	const store = getStore();
            // 	let like = location+index;
            // 	store.liked.push(like);
            // },

            // deleteliked: (str) => {
            // 	const store = getStore();
            // 	const likedindex = store.liked.indexOf(str);
            // 	const likedaux = [...store.liked];
            // 	likedaux[likedindex] = null;
            // 	const filteredliked = likedaux.filter((ele) => ele != null);
            // 	setStore({ liked: filteredliked })
            // }
        }
    }
};

export default getState;