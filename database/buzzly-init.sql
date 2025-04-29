CREATE TYPE User_role AS ENUM ('USER', 'ADMIN', 'MODERATOR');
-- ##########################################################
-- 0. Tabela użytkowników (model User)
-- ##########################################################
CREATE TABLE Users (
    id            SERIAL PRIMARY KEY,
    username      VARCHAR(35) NOT NULL UNIQUE,
    email         VARCHAR(255) NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    role          VARCHAR(20)  NOT NULL DEFAULT 'USER',  -- np. USER, ADMIN
    created_at    TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
    last_login_at TIMESTAMP
);

-- ##########################################################
-- 1. ENUMy (jak dotychczas)
-- ##########################################################
CREATE TYPE Review_status AS ENUM ('PENDING', 'APPROVED', 'REJECTED');
CREATE TYPE Moderation_action AS ENUM ('APPROVE', 'REJECT', 'EDIT', 'DELETE');
CREATE TYPE Review_report_status AS ENUM ('PENDING', 'RESOLVED', 'DISMISSED');

-- ##########################################################
-- 2. Tabela produktów
-- ##########################################################
CREATE TABLE Products (
    id               SERIAL PRIMARY KEY,
    name             VARCHAR(35) NOT NULL,
    title            TEXT        NOT NULL,
    author           VARCHAR(35) NOT NULL,
    description      TEXT,
    price            DECIMAL(10,2) NOT NULL CHECK (price >= 0),
    cover_image_url  TEXT,
    created_at       TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ##########################################################
-- 3. Tabela recenzji
--    – teraz z referencją do użytkownika (autor recenzji)
-- ##########################################################
CREATE TABLE Reviews (
    id             SERIAL PRIMARY KEY,
    product_id     INTEGER NOT NULL
                     REFERENCES products(id)
                       ON DELETE CASCADE,
    user_id        INTEGER
                     REFERENCES users(id)
                       ON DELETE SET NULL,          -- anonimowe recenzje też możliwe
    author_name    VARCHAR(35),                     -- opcjonalnie, dla anonimów
    author_surname VARCHAR(35),
    rating         INTEGER NOT NULL
                     CHECK (rating BETWEEN 1 AND 5),
    content        TEXT    NOT NULL,
    images         TEXT[],                            -- tablica URLi
    status         review_status NOT NULL
                     DEFAULT 'PENDING',
    created_at     TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at     TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    moderated_by   INTEGER
                     REFERENCES users(id),           -- kto moderował
    moderated_at   TIMESTAMP
);

-- ##########################################################
-- 4. Tabela logów recenzji (historia moderacji)
--    – wykonane przez użytkownika
-- ##########################################################
CREATE TABLE Review_logs (
    id           SERIAL PRIMARY KEY,
    review_id    INTEGER NOT NULL
                   REFERENCES reviews(id)
                     ON DELETE CASCADE,
    action       moderation_action NOT NULL,
    performed_by INTEGER NOT NULL
                   REFERENCES users(id),
    comment      TEXT,
    timestamp    TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ##########################################################
-- 5. Tabela wersji recenzji (historie edycji)
--    – kto i kiedy edytował
-- ##########################################################
CREATE TABLE Review_versions (
    id         SERIAL PRIMARY KEY,
    review_id  INTEGER NOT NULL
                 REFERENCES reviews(id)
                   ON DELETE CASCADE,
    content    TEXT NOT NULL,
    edited_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    edited_by  INTEGER
                 REFERENCES users(id)
);

-- ##########################################################
-- 6. Indeksy i triggery (jak dotychczas)
-- ##########################################################
-- pełnotekstowy indeks na treść recenzji
CREATE INDEX IDX_reviews_content_fts
  ON reviews
  USING GIN (to_tsvector('polish', content));
