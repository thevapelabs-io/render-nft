
# redner NTF
## Introduction
This project provides a tool for rendering NFTs. Follow the steps below to install and use it.

## Installation
1. Clone repository:
    ```bash
    git clone https://github.com/thevapelabs-io/render-nft.git
    cd render-nft
    ```

2. Install dependencies:
    ```bash
    npm install
    ```
    or
    ```bash
    yarn install
    ```

## Preparing Resources Before Running the Program
1.  Folder containing image layers - ex: `./layers/boy`
2.  In the index.js file, specify the path to the image folder in the input:
    ```bash
        const dir = {
            input: `./layers/boy`,
            output: `./output`,
        };
    ```

## Note
IMAGE FOLDERS SUCH AS BACKGROUNDS, SKINS, ETC., MUST BE ARRANGED IN THE CORRECT ORDER FROM TOP TO BOTTOM FOR THE IMAGES TO RENDER ACCURATELY!


## Usage
1. Run the command to render NFTs:
    ```bash
    npm run start
    ```
    or
    ```bash
    yarn start
    ```

2. The results will be saved in the output/ directory.

