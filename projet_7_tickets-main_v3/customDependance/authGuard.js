import User from "../models/User.js"

let routeGuard = async(req, res, next) => { //C'est un middleware qui permettra de verifier si l'utilisateur est connecté ou non
    let user = await User.findOne({ _id: req.session.userid }, { mdp: 0 })
    console.log(req.session.userid);
    if (user) {
        req.session.user = user
        next() // permet de passer au middleware suivant. en l'occurence dans ce projet, le corps de la route (middleware final)
    } else {
        res.redirect('/login')
    }
}

export default routeGuard