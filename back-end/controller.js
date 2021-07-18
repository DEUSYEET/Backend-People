//built in
const fs = require('fs');
const crypto = require('crypto')
//installed
const random = require('random-seed');

let count = 0

let test = fs.readFileSync('./fullSample.json');
const testData = JSON.parse(test);
let randTest = new random.create();

let dataFile = fs.readFileSync("./names.json", 'utf-8');
const data = JSON.parse(dataFile);

exports.test = (req, res) => {
    let seed = req.query.seed;

    let rand = new random.create();
    if (seed != null) {
        rand = new random.create(seed)
    }

    let result = {
        "results": [
            genPerson(rand)
        ],
        "info": {
            "seed": seed,
            "results": 1
        }
    }
    res.send(result);
    count = 0;
}

exports.api = async (req, res) => {
    let seed = req.query.seed;
    let results = req.query.results || 1;

    let rand = new random.create();
    if (seed != null) {
        rand = new random.create(seed)
    }

    if (results > 5000) {
        results = 5000;
    }

    let users = []
    for (let index = 0; index < results; index++) {
        var user = await genPerson(rand)
        users.push(user)
    }

    let result = {
        "results": users,
        "info": {
            "seed": seed,
            "results": results
        }
    }

    console.log("sending...")
    res.send(result);
    count = 0;
}


async function genPerson(rand) {
    //gender
    let gender = ''
    let genderChar = ''
    if (rand(100) % 2 == 0) {
        gender = 'male';
        genderChar = 'm'
    } else {
        gender = 'female'
        genderChar = 'f'
    }
    
    //name
    let first = ''
    if (gender == "male") {
        first = data.male_names[rand(data.male_names.length)];
    } else {
        first = data.female_names[rand(data.female_names.length)];
    }
    let last = data.last_names[rand(data.last_names.length)];
    

    //counter
    count++;
    console.log(`[${count}]`+"generating "+first+" "+last+"...")




    //username
    let username = data.username_a[rand(data.username_a.length)] + data.username_b[rand(data.username_b.length)] + rand.intBetween(1, 99)

    //address
    let number = rand.intBetween(1, 9999)
    let streetName = data.last_names[rand(data.last_names.length)] +' ' + data.street_types[rand(data.street_types.length)];

    //city
    let city = data.last_names[rand(data.last_names.length)] + data.city_endings[rand(data.city_endings.length)];

    //state
    let state = data.states[rand(data.states.length)];
    let country = "United States";

    //zip
    let zip = rand.intBetween(11111, 99999);

    //phone
    let phone = "" + rand.intBetween(100, 999)+'-' + rand.intBetween(100, 999)+'-'  + rand.intBetween(1000, 9999)

    //registration date
    regYear = rand.intBetween(1990, 2020);
    let regDate = regYear + "-" + rand.intBetween(1, 12) + "-" + rand.intBetween(1, 31);
    let regAge = 2020 - regYear

    //dob
    dobYear = rand.intBetween(1955, 2002)
    let dob = dobYear + "-" + rand.intBetween(1, 12) + "-" + rand.intBetween(1, 31);
    let age = 2020 - dobYear;

    //email
    let email = username + "@express.com"

    //uuid
    let hash = crypto.createHash('sha256');
    hash.update(username);
    let uuid = hash.digest('hex')

    //images
    i1 = rand.intBetween(1,4)
    i2 = rand(10);
    if (i1 == 4) {
        i2 = 0;
    }


    imageID = genderChar + "0" + i1 + i2
    imagePathL = `./images/large/${gender}/${imageID}.jpg`;
    imagePathM = `./images/medium/${gender}/${imageID}.jpg`;

    let imageL = await encode(imagePathL);
    let imageM = await encode(imagePathM);

    // console.log(imageL)

    let user = {
        "gender": gender,
        "name": {
            "first": first,
            "last": last
        },
        "location": {
            "street": {
                "number": number,
                "name": streetName
            },
            "city": city,
            "state": state,
            "country": country,
            "postcode": zip,
        },
        "email": email,
        "login": {
            "uuid": uuid,
            "username": username,
        },
        "dob": {
            "date": dob,
            "age": age
        },
        "registered": {
            "date": regDate,
            "age": regAge
        },
        "phone": phone,
        "picture": {
            "large": 'data:image/jpeg;base64,' + imageL,
            "medium": 'data:image/jpeg;base64,' + imageM,
        },
    }

    return user;
}

const encode = path => {
    return new Promise(resolve => {
        fs.readFile(path, (err, data) => {
            if (err) console.error(err);
            let imgEncode = new Buffer(data).toString('base64');
            resolve(imgEncode);
        });
    })
}