// The header's logo and the page background, from the pictures the build copied into output/.
window.SL = window.SL || {};

SL.showHeader = function (assets) {
  if (assets.logo) {
    const logo = SL.$('logo');
    logo.src = `output/${assets.logo}`;
    logo.hidden = false;
  }
  if (assets.background) {
    document.body.style.backgroundImage = `url("output/${assets.background}")`;
  }
};
