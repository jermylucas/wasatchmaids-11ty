const { html } = require("common-tags");

function CtaBanner() {
  return html`
    <a
      class="button-solid"
      href="/assets/files/wasatch-maids-contact.vcf"
      style="
            display: inline-flex;
            align-items: center;
            justify-content: center;
          ">
      <img
        style="width: 50px; margin-right: 20px"
        src="/assets/icons/add-contact.svg"
        aria-hidden="true"
        alt="add-to-contacts icon" />
      Add To Contacts
    </a>
  `;
}

module.exports = CtaBanner;
