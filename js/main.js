document.getElementById("picture").addEventListener("change", function (e) {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = function () {
        // ポップアップ用の画像にソースをセットし、ポップアップを表示
        document.getElementById("popup-image").src = reader.result;
        document.getElementById("popup-container").style.display = "flex";
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


