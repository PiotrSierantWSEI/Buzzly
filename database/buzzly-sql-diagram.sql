-- Enum ze statusem recenzji
CREATE TYPE review_status AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- Enum z akcjami moderacji
CREATE TYPE moderation_action AS ENUM ('APPROVE', 'REJECT', 'EDIT', 'DELETE');

-- Tabela produktów
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,                        -- krótka nazwa (np. kod, skrót, alias)
    title TEXT NOT NULL,                       -- pełny tytuł produktu
    author TEXT NOT NULL,                      -- autor (np. autor książki, twórca)
    description TEXT,                          -- opis produktu
    price DECIMAL(10, 2) NOT NULL CHECK (price >= 0), -- cena brutto
    cover_image_url TEXT,                      -- URL do okładki/miniatury
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela recenzji
CREATE TABLE reviews (
    id SERIAL PRIMARY KEY,
    product_id INTEGER NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    author_name TEXT NOT NULL, -- imię  nawet dla anonima
    author_surname TEXT NOT NULL, -- nazwisko nawet dla anonima
    rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
    content TEXT NOT NULL,
    images TEXT[], -- tablica URLi do zdjęć
    status review_status NOT NULL DEFAULT 'PENDING',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela logów recenzji (np. historia moderacji)
CREATE TABLE review_logs (
    id SERIAL PRIMARY KEY,
    review_id INTEGER NOT NULL REFERENCES reviews(id) ON DELETE CASCADE,
    action moderation_action NOT NULL, -- akcja moderacji (np. zatwierdzenie, odrzucenie, edycja, usunięcie)
    performed_by TEXT NOT NULL, -- np. admin@example.com lub imię admina
    comment TEXT, -- np. powód odrzucenia lub uwagi
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- pełnotekstowy indeks
CREATE INDEX idx_reviews_content_fts ON reviews USING GIN (to_tsvector('polish', content));