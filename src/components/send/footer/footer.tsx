import './footer.scss';

const footerLinkAbout = <a href="https://pyronear.org/" target="_blank" rel="noopener noreferrer">à propos de Pyronear</a>
const footerLinkWebsite = <a href="https://pyronear.org/" target="_blank" rel="noopener noreferrer">Site web</a>
const footerLinkLegalMentions = <a href="https://pyronear.org/" target="_blank" rel="noopener noreferrer">mentions légales</a>
const separator = <a> - </a>

export const Footer = () => 
<div id="footer">{footerLinkAbout}{separator}{footerLinkWebsite}{separator}{footerLinkLegalMentions}</div>