# Hướng Dẫn Sử Dụng

## Giới Thiệu
Dự án này cung cấp công cụ để render NFT. Hãy làm theo các bước dưới đây để cài đặt và sử dụng.

## Cài Đặt
1. Clone repository:
    ```bash
    git clone https://github.com/thevapelabs-io/render-nft.git
    cd render-nft
    ```

2. Cài đặt các dependencies:
    ```bash
    npm install
    ```
    hoặc
    ```bash
    yarn install
    ```

## Chuẩn bị tài nguyên trước khi chạy chương trình
1.  folder các layer hình ảnh - vd: `./layers/boy`
2.  tại file `index.js` -> số lượng xuất ra NFT
    ```bash
        const supply = 100; // Number of NFT's to generate
    ```
2.  tại file `index.js` -> trỏ đường dẫn dến đến folder hình ảnh vào input
    ```bash
        const dir = {
            input: `./layers/boy`,
            output: `./output`,
        };
    ```

## Lưu ý
CÁC FOLDER HÌNH ẢNH NHƯ BACKGROUNDS, SKINS,... PHẢI ĐƯỢC SẮP XẾP ĐÚNG THỨ TỰ TỪ TRÊN XUỐNG DƯỚI
THÌ ẢNH MỚI RENDER CHÍNH XÁC!


## Sử Dụng
1. Chạy lệnh để render NFT:
    ```bash
    npm run start
    ```
    hoặc
    ```bash
    yarn start
    ```

2. Kết quả sẽ được lưu trong thư mục `output/`.

