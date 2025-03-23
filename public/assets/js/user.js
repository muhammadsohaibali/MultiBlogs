const [goTo, getElbyId] = [(path) => window.location.href = path, (id) => document.getElementById(id)];
const baseURL = ['localhost', '192.168.100.4'].includes(window.location.hostname) ? 'http://192.168.100.4:3000' : '/api';

const handleAuth = (event) => {
    event.preventDefault();
    var [submitBtn, user, pass] = [document.getElementById("submit"), getElbyId('username').value, getElbyId('password').value];
    submitBtn.dataset.auth === 'login' ? auth.login(user, pass)
        : submitBtn.dataset.auth === 'register' ? auth.register(user, pass, getElbyId('fullname').value)
            : console.error("Internal Error");
}

const auth = {
    login: async (user, pass) => {
        const [userInp, passInp] = [getElbyId('username'), getElbyId('password')];
        if (!user.trim()) return userInp.focus(), userInp.placeholder = 'Username Cannot Be Empty';
        if (user.trim().length < 3) return userInp.focus(), userInp.value = '', userInp.placeholder = 'Minimum 3 letters required';
        if (!pass.trim()) return passInp.focus(), passInp.placeholder = 'Password Cannot Be Empty';
        if (pass.trim().length < 4) return passInp.focus(), passInp.value = '', passInp.placeholder = 'Minimum 4 letters required';
        const users = await (await fetch(`${baseURL}/users`)).json();
        const userData = users.find(res => res.username === user.toLowerCase().trim());
        if (!userData) return userInp.focus(), userInp.value = '', userInp.placeholder = 'User Not Found';
        if (userData.password !== pass) return passInp.focus(), passInp.value = '', passInp.placeholder = 'Incorrect Password';
        localStorage.setItem('user', userData.fullname);
        goTo('/');
    },
    register: async (user, pass, fullname) => {
        const [userInp, passInp, nameInp] = [getElbyId('username'), getElbyId('password'), getElbyId('fullname')];
        if (!user.trim()) return userInp.focus(), userInp.placeholder = 'Username Cannot Be Empty';
        if (user.trim().length < 3) return userInp.focus(), userInp.value = '', userInp.placeholder = 'Minimum 3 letters required';
        if (!fullname.trim()) return nameInp.focus(), nameInp.placeholder = 'Full Name Cannot Be Empty';
        if (fullname.trim().length < 3) return nameInp.focus(), nameInp.value = '', nameInp.placeholder = 'Minimum 3 letters required';
        const users = await (await fetch(`${baseURL}/users`)).json();
        if (users.find(res => res.username === user.trim())) return userInp.focus(), userInp.value = '', userInp.placeholder = 'Username Is Not Available';
        if (!pass.trim()) return passInp.focus(), passInp.placeholder = 'Password Cannot Be Empty';
        if (pass.trim().length < 4) return passInp.focus(), passInp.value = '', passInp.placeholder = 'Minimum 4 letters required';
        const newId = `${parseInt(users.at(-1)?.id) + 1}` || '1';
        const res = await fetch(`${baseURL}/users`, {
            method: "POST", headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: newId, username: user.trim(), password: pass.trim(), fullname: fullname.trim() })
        });
        if (!res.ok) return userInp.value = '', userInp.placeholder = 'Internal Server Error';
        localStorage.setItem('user', fullname.trim());
        goTo("/");
    },
    logout: () => { localStorage.removeItem('user'); goTo('/') }
}

document.getElementById("submit") &&
    document.getElementById("submit").addEventListener("click", handleAuth)
document.getElementById("submit") &&
    document.addEventListener("keydown", (e) => { e.key === "Enter" && handleAuth(e) });


