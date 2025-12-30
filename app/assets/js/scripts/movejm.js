const selectEl = document.getElementById('instance-select');
const btnEl = document.getElementById('move-btn');

// 起動時にフォルダ一覧を取得してセレクトボックスを更新
window.electronAPI.getInstances().then(instances => {
    selectEl.innerHTML = ''; // クリア
    instances.forEach(dir => {
        const option = document.createElement('option');
        option.value = dir;
        option.textContent = dir;
        selectEl.appendChild(option);
    });
});

// ボタンクリック時に選択されたフォルダ名をMainへ送る
btnEl.addEventListener('click', async () => {
    const selectedDir = selectEl.value;
    if (!selectedDir) return alert('インスタンスを選択してください');
    
    // Mainプロセスに移動処理を依頼（Main側で moveJourneyMap ハンドラが必要）
    const result = await window.electronAPI.moveJourneyMap(selectedDir);
    alert('完了しました！');
});