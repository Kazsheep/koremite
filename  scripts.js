document.addEventListener('DOMContentLoaded', () => {
    // レビュー記事のスライドショー
    const reviewSlider = document.querySelector('.review-slider');
    if (reviewSlider) {
        let scrollAmount = 0;
        const slideTimer = setInterval(() => {
            reviewSlider.scrollBy({ 
                top: 0, 
                left: 300, 
                behavior: 'smooth' 
            });
            scrollAmount += 300;
            if (scrollAmount >= reviewSlider.scrollWidth) {
                scrollAmount = 0;
                reviewSlider.scrollTo({ 
                    top: 0, 
                    left: 0, 
                    behavior: 'smooth' 
                });
            }
        }, 3000);
    }
    
    // レビュー投稿フォームの処理
    const reviewForm = document.querySelector('form');
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
            // サーバーにレビューを送信（仮）
            console