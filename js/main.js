document.getElementById("picture").addEventListener("change", function (e) {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = function () {
        // ポップアップ用の画像にソースをセットし、ポップアップを表示
        const image = document.getElementById("popup-image");
        image.src = reader.result;
        document.getElementById("popup-container").style.display = "flex";
        image.style.filter = "sepia(100%)";
        // ダウンロードボタンに画像のURLをセット
        //document.getElementById("download-image").setAttribute("href", reader.result);
        document.getElementById("download-image").setAttribute("download", "downloaded_image.png");
        // ダウンロード案内を表示
        document.getElementById("long-press-instruction").style.display = "block";
    };
    if (file) {
        reader.readAsDataURL(file);
    }
});

// ポップアップの閉じるボタンにイベントリスナーを追加
document.getElementById("close-popup").addEventListener("click", function() {
    document.getElementById("popup-container").style.display = "none";
});


document.getElementById("download-image").addEventListener("click", function() {
    const image = document.getElementById("popup-image"); // ポップアップで表示している画像要素を取得
    const imageUrl = image.getAttribute("src"); // 画像のURLを取得
    const imageName = "downloaded_image"; // 保存する画像の名前

    // ダウンロードを実行するためのアンカータグを生成
    const link = document.createElement("a");
    link.href = imageUrl; // ダウンロードする画像のURL
    link.download = imageName; // ダウンロード時のファイル名
    document.body.appendChild(link); // DOMにリンクを追加
    link.click(); // リンクをプログラム的にクリックしてダウンロードを実行
    document.body.removeChild(link); // 不要になったリンクをDOMから削除
});

/*
document.getElementById("download-image").addEventListener("click", function() {
    const imageElement = document.getElementById("popup-image"); // ポップアップで表示している画像要素を取得
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    // 画像要素からサイズを取得してキャンバスのサイズを設定
    const img = new Image();
    img.src = imageElement.getAttribute("src");
    img.onload = function() {
        canvas.width = img.width;
        canvas.height = img.height;

        // キャンバスに画像を描画
        ctx.drawImage(img, 0, 0);

        // セピアフィルターを適用
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        for (let i = 0; i < data.length; i += 4) {
            const red = data[i];
            const green = data[i + 1];
            const blue = data[i + 2];
            data[i] = red * 0.393 + green * 0.769 + blue * 0.189; // Red
            data[i + 1] = red * 0.349 + green * 0.686 + blue * 0.168; // Green
            data[i + 2] = red * 0.272 + green * 0.534 + blue * 0.131; // Blue
        }
        ctx.putImageData(imageData, 0, 0);

        // キャンバスの内容を画像としてダウンロード
        const imageName = "downloaded_image_sepia.png"; // 保存する画像の名前
        const imageUrl = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
        const link = document.createElement("a");
        link.href = imageUrl;
        link.download = imageName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };
});
*/

