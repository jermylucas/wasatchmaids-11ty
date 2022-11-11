let toggleNavStatus = false;

let toggleNav = function () {
  let getSidebar = document.querySelector('.navbar-menu');
  let getSidebarUL = document.querySelector('.side-nav ul');
  let getSidebarLinks = document.querySelectorAll('.side-nav a');
  let getSidebarVisibility = document.querySelector('.side-nav');
  var htmlGrab = document.querySelector('html');
  const hamburger = document.querySelector('.hamburger');

  hamburger.classList.toggle('is-active');

  if (toggleNavStatus === false) {
    getSidebarVisibility.style.visibility = 'visible';

    getSidebarLinks.forEach((item, index) => {
      item.style.opacity = '1';
      item.style.visibility = 'visible';
    });
    getSidebar.style.width = '60%';
    htmlGrab.classList.add('clicked');
    toggleNavStatus = true;
    // servicesUL.classList.add("clicked");
  } else if (toggleNavStatus === true) {
    getSidebarLinks.forEach((item, index) => {
      item.style.opacity = '0';
      item.style.transitionDelay = '0s';
      item.style.visibility = 'hidden';
    });
    getSidebar.style.width = '0';
    htmlGrab.classList.remove('clicked');
    toggleNavStatus = false;
    // servicesUL.classList.remove("clicked");
  }
};

// Remove spinner if iframe loaded after 2 seconds
if (document.getElementsByTagName('iframe').length) {
  document.getElementsByTagName('iframe')[0].onload = () => {
    setTimeout(() => {
      if (document.getElementById('spinner')) {
        document.getElementById('spinner').remove();
      }
    }, 1000);
  };
}

// Remove spinner if there's no iframe so it doesn't spin forever
if (document.getElementById('spinner')) {
  setTimeout(() => {
    if (document.getElementById('spinner')) {
      document.getElementById('spinner').remove();
    }
  }, 8000);
}

var widget_container = document.getElementById('msgr-widget');

var open_btn = document.getElementById('contact-btn');
var widget = document.getElementById('msgrw-body');
var msgrw = document.getElementById('msgrw');
var widget_close = document.getElementById('close-btn');
var widget_msg = document.getElementById('msgrw-msg');
var widget_avatar = document.getElementById('msgrw-ava');

open_btn.onclick = function () {
  if (widget.className == 'msgrw-body') {
    msgrw.className += ' msgrw_opened';
    widget.className += ' msgrw-body__opened';

    widget_close.innerHTML = `
    <span id="close-btn"> <svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"> <circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none" /> <path class="checkmark__check" fill="none" d="M16 16 36 36 M36 16 16 36" /> </svg> </span>`;
  } else {
    widget_close.innerHTML = '';
    msgrw.className = 'msgrw';
    widget.className = 'msgrw-body';
  }
};

widget_close.onclick = function () {
  widget.className = 'msgrw-body';
  msgrw.className = 'msgrw';
};

var testing = document.getElementById('time-btn');
window.mobileCheck = function () {
  let check = false;
  (function (a) {
    if (
      /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
        a
      ) ||
      /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
        a.substr(0, 4)
      )
    )
      check = true;
  })(navigator.userAgent || navigator.vendor || window.opera);
  return check;
};

setTimeout(() => {
  testing.style.opacity = '1';
}, 1500);

let textCtaWrapper = document.getElementById('text-cta-wrapper');
let backBtn = document.getElementById('back-btn');
let prevHtml;

function textUs() {
  prevHtml = textCtaWrapper.innerHTML;
  // if (!this.mobileCheck()) {
  //   let element = document.getElementById('hiddenAppLink');
  //   element && element.click();
  // }

  // widget.className = 'msgrw-body';
  // msgrw.className = 'msgrw';

  textCtaWrapper.innerHTML = `
  <div class="text-cta-content text-form">
    <form action="https://formspree.io/f/xeqdvbaa" method="POST">
     <input placeholder="Name" type="text"  name="name" required />
      <input placeholder="Phone Number" type="text" name="phone-number" />
      <textarea placeholder="Message" name="message" id="" cols="30" rows="5"></textarea>
     <div class="center">
        <button type="submit" id="contact-submit" class="primary button-solid" data-submit="...Sending">
          Send
        </button>
      </div>
    </form>
  </div>
  `;

  backBtn.innerHTML = `
      <span class="back-btn" onclick="goBack()">
       <svg class="checkmark back" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30.051 30.051">
        <path
         fill="var(--red)"
          d="M7.99,14.943l5.428-4.484c0,0,0.641-0.681,0.641,0.056c0,0.741,0,2.526,0,2.526s0.435,0,1.1,0c1.91,0,5.383,0,6.795,0
           c0,0,0.382-0.101,0.382,0.482c0,0.586,0,3.146,0,3.559c0,0.422-0.319,0.412-0.319,0.412c-1.374,0-4.964,0-6.807,0
            c-0.6,0-1.155,0-1.155,0s0,1.433,0,2.331c0,0.9-0.64,0.12-0.64,0.12S8.478,16.232,7.946,15.7C7.56,15.312,7.99,14.943,7.99,14.943z
            " />
          </svg>
        </span>
  `;
}

function goBack() {
  textCtaWrapper.innerHTML = prevHtml;
  backBtn.innerHTML = '';
}

// Add on "text" click
//
