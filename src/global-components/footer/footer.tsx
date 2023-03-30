import './footer.scss'

const footerLinkAbout = <a href="https://pyronear.org/" target="_blank" rel="noopener noreferrer">à propos de Pyronear</a>
const footerLinkWebsite = <a href="https://pyronear.org/" target="_blank" rel="noopener noreferrer">Site web</a>
const footerLinkLegalMentions = <a href="https://pyronear.org/" target="_blank" rel="noopener noreferrer">mentions légales</a>
const separator = <p> - </p>

export const Footer = (): JSX.Element =>
    <div id="footer">{footerLinkAbout}{separator}{footerLinkWebsite}{separator}{footerLinkLegalMentions}</div>
