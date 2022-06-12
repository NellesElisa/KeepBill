import express from 'express'; //import d'express
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import session from 'express-session';
import User from './models/User.js';
import Admin from './models/Admin.js';
import fetch from 'node-fetch';
import { cryptPassword } from './customDependance/cryptPassword.js';
import { comparePassword } from './customDependance/cryptPassword.js';
import routeGuard from "./customDependance/authGuard.js"
import 'dotenv/config';



const app = express();
const db = process.env.BDD_URL;

mongoose.connect(db, err => {
    if (err) {
        console.error("Error" + err)
    } else {
        console.log("Connected at db")
    }
});


app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('./public/assets'));

app.listen(8080, () => {
    console.log("Servor Ok: http://localhost:8080/")
});

app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,
}))


// <--------------------------------Render API ---------------------->





// <-----------------------------> Connect User <----------------------------->

app.get('/', async (req, res) => {
    let user = await User.findOne({ _id: req.session.userid })
    if (user) {
        res.redirect('/personal_page/' + req.session.userid);

    } else {
        res.render('./users/login.html.twig', {
            url: '/'
        })
    }
});

app.get('/subscrite', async (req, res) => {
    res.render('./users/subscrite.html.twig', {
        url: '/subscrite'
    })
});

app.post('/subscrite', async (req, res) => {
    req.body.mdp = await cryptPassword(req.body.mdp)
    const user = new User(req.body)
    user.save();
    res.redirect('/')
})

app.get('/', async (req, res) => {
    res.render('./users/login.html.twig', {
        url: '/',
    })
});
app.get('/admin', async (req, res) => {
    let users = await User.find({ status: { $ne: "admin" } })
    res.render('./admin/admin.html.twig', {
        url: '/admin',
        users: users
    })
});

app.post('/', async (req, res) => {
    const idUser = await User.findOne({ mail: req.body.mail })
    if (idUser) {
        let compare = await comparePassword(req.body.mdp, idUser.mdp)
        if (compare) {
            req.session.userid = idUser._id
            if (idUser.status == "admin") {
                res.redirect('/admin')
            } else {
                res.redirect('/personal_page/')

            }
        }

    } else {
        res.redirect("/")
    }

})


app.get('/personal_page/', routeGuard, async (req, res) => {

    let user = await User.findOne({ _id: req.session.userid })
    console.log(user);
    if (user) {

        let order = await fetch('http://localhost:3000/api/full-order')
        order = await order.json()
        res.render('./users/personal_page.html.twig', {
            user: user,
            url: 'personal_page/:id',
            orders: order,
        })

    } else {
        res.redirect("/");
    }
});


app.get('/logout', async (req, res) => {
    req.session.destroy()
    res.redirect('/')
})

app.get('/pro_page/:id', async (req, res) => {
    let user = await User.findOne({ _id: req.params.id })
    res.render('./users/pro_page.html.twig', {
        user: user,
        url: 'pro_page/:id',

    })
});

app.get('/user/:id', async (req, res) => {
    let user = await User.findOne({ _id: req.params.id })
    res.render('./users/user.html.twig', {
        user: user,
        url: 'user/:id',

    })
});


app.get('/ticket/:id', async (req, res) => {
    let user = await User.findOne({ _id: req.params.id })
    res.render('./users/ticket.html.twig', {
        user: user,
        url: 'ticket/:id',

    })
});


app.get('/favori/:id', async (req, res) => {
    let user = await User.findOne({ _id: req.params.id })
    res.render('./users/favori.html.twig', {
        user: user,
        url: 'favori/:id',

    })
});


app.get('/qrcode/:id', async (req, res) => {
    let user = await User.findOne({ _id: req.params.id })
    res.render('./users/qrcode.html.twig', {
        user: user,
        url: 'qrcode/:id',

    })
});


app.get("/deleteUser/:id", async (req, res) => {
    let deleteUser = await User.deleteOne({ _id: req.params.id })
    if (deleteUser.deletedCount === 1) {
        res.redirect('/admin')
    }
    res.redirect("/admin")
});
app.get("/update", routeGuard, async (req, res) => {
    res.render('./users/update.html.twig', {
        user: req.session.user,
        url: 'update',

    })
});

app.get("/contact", routeGuard, async (req, res) => {
    res.render('./users/contact.html.twig', {
        user: req.session.user,
        url: 'contact',

    })
});


app.post('/update/:id', routeGuard, async (req, res) => {
    let user = await User.updateOne({ _id: req.params.id }, req.body)
    if (user) {
        res.redirect('/personal_page')
    }

})


app.get("*", (req, res) => {
    res.redirect('/')
});