# Backend
Lancer le serveur : npm run start

# Routes

## création d'un compte utilisateur  avec POST
http://localhost:3000/api/auth/signup

{
    "email" : xxxxxxxx.xx,
    "password" : "xxxxxxxxxx"
}

## se connecter  avec POST
http://localhost:3000/api/auth/login

{
    "email" : xxxxxxxx.xx,
    "password" : "xxxxxxxxxx"
}

## créer une sauce avec POST
http://localhost:3000/api/sauces

{ "valeur":
    {   "userId": "xxxxxx",
        "name": "xxx",
        "manufacturer": "xxxxx",
        "description": "xxxx",
        "mainPepper": "xxxxx",
        "imageUrl": "xxxxxx",
        "heat": x,
        "likes": x,
        "dislikes": x
    }
}