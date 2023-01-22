const { html } = require('common-tags');

function CtaBanner({ text, btnText, btnLink, dark }) {
  return html`
    <section class="${dark ? `cta-banner-dark` : `cta-banner`}">
      <div class="cta-wrapper">
        <div class="cta-grid">
          <h4 class="cta-grid-text">${text}</h4>
          <div class="cta-grid-btn">
            <a class="button-solid-small" href="${btnLink}" aria-label="Book with us">${btnText}</a>
          </div>
        </div>
      </div>
    </section>
  `;
}

module.exports = CtaBanner;
