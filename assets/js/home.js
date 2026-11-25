// H2O Poços Artesianos — scripts da home
(function () {
    'use strict';

    var WA_NUMBER = '5548991111950';
    var saveData = navigator.connection && navigator.connection.saveData;
    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // ---------- Header ----------
    var header = document.getElementById('siteHeader');
    var nav = document.getElementById('mainNav');
    var toggle = document.getElementById('navToggle');

    function onScroll() { header.classList.toggle('scrolled', window.scrollY > 20); }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    function setMenu(open) {
        nav.classList.toggle('open', open);
        header.classList.toggle('menu-open', open);
        toggle.setAttribute('aria-expanded', String(open));
        toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    }
    toggle.addEventListener('click', function () { setMenu(!nav.classList.contains('open')); });
    nav.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', function () { setMenu(false); }); });

    // ---------- Reels: navegação ----------
    var track = document.getElementById('reelsTrack');
    function step() { var c = track.querySelector('.reel-card'); return c ? c.offsetWidth + 18 : 280; }
    document.getElementById('reelsPrev').addEventListener('click', function () { track.scrollBy({ left: -step() * 2, behavior: 'smooth' }); });
    document.getElementById('reelsNext').addEventListener('click', function () { track.scrollBy({ left: step() * 2, behavior: 'smooth' }); });

    // ---------- Reels: tocar sem som quando visíveis ----------
    var previewVideos = document.querySelectorAll('.reel-card video');
    if ('IntersectionObserver' in window && !saveData && !reduceMotion) {
        var io = new IntersectionObserver(function (entries) {
            entries.forEach(function (e) {
                var v = e.target;
                if (e.isIntersecting && e.intersectionRatio >= 0.6) {
                    if (v.preload === 'none') v.preload = 'auto';
                    var p = v.play(); if (p && p.catch) p.catch(function () {});
                } else {
                    v.pause();
                }
            });
        }, { threshold: [0, 0.6] });
        previewVideos.forEach(function (v) { io.observe(v); });
    }

    // ---------- Modal de vídeo (com som) ----------
    var modal = document.getElementById('videoModal');
    var modalVideo = document.getElementById('modalVideo');
    var modalTitle = document.getElementById('modalTitle');
    var lastFocus = null;
    var bgAudio = document.getElementById('background-audio');
    var bgWasPlaying = false;

    function openVideo(src, title) {
        lastFocus = document.activeElement;
        modalVideo.src = src;
        modalTitle.textContent = title || '';
        modal.hidden = false;
        document.body.style.overflow = 'hidden';
        if (bgAudio && !bgAudio.paused) { bgWasPlaying = true; bgAudio.pause(); } else { bgWasPlaying = false; }
        modalVideo.muted = false;
        var p = modalVideo.play(); if (p && p.catch) p.catch(function () {});
        document.getElementById('videoModalClose').focus();
        if (typeof gtag === 'function') gtag('event', 'video_play', { event_category: 'engagement', event_label: title || src });
    }
    function closeVideo() {
        modalVideo.pause();
        modalVideo.removeAttribute('src');
        modalVideo.load();
        modal.hidden = true;
        document.body.style.overflow = '';
        if (bgWasPlaying && bgAudio) { var p = bgAudio.play(); if (p && p.catch) p.catch(function () {}); }
        if (lastFocus) lastFocus.focus();
    }
    document.querySelectorAll('[data-video]').forEach(function (btn) {
        btn.addEventListener('click', function () { openVideo(btn.getAttribute('data-video'), btn.getAttribute('data-title')); });
    });
    document.getElementById('videoModalClose').addEventListener('click', closeVideo);
    modal.addEventListener('click', function (e) { if (e.target === modal || e.target.classList.contains('video-modal-inner')) closeVideo(); });

    // Vídeo em destaque (resultado) toca sem som quando visível
    var feature = document.querySelector('.reel-card--feature video');
    if (feature && 'IntersectionObserver' in window && !saveData && !reduceMotion) {
        new IntersectionObserver(function (entries) {
            entries.forEach(function (e) {
                if (e.isIntersecting) { feature.preload = 'auto'; var p = feature.play(); if (p && p.catch) p.catch(function () {}); }
                else feature.pause();
            });
        }, { threshold: 0.5 }).observe(feature);
    }
    if (saveData || reduceMotion) {
        var hv = document.querySelector('.hero-video');
        if (hv) { hv.removeAttribute('autoplay'); hv.pause(); }
    }

    // ---------- Galeria de fotos ----------
    var photos = Array.prototype.slice.call(document.querySelectorAll('.g-item'));
    var pModal = document.getElementById('photoModal');
    var pImg = document.getElementById('photoImg');
    var pIndex = 0;
    function showPhoto(i) {
        pIndex = (i + photos.length) % photos.length;
        var img = photos[pIndex].querySelector('img');
        pImg.src = img.src; pImg.alt = img.alt;
    }
    function openPhoto(i) {
        lastFocus = document.activeElement;
        showPhoto(i); pModal.hidden = false; document.body.style.overflow = 'hidden';
        document.getElementById('photoClose').focus();
    }
    function closePhoto() { pModal.hidden = true; document.body.style.overflow = ''; if (lastFocus) lastFocus.focus(); }
    photos.forEach(function (b, i) { b.addEventListener('click', function () { openPhoto(i); }); });
    document.getElementById('photoClose').addEventListener('click', closePhoto);
    document.getElementById('photoPrev').addEventListener('click', function () { showPhoto(pIndex - 1); });
    document.getElementById('photoNext').addEventListener('click', function () { showPhoto(pIndex + 1); });
    pModal.addEventListener('click', function (e) { if (e.target === pModal) closePhoto(); });

    document.addEventListener('keydown', function (e) {
        if (!modal.hidden && e.key === 'Escape') closeVideo();
        if (!pModal.hidden) {
            if (e.key === 'Escape') closePhoto();
            if (e.key === 'ArrowLeft') showPhoto(pIndex - 1);
            if (e.key === 'ArrowRight') showPhoto(pIndex + 1);
        }
    });

    // ---------- Formulário -> WhatsApp ----------
    var form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            var ok = true;
            ['nome', 'mensagem'].forEach(function (id) {
                var f = document.getElementById(id);
                var err = document.getElementById(id + '-error');
                var empty = !f.value.trim();
                f.closest('.field').classList.toggle('has-error', empty);
                f.setAttribute('aria-invalid', String(empty));
                err.textContent = empty ? (id === 'nome' ? 'Por favor, digite seu nome.' : 'Conte rapidamente o que você precisa.') : '';
                if (empty && ok) { f.focus(); ok = false; }
            });
            if (!ok) return;
            var nome = document.getElementById('nome').value.trim();
            var cidade = document.getElementById('cidade').value.trim();
            var msg = document.getElementById('mensagem').value.trim();
            var text = 'Olá, vim através do site.\n\n*Nome:* ' + nome + (cidade ? '\n*Cidade:* ' + cidade : '') + '\n*Mensagem:* ' + msg;
            window.open('https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(text), '_blank', 'noopener,noreferrer');
        });
    }

    // ---------- Animação de entrada ----------
    if ('IntersectionObserver' in window && !reduceMotion) {
        var targets = document.querySelectorAll('.section-head, .feature, .service-card, .t-card, .g-item, .result-copy, .contact-copy, .contact-form');
        var ro = new IntersectionObserver(function (entries) {
            entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); ro.unobserve(e.target); } });
        }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
        targets.forEach(function (t) { t.classList.add('reveal'); ro.observe(t); });
    }

    var y = document.getElementById('year');
    if (y) y.textContent = new Date().getFullYear();
})();
