import { Link } from 'react-router-dom';
import styled from 'styled-components';

const FooterWrapper = styled.footer`
  background: var(--color-white);
  border-top: 1px solid var(--color-border);
  margin-top: 4rem;
`;

const FooterTop = styled.div`
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 3rem 1.5rem;
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 3rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const FooterBrand = styled.div``;

const FooterLogo = styled(Link)`
  font-family: var(--font-serif);
  font-size: 1.4rem;
  font-weight: 700;
  color: var(--color-black);
  display: block;
  margin-bottom: 1rem;
`;

const FooterAbout = styled.p`
  font-size: 0.875rem;
  color: var(--color-text-secondary);
  line-height: 1.7;
  margin-bottom: 1rem;
`;

const FooterContact = styled.div`
  font-size: 0.8rem;
  color: var(--color-text-secondary);
  display: flex;
  flex-direction: column;
  gap: 0.25rem;

  span {
    font-weight: 500;
    color: var(--color-text-primary);
  }
`;

const FooterSection = styled.div``;

const FooterHeading = styled.h4`
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--color-text-primary);
  margin-bottom: 1rem;
  letter-spacing: 0.02em;
`;

const FooterLinks = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
`;

const FooterLink = styled(Link)`
  font-size: 0.85rem;
  color: var(--color-text-secondary);
  transition: color 0.2s ease;

  &:hover {
    color: var(--color-black);
  }
`;

const FooterBottom = styled.div`
  border-top: 1px solid var(--color-border);
  padding: 1rem 1.5rem;
  max-width: var(--max-width);
  margin: 0 auto;
  display: flex;
  justify-content: flex-end;
  gap: 1.5rem;

  @media (max-width: 480px) {
    justify-content: center;
    flex-wrap: wrap;
  }
`;

const FooterBottomLink = styled.a`
  font-size: 0.75rem;
  color: var(--color-text-muted);
  transition: color 0.2s ease;

  &:hover {
    color: var(--color-black);
  }
`;

function Footer() {
  return (
    <FooterWrapper>
      <FooterTop>
        <FooterBrand>
          <FooterLogo to="/">Blog</FooterLogo>
          <FooterAbout>
            We are passionate about creating innovative digital experiences that help businesses grow. Our team specializes in web development, mobile applications, and cloud solutions tailored to your needs. Get in touch with us to learn how we can bring your ideas to life.
          </FooterAbout>
          <FooterContact>
            <div><span>Email:</span> hello@examplecompany.com</div>
            <div><span>Phone:</span> +1 (800) 555-0199</div>
          </FooterContact>
        </FooterBrand>

        <FooterSection>
          <FooterHeading>Category</FooterHeading>
          <FooterLinks>
            {['Lifestyle', 'Technology', 'Travel', 'Business', 'Economy', 'Sports'].map((cat) => (
              <li key={cat}>
                <FooterLink to={`/?search=${cat.toLowerCase()}`}>{cat}</FooterLink>
              </li>
            ))}
          </FooterLinks>
        </FooterSection>
      </FooterTop>

      <FooterBottom>
        <FooterBottomLink href="#">Terms of Use</FooterBottomLink>
        <FooterBottomLink href="#">Privacy Policy</FooterBottomLink>
        <FooterBottomLink href="#">Cookie Policy</FooterBottomLink>
      </FooterBottom>
    </FooterWrapper>
  );
}

export default Footer;
