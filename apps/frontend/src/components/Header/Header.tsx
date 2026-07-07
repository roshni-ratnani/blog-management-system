import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Nav = styled.header`
  background: var(--color-white);
  border-bottom: 1px solid var(--color-border);
  position: sticky;
  top: 0;
  z-index: 100;
  height: var(--header-height);
`;

const NavInner = styled.div`
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 1.5rem;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
`;

const Logo = styled(Link)`
  font-family: var(--font-serif);
  font-size: 1.6rem;
  font-weight: 700;
  color: var(--color-black);
  letter-spacing: -0.02em;
  flex-shrink: 0;
`;

const RightActions = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const SearchForm = styled.form`
  display: flex;
  align-items: center;
  background: var(--color-bg);
  border-radius: var(--radius-sm);
  overflow: hidden;
  width: 280px;

  @media (max-width: 600px) {
    display: none;
  }
`;

const SearchInput = styled.input`
  flex: 1;
  border: none;
  padding: 0.5rem 0.75rem;
  font-size: 0.875rem;
  color: var(--color-text-primary);
  background: transparent;
  outline: none;

  &::placeholder {
    color: var(--color-text-muted);
  }
`;

const SearchButton = styled.button`
  background: none;
  border: none;
  padding: 0.5rem 0.75rem;
  cursor: pointer;
  color: var(--color-text-muted);
  display: flex;
  align-items: center;

  &:hover {
    color: var(--color-black);
  }
`;

const CreateButton = styled(Link)`
  background: var(--color-black);
  color: var(--color-white);
  padding: 0.5rem 1rem;
  border-radius: var(--radius-sm);
  font-size: 0.875rem;
  font-weight: 500;
  white-space: nowrap;
  transition: opacity 0.2s ease;
  flex-shrink: 0;

  &:hover {
    opacity: 0.8;
    color: var(--color-white);
  }
`;

function Header() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/?search=${encodeURIComponent(query.trim())}`);
    } else {
      navigate(`/`);
    }
  };

  return (
    <Nav>
      <NavInner>
        <Logo to="/">Blog</Logo>

        <RightActions>
          <SearchForm onSubmit={handleSearch}>
            <SearchInput
              type="text"
              placeholder="Search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <SearchButton type="submit" aria-label="Search">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </SearchButton>
          </SearchForm>

          <CreateButton to="/create">+ Create Blog</CreateButton>
        </RightActions>
      </NavInner>
    </Nav>
  );
}

export default Header;
