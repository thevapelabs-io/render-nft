import fs from "fs";
import canvas from "canvas";
import imagemin from "imagemin";
import imageminPngquant from "imagemin-pngquant";
import path from "path";

// Basic Parameters
const projectName = "Just Another NFT Drop";
const projectDescription =
    "If you go to your grave without painting your masterpiece, it will not get painted - Gordon MacKenzie";
const supply = 100; // Number of NFT's to generate
const imageURL = `https://jamesbachini.com/images/$nftID.png`; // IPFS URL - $nftID autoinjects 1-10000
const imageSize = {
    width: 512,
    height: 512,
};

const dir = {
    input: `./layers/boy`,
    output: `./output`,
};

const drawImage = async (nftID) => {
    const blankCanvas = canvas.createCanvas(imageSize.width, imageSize.height);
    const ctx = blankCanvas.getContext("2d");
    ctx.attributes = [];

    /* Add layers using addLayer(dir,file,ctx) function below */

    const layers = [];
    const groupedImages = getGroupedImageNames(dir.input);
    for(const [key, value] of Object.entries(groupedImages)) {
        layers.push(mixLayers(value, key, ctx))
    }

    await Promise.all(layers);
    // Add Some Text
    ctx.fillStyle = "#ffffff";
    ctx.font = "20px Nunito, sans-serif"; // Nunito is the font, change this or download it from Google Fonts
    ctx.fillText(`${projectName} #${nftID}`, 120, 460);
    // Add Numeric Attributes With No Image Layers
    const strength = Math.floor(Math.random() * 99);
    ctx.attributes.push({ trait_type: "Strength", value: strength });
    // Finish By Adding A Vignette Overlay, Don't Need An Attribute For This
    // const img = await canvas.loadImage(`${dir.input}/vignette.png`);
    // ctx.drawImage(img, 0, 0, imageSize.width, imageSize.height);

    /* End of layers code */

    // save metadata
    fs.writeFileSync(
        `${dir.output}/metadata/${nftID}.json`,
        JSON.stringify(
            {
                name: `${projectName} #${nftID}`,
                description: projectDescription,
                image: imageURL.split("$nftID").join(nftID),
                //external_url: projectURL,
                attributes: ctx.attributes,
            },
            null,
            2
        ),
        (err) => {
            if (err) throw err;
        }
    );

    // save image
    fs.writeFileSync(
        `${dir.output}/hdimages/${nftID}.png`,
        blankCanvas.toBuffer("image/png")
    );
    const files = await imagemin([`${dir.output}/hdimages/${nftID}.png`], {
        destination: `${dir.output}/images/`,
        plugins: [imageminPngquant({ quality: [0.5, 0.6] })],
    });
};

const addLayer = async (traitType, val, ctx) => {
    const img = await canvas.loadImage(`${dir.input}/${traitType}/${val}.png`);
    ctx.drawImage(img, 0, 0, imageSize.width, imageSize.height);
    ctx.attributes.push({ trait_type: traitType, value: val });
};

const recreateOutputsDir = () => {
    if (fs.existsSync(dir.output))
        fs.rmdirSync(dir.output, { recursive: true });
    fs.mkdirSync(dir.output);
    fs.mkdirSync(`${dir.output}/metadata`);
    fs.mkdirSync(`${dir.output}/hdimages`);
};

async function* batch(total, size = 100) {
    const arr = new Array(total).fill(0);
    let i = 0;
    while (arr.length) {
        await Promise.all(
            arr.slice(0, size).map((_, idx) => {
                drawImage(i * size + idx + 1);
            })
        );
        arr.splice(0, size);
        i++;
        yield [total - arr.length, total];
    }
}

function getGroupedImageNames(dir) {
    const result = {};
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
    const folders = fs
        .readdirSync(dir, { withFileTypes: true })
        .filter((dirent) => dirent.isDirectory());

    folders.forEach((folder) => {
        const folderPath = path.join(dir, folder.name);
        const files = fs.readdirSync(folderPath);

        const imageNames = files
            .filter((file) =>
                imageExtensions.includes(path.extname(file).toLowerCase())
            )
            .map((file) => path.parse(file).name);

        result[folder.name] = imageNames;
    });

    return result;
}

const mixLayers = (arr, key, ctx) => {
    const bkg = arr[Math.floor(Math.random() * arr.length)];
    return addLayer(key, bkg, ctx)
};

const main = async () => {
    recreateOutputsDir();
    for await (let [progress, total] of batch(supply)) {
        console.log(`Progress: ${progress}/${total}`);
    }
};

(() => main())();
