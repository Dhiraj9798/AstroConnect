<?php include 'includes/header.php'; ?>

<section class="hero-section">

<div class="hero-bg">
<canvas id="webgl-canvas"></canvas>
</div>

<div class="hero-content">

<h1 class="hero-title">
Connecting Destinies with
<span>Cosmic Intelligence</span>
</h1>




</div>

</section>
<section class="overlap-services-section" id="services">
    <div class="container">
        <div class="overlap-cards-grid">
            
            <div class="mini-glass-card fade-in-card">
                <div class="card-head">
                    <span class="card-icon">✨</span>
                    <h4>Astrology & Kundli</h4>
                </div>
                <p>Generate precise birth charts and deep planetary analysis by expert astrologers.</p>
                <a href="astrology.php" class="card-link">Explore &#8594;</a>
            </div>

            <div class="mini-glass-card fade-in-card delay-1">
                <div class="card-head">
                    <span class="card-icon">🛕</span>
                    <h4>Temple Puja Booking</h4>
                </div>
                <p>Book authentic, verified temple pujas like Rudrabhishek with live sankalp.</p>
                <a href="puja-booking.php" class="card-link">Book Now &#8594;</a>
            </div>

            <div class="mini-glass-card fade-in-card delay-2">
                <div class="card-head">
                    <span class="card-icon">💍</span>
                    <h4>Matrimonial Matching</h4>
                </div>
                <p>Find completely compatible life partners using deep Guna Milan algorithms.</p>
                <a href="matrimony.php" class="card-link">Find Match &#8594;</a>
            </div>

        </div>
    </div>
</section>
<section class="about-section" id="about">
    <div class="container about-grid">
        
        <div class="about-graphic fade-in-card">
            <div id="about-webgl-bg"></div>
            
            <div class="purple-nebula-glow"></div>

            <div class="zodiac-svg-wrapper">
                <svg viewBox="0 0 500 500" class="sacred-wheel" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="250" cy="250" r="230" class="wheel-ring outer-ring"/>
                    <circle cx="250" cy="250" r="170" class="wheel-ring middle-ring"/>
                    <circle cx="250" cy="250" r="90" class="wheel-ring inner-ring"/>
                    <circle cx="250" cy="250" r="20" class="wheel-ring core-ring"/>

                    <g class="geometry-lines">
                        <polygon points="250,80 397,335 103,335" />
                        <polygon points="250,420 103,165 397,165" />
                        <polygon points="420,250 165,103 165,397" />
                        <polygon points="80,250 335,397 335,103" />
                    </g>

                    <g class="core-rays">
                        <line x1="250" y1="250" x2="250" y2="80"/>
                        <line x1="250" y1="250" x2="250" y2="420"/>
                        <line x1="250" y1="250" x2="80" y2="250"/>
                        <line x1="250" y1="250" x2="420" y2="250"/>
                        <line x1="250" y1="250" x2="130" y2="130"/>
                        <line x1="250" y1="250" x2="370" y2="370"/>
                        <line x1="250" y1="250" x2="130" y2="370"/>
                        <line x1="250" y1="250" x2="370" y2="130"/>
                    </g>

                    <g class="zodiac-symbols">
                        <text x="250" y="55" text-anchor="middle" dominant-baseline="middle">♈</text>
                        <text x="347" y="81" text-anchor="middle" dominant-baseline="middle">♉</text>
                        <text x="419" y="153" text-anchor="middle" dominant-baseline="middle">♊</text>
                        <text x="445" y="250" text-anchor="middle" dominant-baseline="middle">♋</text>
                        <text x="419" y="347" text-anchor="middle" dominant-baseline="middle">♌</text>
                        <text x="347" y="419" text-anchor="middle" dominant-baseline="middle">♍</text>
                        <text x="250" y="445" text-anchor="middle" dominant-baseline="middle">♎</text>
                        <text x="153" y="419" text-anchor="middle" dominant-baseline="middle">♏</text>
                        <text x="81" y="347" text-anchor="middle" dominant-baseline="middle">♐</text>
                        <text x="55" y="250" text-anchor="middle" dominant-baseline="middle">♑</text>
                        <text x="81" y="153" text-anchor="middle" dominant-baseline="middle">♒</text>
                        <text x="153" y="81" text-anchor="middle" dominant-baseline="middle">♓</text>
                    </g>
                </svg>
            </div>
        </div>

        <div class="about-content fade-in-card delay-1">
            <span class="section-tag">About AstroConnect</span>
            <h2 class="section-title">Your Connected Journey: From <span>Stars to Soulmates</span></h2>
            
            <p class="section-desc">
                AstroConnect is a complete ecosystem that combines Astrology, Temple Pujas, and Matrimony into one simple flow. We help you understand your destiny, clear life's obstacles, and find your perfect life partner securely.
            </p>

            <ul class="pillar-list">
                <li>
                    <strong>Step 1: Kundli & Dosha Analysis</strong> 
                    <span>Generate precise birth charts instantly. Our system automatically detects planetary doshas (like Manglik or Kaal Sarp) and explains what they mean for you.</span>
                </li>
                <li>
                    <strong>Step 2: Remedies & Temple Pujas</strong> 
                    <span>Resolve obstacles by booking authentic temple pujas. We connect you directly with verified Pandits for transparent, guided spiritual remedies.</span>
                </li>
                <li>
                    <strong>Step 3: Astrology-Based Matrimony</strong> 
                    <span>Find true compatibility through deep Guna Milan matching. Connect safely with our unique Wallet Credit system that protects your money and privacy.</span>
                </li>
            </ul>

            <a href="about.php" class="about-cta">
                Read Our Full Story 
                <span class="cta-icon">&#8594;</span>
            </a>
        </div>
    </div>
</section>
<section class="kundli-magnet-section" id="generate-kundli">
    <div id="kundli-webgl-bg"></div>
    
    <div class="container relative-z">
        <div class="glass-magnet-card fade-in-card">
            
            <div class="magnet-header">
                <h2>Discover Your <span>Cosmic Blueprint</span></h2>
                <p>Enter your precise birth details to generate your highly accurate D1 & D9 Kundli instantly.</p>
            </div>

            <form id="quickKundliForm" class="magnet-form">
                <div class="form-grid-2x2">
                    <div class="input-wrapper">
                        <label>Full Name</label>
                        <input type="text" placeholder="Enter your full name" required>
                    </div>
                    <div class="input-wrapper">
                        <label>Place of Birth</label>
                        <input type="text" placeholder="City, State, Country" required>
                    </div>
                    <div class="input-wrapper">
                        <label>Date of Birth</label>
                        <input type="date" required>
                    </div>
                    <div class="input-wrapper">
                        <label>Time of Birth</label>
                        <input type="time" required>
                    </div>
                </div>
                
                <button type="submit" class="magnet-submit-btn">
                    Generate Free Kundli ✨
                </button>
            </form>

        </div>
    </div>
</section>
<section class="trust-section" id="trust">
    <div class="container">
        
        <div class="trust-header fade-in-card">
            <span class="section-tag">Why Choose Us</span>
            <h2 class="section-title">Built On <span>Trust & Transparency</span></h2>
            <p class="trust-subtitle">We protect your money, your privacy, and your spiritual journey with our unique ecosystem.</p>
        </div>

        <div class="trust-grid">
            
            <div class="trust-card fade-in-card delay-1">
                <div class="card-icon-box">
                    <span class="icon">🛡️</span>
                </div>
                <h3>Zero-Risk Matchmaking</h3>
                <p>Your money is entirely safe. Our ₹5,000 match-unlock fee is protected. If the other user declines your interest, your payment is instantly converted into lifetime <strong>Wallet Credit</strong> for future matches.</p>
            </div>

            <div class="trust-card fade-in-card delay-2">
                <div class="card-icon-box">
                    <span class="icon">🔒</span>
                </div>
                <h3>Absolute Privacy Control</h3>
                <p>Your mobile number and WhatsApp details remain strictly hidden. Contact information is only revealed when both parties mutually accept the match and pay the unlock fee.</p>
            </div>

            <div class="trust-card fade-in-card delay-3">
                <div class="card-icon-box">
                    <span class="icon">🛕</span>
                </div>
                <h3>100% Verified Pandits</h3>
                <p>No middlemen, no hidden frauds. We personally verify every Pandit and Temple registered on our platform to ensure your pujas are performed with authentic Vedic purity.</p>
            </div>

        </div>
    </div>
</section>



<?php include 'includes/footer.php'; ?>