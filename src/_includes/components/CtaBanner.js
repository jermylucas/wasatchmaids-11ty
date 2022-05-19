const { html } = require("common-tags");

function CtaBanner({ text, btnText, dark }) {
  return html`
    <section class="${dark ? `cta-banner-dark` : `cta-banner`}">
      <div class="cta-wrapper">
        <div class="cta-grid">
          <div class="cta-grid-text">${text}</div>
          <div class="cta-grid-btn">
            <a class="button-solid-small" href="/booknow.html">${btnText}</a>
          </div>
        </div>
      </div>
    </section>
  `;
}

module.exports = CtaBanner;
