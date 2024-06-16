document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('nav ul li a');
    const content = document.getElementById('content');

    // ナビゲーションリンクのクリックイベントを設定
    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const page = link.getAttribute('data-page');
            loadPage(page);
        });
    });

    // 初期ページとしてホームページを読み込む
    loadPage('home');

    // ページを読み込む関数
    function loadPage(page) {
        fetch(`${page}.html`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.text();
            })
            .then(html => {
                content.innerHTML = html;
                if (page === 'home') {
                    initHomePage();
                }
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
                content.innerHTML = '<p>ページを読み込むことができませんでした。</p>';
            });
    }

    // ホームページの初期化関数
    function initHomePage() {
        const reviewSliderWrapper = document.querySelector('.review-slider-wrapper');
        let sliderInterval;

        // サンプルのレビュー記事を動的に追加
        const sampleReviews = [
            {
                title: 'サンプルマンガ1',
                cover: 'images/sample1.jpg',
                summary: 'これはサンプルマンガ1のあらすじです。',
                review: 'これはサンプルマンガ1のレビューです。'
            },
            {
                title: 'サンプルマンガ2',
                cover: 'images/sample2.jpg',
                summary: 'これはサンプルマンガ2のあらすじです。',
                review: 'これはサンプルマンガ2のレビューです。'
            },
            {
                title: 'サンプルマンガ3',
                cover: 'images/sample3.jpg',
                summary: 'これはサンプルマンガ3のあらすじです。',
                review: 'これはサンプルマンガ3のレビューです。'
            }
        ];

        sampleReviews.forEach(review => {
            const reviewDiv = document.createElement('div');
            reviewDiv.classList.add('review-item');
            reviewDiv.innerHTML = `
                <img src="${review.cover}" alt="${review.title}">
                <h3>${review.title}</h3>
                <p>${review.summary}</p>
                <p>${review.review}</p>
            `;
            reviewSliderWrapper.appendChild(reviewDiv);
        });

        // スライダーの自動移動を設定
        function startSlider() {
            sliderInterval = setInterval(() => {
                reviewSliderWrapper.appendChild(reviewSliderWrapper.firstElementChild);
            }, 3000);
        }

        // スライダーの自動移動を停止
        function stopSlider() {
            clearInterval(sliderInterval);
        }

        reviewSliderWrapper.addEventListener('mouseover', stopSlider);
        reviewSliderWrapper.addEventListener('mouseout', startSlider);

        startSlider();
    }
});