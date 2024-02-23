import './footer.scss'

const footerLinkAbout = <a href="https://pyronear.org/" target="_blank" rel="noopener noreferrer">À propos de Pyronear</a>
const footerLinkWebsite = <a href="https://pyronear.org/" target="_blank" rel="noopener noreferrer">Site web</a>
const footerLinkLegalMentions = <a href="https://pyronear.org/" target="_blank" rel="noopener noreferrer">Mentions légales</a>
const separator = ' - '

export const Footer = (): JSX.Element =>
    <div id="footer">
        <p>{footerLinkAbout}{separator}{footerLinkWebsite}{separator}{footerLinkLegalMentions}</p></div>
