const {spawn, exec} = require('child_process');

let path = "/Users/dfernandezpadron/Desktop/ecPark-HackGT2018/ecPark-backend/";


mv = (name) => {
    return new Promise((resolve, reject) => {
        let mv = spawn('mv', [path + name, path + name + ".JPEG"]);
        mv.on('close', (code) => {
            resolve(path + name + ".JPEG");
        });
    });
}

predictImgOne = async (name) => {
    let path = await mv(name);
    return new Promise((resolve, reject) => {
        let alpaca = spawn('alpr', [path]);

        let all_data = "";

        alpaca.stdout.on('data', (data) => {
            // console.log(data.toString('utf-8'));
            all_data += data.toString('utf-8');

            // resolve(data);
        });

        alpaca.stdout.on('close', (code) => {
            resolve(all_data);
        });

    });
}


predictImg = (name) => {
    return new Promise ( async (resolve, reject) => {
        let data = await predictImgOne(name);
        let tag = data.split("-")[1].split(" ")[1].trim();
        resolve(tag);
    });
}



module.exports = predictImg;



