// import bcrypt from 'bcrypt';
// import userService from '../user/user.service.js';


async function login(username, password) {

    //     const hash = await bcrypt.hash(password, saltRounds)
//     return userService.add({ username, password: hash, fullname })


    const user = await userService.getByUsername(username)
    if (!user) return Promise.reject('Invalid username or password')
        // TODO: un-comment for real login
    const match = await bcrypt.compare(password, user.password)
    if (!match) return Promise.reject('Invalid username or password')

    delete user.password
    user._id = user._id.toString()
    return user
}

// async function signup(username, password, fullname) {
//     const saltRounds = 10

//     logger.debug(`auth.service - signup with username: ${username}, fullname: ${fullname}`)
//     if (!username || !password || !fullname) return Promise.reject('fullname, username and password are required!')

//     const hash = await bcrypt.hash(password, saltRounds)
//     return userService.add({ username, password: hash, fullname })
// }

export default {
    login,
}