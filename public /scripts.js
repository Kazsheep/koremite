document.addEventListener('DOMContentLoaded', () => {
    function loadContent(page) {
        fetch(`${page}.html`)
            .then(response => response.text())
            .then(data => {
                document.getElementById('content').innerHTML = data;
                if (page === 'home') {
                    loadReviewsSlider();
                } else if (page === 'reviews') {
                    loadReviewsList();
                }
                addFormHandlers();
            })
            .catch(error => {
                console.error('Error loading content:', error);
                document.getElementById('content').innerHTML = '<p>コンテンツの読み込み中にエラーが発生しました。</p>';
            });
    }

    function loadReviewsSlider() {
        fetch('reviews.json')
            .then(response => response.json())
            .then(data => {
                const reviewSlider = document.querySelector('.review-slider');
                const sliderWrapper = document.createElement('div');
                sliderWrapper.classList.add('review-slider-wrapper');
                reviewSlider.appendChild(sliderWrapper);

                data.forEach(review => {
                    const reviewDiv = document.createElement('div');
                    reviewDiv.innerHTML = `
                        <img src="${review.cover}" alt="${review.title}" style="width:100%;">
                        <h3>${review.title}</h3>
                        <p>${review.summary}</p>
                        <p>${review.review}</p>
                    `;
                    sliderWrapper.appendChild(reviewDiv);
                });

                let currentIndex = 0;
                const totalReviews = data.length;

                setInterval(() => {
                    currentIndex = (currentIndex + 1) % totalReviews;
                    const offset = -currentIndex * (300 + 20); // 300はレビューdivの幅、20はマージンの合計
                    sliderWrapper.style.transform = `translateX(${offset}px)`;
                }, 3000); // 3秒ごとにスライド
            })
            .catch(error => {
                console.error('Error loading reviews:', error);
                const reviewSlider = document.querySelector('.review-slider');
                if (reviewSlider) {
                    reviewSlider.innerHTML = '<p>レビューの読み込み中にエラーが発生しました。</p>';
                }
            });
    }

    function loadReviewsList() {
        fetch('reviews.json')
            .then(response => response.json())
            .then(data => {
                const reviewListSection = document.querySelector('.review-list');
                if (reviewListSection) {
                    data.forEach(review => {
                        const reviewDiv = document.createElement('div');
                        reviewDiv.classList.add('review-item');
                        reviewDiv.innerHTML = `
                            <img src="${review.cover}" alt="${review.title}" style="width:100px; float:left; margin-right:10px;">
                            <h3>${review.title}</h3>
                            <p>${review.summary}</p>
                            <p>${review.review}</p>
                            <div style="clear:both;"></div>
                        `;
                        reviewListSection.appendChild(reviewDiv);
                    });
                }
            })
            .catch(error => {
                console.error('Error loading reviews list:', error);
                const reviewListSection = document.querySelector('.review-list');
                if (reviewListSection) {
                    reviewListSection.innerHTML = '<p>レビューリストの読み込み中にエラーが発生しました。</p>';
                }
            });
    }

    function addFormHandlers() {
        const reviewForm = document.querySelector('#submit-review-form');
        if (reviewForm) {
            reviewForm.addEventListener('submit', (event) => {
                event.preventDefault();
                const formData = new FormData(reviewForm);
                const reviewData = {
                    title: formData.get('title'),
                    cover: formData.get('cover'),
                    summary: formData.get('summary'),
                    review: formData.get('review')
                };
                fetch('/submit_review', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(reviewData)
                })
                .then(response => response.text())
                .then(data => {
                    alert(data);
                })
                .catch(error => {
                    console.error('Error submitting review:', error);
                    alert('レビューの投稿中にエラーが発生しました。');
                });
            });
        }

        const registerForm = document.querySelector('#register-form');
        if (registerForm) {
            registerForm.addEventListener('submit', (event) => {
                event.preventDefault();
                const formData = new FormData(registerForm);
                const userData = {
                    email: formData.get('email'),
                    password: formData.get('password')
                };
                fetch('/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(userData)
                })
                .then(response => response.text())
                .then(data => {
                    alert(data);
                })
                .catch(error => {
                    console.error('Error registering user:', error);
                    alert('ユーザー登録中にエラーが発生しました。');
                });
            });
        }

        const loginForm = document.querySelector('#login-form');
        if (loginForm) {
            loginForm.addEventListener('submit', (event) => {
                event.preventDefault();
                const formData = new FormData(loginForm);
                const userData = {
                    email: formData.get('email'),
                    password: formData.get('password')
                };
                fetch('/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(userData)
                })
                .then(response => response.text())
                .then(data => {
                    alert(data);
                })
                .catch(error => {
                    console.error('Error logging in user:', error);
                    alert('ログイン中にエラーが発生しました。');
                });
            });
        }
    }

    document.querySelectorAll('nav ul li a').forEach(link => {
        link.addEventListener('click', event => {
            event.preventDefault();
            const page = event.target.getAttribute('data-page');
            loadContent(page);
        });
    });

    // デフォルトでホームページの内容をロード
    loadContent('home');
});