let composing = false;
let compositionText = ''; // 変換中のテキストを保持
let correctPassword = '';
let boxCount = 0;

// 設定ファイルを読み込む
function loadConfig() {
    fetch('config.json')
        .then(response => response.json())
        .then(data => {
            correctPassword = data.password;
            boxCount = data.boxCount;
            createPasswordBoxes(boxCount); // パスワード入力欄を生成
        })
        .catch(error => console.error('設定ファイルの読み込みに失敗しました:', error));
}

// パスワードボックスを生成する関数
function createPasswordBoxes(count) {
    const container = document.getElementById('passwordBoxes');
    container.innerHTML = ''; // 既存のボックスをクリア

    for (let i = 0; i < count; i++) {
        const input = document.createElement('input');
        input.type = 'text';
        input.maxLength = 1;
        input.className = 'password-box';
        input.addEventListener('keydown', handleKeyDown);
        input.addEventListener('compositionstart', handleCompositionStart);
        input.addEventListener('compositionupdate', handleCompositionUpdate);
        input.addEventListener('compositionend', handleCompositionEnd);
        input.addEventListener('input', handleInput);
        container.appendChild(input);
    }
    // 最初のボックスにフォーカスを設定
    const firstBox = document.querySelector('.password-box');
    if (firstBox) {
        firstBox.focus();
    }
}

// キーイベント処理
function handleKeyDown(event) {
    const input = event.target;
    if (event.key === 'Backspace' && input.value.length === 0) {
        // 前のボックスにフォーカスを移動
        let prev = input.previousElementSibling;
        while (prev && prev.className !== 'password-box') {
            prev = prev.previousElementSibling;
        }
        if (prev) {
            prev.focus();
        }
    }
}

// 変換中の処理
function handleCompositionStart(event) {
    composing = true;
    compositionText = ''; // 変換中のテキストをリセット
}

function handleCompositionUpdate(event) {
    compositionText = event.data; // 変換中のテキストを保存
}

function handleCompositionEnd(event) {
    composing = false;
    const input = event.target;
    const finalText = compositionText;
    // 変換結果を分割して各ボックスに追加
    addTextToBoxes(finalText);
    compositionText = ''; // 変換中のテキストをリセット
}

function handleInput(event) {
    if (!composing) {
        const input = event.target;
        if (input.value.length === 1) {
            moveFocus(input);
        }
    }
}

function addTextToBoxes(text) {
    const inputs = Array.from(document.querySelectorAll('.password-box'));
    let index = 0;

    for (const char of text) {
        if (index < inputs.length) {
            inputs[index].value = char;
            index++;
        } else {
            break; // すべてのボックスが埋まったら終了
        }
    }

    if (index < inputs.length) {
        inputs[index].focus(); // 未入力のボックスにフォーカス
    }
}

function moveFocus(currentInput) {
    const inputs = Array.from(document.querySelectorAll('.password-box'));
    const index = inputs.indexOf(currentInput);
    if (index >= 0 && index < inputs.length - 1) {
        inputs[index + 1].focus();
    }
}

// パスワードを送信する関数
function submitPassword() {
    const inputs = document.querySelectorAll('.password-box');
    let enteredPassword = '';
    inputs.forEach(input => {
        enteredPassword += input.value;
    });

    if (enteredPassword === correctPassword) {
        onSuccess(true);
    } else {
        onSuccess(false);
    }
}

// パスワードが正しいかを確認する関数
function onSuccess(isCorrect) {
    const errorMessage = document.getElementById('errorMessage');
    if (isCorrect) {
        // エラーメッセージを非表示にする
        errorMessage.style.display = 'none';

        // パスワード入力欄を非表示にする
        document.getElementById('passwordForm').style.display = 'none';

        // タイマーを表示する
        document.getElementById('timerContainer').style.display = 'block';

        // 3秒後にタイマーを開始
        setTimeout(() => {
            startTimer(60); // 60秒のタイマーを開始
        }, 3000);
    } else {
        // エラーメッセージを表示する
        errorMessage.style.display = 'block';
    }
}

function startTimer(duration) {
    const timerElement = document.getElementById('timer');
    let remainingTime = duration;
    const timerInterval = setInterval(() => {
        const minutes = Math.floor(remainingTime / 60);
        const seconds = remainingTime % 60;
        timerElement.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
        remainingTime--;

        if (remainingTime < 0) {
            clearInterval(timerInterval);
            playAlarm(); // タイマーが終了したらアラームを鳴らす
        }
    }, 1000);
}

function playAlarm() {
    const audio = new Audio('https://www.soundjay.com/button/beep-07.wav'); // アラーム音のURL
    audio.play();
}

// 設定ファイルを読み込んで初期化
loadConfig();
