const clg = console.log
const getElbyId = (id) => document.getElementById(id)

const handleAuth = (event) => {
    event.preventDefault();
    var [submitBtn, user, pass] = [document.getElementById("submit"), getElbyId('username').value, getElbyId('password').value];
    submitBtn.dataset.auth === 'login' ? auth.login(user, pass)
        : submitBtn.dataset.auth === 'register' ? auth.register(user, pass, getElbyId('fullname').value)
            : console.error("Internal Error");
}

const auth = {
    login: async (user, pass) => {
        let userData;
        const [userInp, passInp] = [getElbyId('username'), getElbyId('password')];
        user.trim()
            ? user.trim().length >= 3
                ? pass.trim()
                    ? pass.trim().length >= 4
                        ? ([...await (await fetch('/users')).json()].forEach(res => { res.username === user.toLowerCase().trim() && (userData = res) }),
                            userData ? userData?.password === pass
                                ? (localStorage.setItem('user', userData.fullname), window.location.href = '/')
                                : (passInp.focus(), passInp.value = '', passInp.placeholder = 'Incorrect Password')
                                : (userInp.focus(), userInp.value = '', userInp.placeholder = 'User Not Found')
                        )
                        : (passInp.focus(), passInp.value = '', passInp.placeholder = 'Minimum 4 letters required')
                    : (passInp.focus(), passInp.value = '', passInp.placeholder = 'Password Cannot Be Empty')
                : (userInp.focus(), userInp.value = '', userInp.placeholder = 'Minimum 3 letters required')
            : (userInp.focus(), userInp.value = '', userInp.placeholder = 'Username Cannot Be Empty')
    },
    register: async (user, pass, fullname) => {
        const [userInp, passInp, nameInp] = [getElbyId('username'), getElbyId('password'), getElbyId('fullname')];
        user.trim()
            ? user.trim().length >= 3
                ? fullname.trim()
                    ? fullname.trim().length >= 3
                        ? ![...await (await fetch('/users')).json()].find(res => res.username === user)
                            ? pass.trim()
                                ? pass.trim().length >= 4
                                    ? await fetch("http://localhost:3000/users", {
                                        method: "POST",
                                        headers: { "Content-Type": "application/json" },
                                        body: JSON.stringify({
                                            id: [...await (await fetch("http://localhost:3000/users")).json()].at(-1).id + 1,
                                            username: user.trim(),
                                            password: pass.trim(),
                                            fullname: fullname.trim()
                                        })
                                    }).then(res => res.ok
                                        ? (localStorage.setItem('user', fullname.trim()), window.location.href = "/")
                                        : (userInp.value = '', userInp.placeholder = 'Internal Server Error'))
                                    : (passInp.focus(), passInp.value = '', passInp.placeholder = 'Minimum 4 letters required')
                                : (passInp.focus(), passInp.value = '', passInp.placeholder = 'Password Cannot Be Empty')
                            : (userInp.focus(), userInp.value = '', userInp.placeholder = 'Username Is Not Available')
                        : (nameInp.focus(), nameInp.value = '', nameInp.placeholder = 'Minimum 3 letters required')
                    : (nameInp.focus(), nameInp.value = '', nameInp.placeholder = 'Full Name Cannot Be Empty')
                : (userInp.focus(), userInp.value = '', userInp.placeholder = 'Minimum 3 letters required')
            : (userInp.focus(), userInp.value = '', userInp.placeholder = 'Username Cannot Be Empty');
    }
    ,
    logout: () => { localStorage.removeItem('user'); window.location.href = '/' }
}

// Event Listners
document.getElementById("submit") &&
    document.getElementById("submit").addEventListener("click", handleAuth)
document.getElementById("submit") &&
    document.addEventListener("keydown", (e) => { e.key === "Enter" && handleAuth(e) });


